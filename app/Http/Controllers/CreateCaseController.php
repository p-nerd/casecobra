<?php

namespace App\Http\Controllers;

use App\Models\CaseDesign;
use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\Option;
use App\Models\PhoneModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class CreateCaseController extends Controller
{
    public function uploadCreate(): Response
    {
        return inertia("createCase/Upload");
    }

    public function uploadStore(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg'],
            'height' => ['required', 'int', 'min:0'],
            'width' => ['required', 'int', 'min:0'],
        ]);

        $image = Image::store($payload['image'], $payload['height'], $payload['width']);
        $caseDesign = CaseDesign::create([
            'user_id' => Auth::id(),
            'original_image_id' => $image->id,
        ]);

        return redirect("/create-case/design?id={$caseDesign->id}");
    }

    public function designCreate(Request $request): Response
    {
        $id = $request->query('id');

        $caseDesign = CaseDesign::findOrFail($id);
        $originalImage = $caseDesign->originalImage;

        $colors = Color::all(['id', 'label', 'name', 'value']);
        $models = PhoneModel::all(['id', 'label', 'value']);
        $materials = Material::all(['id', 'label', 'value', 'description', 'price']);
        $finishes = Finish::all(['id', 'label', 'value', 'description', 'price']);
        $basePrice = Option::caseBasePrice();

        return inertia("createCase/Design", [
            'caseDesign' => [
                'id' => $caseDesign->id,
                'userId' => $caseDesign->user_id,
                'modelId' => $caseDesign->phone_model_id,
                'colorId' => $caseDesign->color_id,
                'materialId' => $caseDesign->material_id,
                'finishId' => $caseDesign->finish_id,
            ],
            'image' => [
                'url' => $originalImage->fullurl(),
                'alt' => $originalImage->alt,
                'height' => $originalImage->height,
                'width' => $originalImage->width,
            ],
            'colors' => $colors,
            'models' => $models,
            'materials' => $materials,
            'finishes' => $finishes,
            'basePrice' => $basePrice,
        ]);
    }

    public function designStore(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'caseDesignId' => ['required', 'numeric'],
            'phoneModelId' => ['required', 'numeric'],
            'colorId' => ['required', 'numeric'],
            'materialId' => ['required'],
            'finishId' => ['required'],
            'croppedImage' => ['required', 'image', 'mimes:png'],
            'height' => ['required', 'int', 'min:0'],
            'width' => ['required', 'int', 'min:0'],
        ]);

        $croppedImage = Image::store($payload['croppedImage'], $payload['height'], $payload['width']);
        $caseDesign = CaseDesign::findOrFail($payload['caseDesignId']);

        if ($caseDesign->cropped_image_id) {
            $caseDesign->croppedImage->update(['removable' => true]);
        }

        $caseDesign->update([
            'phone_model_id' => $payload['phoneModelId'],
            'color_id' => $payload['colorId'],
            'material_id' => $payload['materialId'],
            'finish_id' => $payload['finishId'],
            'cropped_image_id' => $croppedImage->id,
        ]);

        return redirect("/create-case/preview?id={$caseDesign->id}");
    }

    public function previewCreate(Request $request): Response
    {
        $id = $request->query('id');

        $caseDesign = CaseDesign::findOrFail($id);
        $originalImage = $caseDesign->originalImage;
        $croppedImage = $caseDesign->croppedImage;

        $basePrice = Option::caseBasePrice();
        $color = $caseDesign->color;
        $phoneModel = $caseDesign->phoneModel;
        $material = $caseDesign->material;
        $finish = $caseDesign->finish;

        return inertia("createCase/Preview", [
            'id' => $caseDesign->id,
            'originalImage' => [
                'url' => $originalImage->fullurl(),
                'alt' => $originalImage->alt,
                'height' => $originalImage->height,
                'width' => $originalImage->width,
            ],
            'croppedImage' => [
                'url' => $croppedImage->fullurl(),
                'alt' => $croppedImage->alt,
                'height' => $croppedImage->height,
                'width' => $croppedImage->width,
            ],
            'color' => [
                'value' => $color->value,
            ],
            'model' => [
                'label' => $phoneModel->label,
            ],
            'material' => [
                'label' => $material->label,
                'price' => $material->price,
            ],
            'finish' => [
                'label' => $finish->label,
                'price' => $finish->price,
            ],
            'basePrice' => $basePrice,
        ]);
    }

    public function previewStore(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'caseDesignId' => ['required', 'numeric'],
        ]);

        $caseDesign = CaseDesign::findOrFail($payload['caseDesignId']);

        if ($caseDesign->user_id && $caseDesign->user_id !== Auth::id()) {
            throw ValidationException::withMessages([
                'message' => 'This is not your order',
                'to' => '/create-case/upload',
            ]);
        }

        $caseDesign->update(['user_id' => Auth::id()]);

        return redirect("create-case/checkout?id={$caseDesign->id}");
    }

    public function checkoutCreate(Request $request): Response
    {
        $caseDesign = CaseDesign::query()
            ->where('id', $request->query('id'))
            ->where('user_id', Auth::id())
            ->firstOrFail();

        return inertia("createCase/Checkout", [
            'caseDesignId' => $caseDesign->id,
        ]);
    }
}
