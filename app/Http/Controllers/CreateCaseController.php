<?php

namespace App\Http\Controllers;

class CreateCaseController extends Controller
{
    public function uploadCreate()
    {
        return inertia("CreateCase/Upload");
    }
}
