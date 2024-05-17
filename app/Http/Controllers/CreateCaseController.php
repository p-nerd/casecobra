<?php

namespace App\Http\Controllers;

use App\Models\CaseDesign;
use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\Option;
use App\Models\PhoneModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CreateCaseController extends Controller
{
    public function uploadCreate()
    {
        return inertia("createCase/Upload");
    }

    public function uploadStore(Request $request)
    {
        $request->validate([
            'image' => ["required", "image", "mimes:jpeg,png,jpg", "max:2048"],
            "height" => ["required", "int", "min:0"],
            "width" => ["required", "int", "min:0"],
        ]);
        $image = Image::store($request->image, $request->height, $request->width);

        $caseDesign = CaseDesign::create([
            "original_image_id" => $image->id,
        ]);

        return Redirect::to("/create-case/design?id={$caseDesign->id}");
    }

    public function designCreate(Request $request)
    {
        $id = $request->query("id");

        $caseDesign = CaseDesign::query()->with("originalImage")->findOrFail($id);
        $originalImage = $caseDesign->originalImage;

        $colors = Color::query()->get(["id", "label", "name", "value"]);
        $models = PhoneModel::query()->get(["id", "label", "value"]);
        $materials = Material::query()->get(["id", "label", "value", "description", "price"]);
        $finishes = Finish::query()->get(["id", "label", "value", "description", "price"]);

        $basePrice = Option::query()->where("name", "=", "CASE_BASE_PRICE")->first()->value;

        return inertia("createCase/Design", [
            "id" => $caseDesign->id,
            "image" => [
                "url" => $originalImage->fullurl(),
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

    public function designStore()
    {
    }
}
