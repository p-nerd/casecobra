<?php

namespace App\Http\Controllers;

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
        $path = $request->image->store('images');

        return Redirect::route("/create-case/design?path=$path")->with('path', $path);
    }
}
