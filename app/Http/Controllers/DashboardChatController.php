<?php

namespace App\Http\Controllers;

class DashboardChatController extends Controller
{
    public function index()
    {
        return inertia("dashboard/Chats");
    }
}
