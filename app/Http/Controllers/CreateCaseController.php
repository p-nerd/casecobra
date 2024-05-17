<?php

namespace App\Http\Controllers;

use App\Models\CaseDesign;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CreateCaseController extends Controller
{
    public function uploadCreate()
    {
        return inertia("CreateCase/Upload");
    }

    public function uploadStore(Request $request)
    {
        $request->validate([
            'image' => ["required", "image", "mimes:jpeg,png,jpg", "max:2048"],
        ]);
        $image = Image::store($request->image);

        $caseDesign = CaseDesign::create([
            "original_image_id" => $image->id,
        ]);

        return Redirect::to("/create-case/design?id={$caseDesign->id}");
    }

    public function designCreate()
    {
        return inertia("CreateCase/Design");
    }

    public function designStore()
    {
    }
}
