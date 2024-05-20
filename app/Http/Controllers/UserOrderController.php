<?php

namespace App\Http\Controllers;

class UserOrderController extends Controller
{
    public function index()
    {
        return inertia("Orders");
    }
}
