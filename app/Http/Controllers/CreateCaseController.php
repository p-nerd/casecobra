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
use Illuminate\Support\Facades\Redirect;
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
            'image' => ["required", "image", "mimes:jpeg,png,jpg", "max:2048"],
            "height" => ["required", "int", "min:0"],
            "width" => ["required", "int", "min:0"],
        ]);
        $image = Image::store($payload["image"], $payload["height"], $payload["width"]);

        $caseDesign = CaseDesign::create([
            "original_image_id" => $image->id,
        ]);

        return Redirect::to("/create-case/design?id={$caseDesign->id}");
    }

    public function designCreate(Request $request): Response
    {
        $id = $request->query("id");

        $caseDesign = CaseDesign::query()->findOrFail($id);
        $originalImage = $caseDesign->originalImage;

        $colors = Color::query()->get(["id", "label", "name", "value"]);
        $models = PhoneModel::query()->get(["id", "label", "value"]);
        $materials = Material::query()->get(["id", "label", "value", "description", "price"]);
        $finishes = Finish::query()->get(["id", "label", "value", "description", "price"]);

        $basePrice = Option::query()->where("name", "=", "CASE_BASE_PRICE")->first()->value;

        return inertia("createCase/Design", [
            "caseDesign" => [
                "id" => $caseDesign->id,
                "userId" => $caseDesign->user_id,
                "modelId" => $caseDesign->phone_model_id,
                "colorId" => $caseDesign->color_id,
                "materialId" => $caseDesign->material_id,
                "finishId" => $caseDesign->finish_id,
            ],
            "image" => [
                "url" => $originalImage->fullurl(),
                "alt" => $originalImage->alt,
                "height" => $originalImage->height,
                "width" => $originalImage->width,
            ],
            "colors" => $colors,
            "models" => $models,
            "materials" => $materials,
            "finishes" => $finishes,
            "basePrice" => $basePrice,
        ]);
    }

    public function designStore(Request $request)
    {
        $payload = $request->validate([
            'caseDesignId' => ['required', 'numeric'],
            'phoneModelId' => ['required', 'numeric'],
            'colorId' => ['required', 'numeric'],
            'materialId' => ['required'],
            'finishId' => ['required'],
            'croppedImage' => ['required', 'image', 'mimes:png', 'max:2048'],
            "height" => ["required", "int", "min:0"],
            "width" => ["required", "int", "min:0"],
        ]);

        $croppedImage = Image::store($payload["croppedImage"], $payload["height"], $payload["width"]);

        $caseDesign = CaseDesign::query()->findOrFail($payload["caseDesignId"]);

        if ($caseDesign->cropped_image_id) {
            $caseDesign->croppedImage->update(["removable" => true]);
        }

        $caseDesign->update([
            "phone_model_id" => $payload["phoneModelId"],
            "color_id" => $payload["colorId"],
            "material_id" => $payload["materialId"],
            "finish_id" => $payload["finishId"],
            "cropped_image_id" => $croppedImage->id,
        ]);

        return Redirect::to("/create-case/preview?id={$caseDesign->id}");
    }

    public function previewCreate(Request $request): Response
    {
        $id = $request->query("id");

        $caseDesign = CaseDesign::query()->findOrFail($id);

        $originalImage = $caseDesign->originalImage;
        $croppedImage = $caseDesign->croppedImage;

        $basePrice = Option::query()->where("name", "=", "CASE_BASE_PRICE")->first()->value;

        $color = $caseDesign->color;
        $phoneModel = $caseDesign->phoneModel;
        $material = $caseDesign->material;
        $finish = $caseDesign->finish;

        $payload = [
            "id" => $caseDesign->id,
            "originalImage" => [
                "url" => $originalImage->fullurl(),
                "alt" => $originalImage->alt,
                "height" => $originalImage->height,
                "width" => $originalImage->width,
            ],
            "croppedImage" => [
                "url" => $croppedImage->fullurl(),
                "alt" => $croppedImage->alt,
                "height" => $croppedImage->height,
                "width" => $croppedImage->width,
            ],
            "color" => [
                "value" => $color->value,
            ],
            "model" => [
                "label" => $phoneModel->label,
            ],
            "material" => [
                "label" => $material->label,
                "price" => $material->price,
            ],
            "finish" => [
                "label" => $finish->label,
                "price" => $finish->price,
            ],
            "basePrice" => $basePrice,
        ];

        return inertia("createCase/Preview", $payload);
    }
}
