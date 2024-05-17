<?php

namespace App\Http\Controllers;

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

        dd($image->fullurl());

        return Redirect::route("/create-case/design");
    }
}
