<?php

namespace App\Http\Controllers;

use App\Models\User;

class DashboardChatController extends Controller
{
    public function index()
    {
        $messages = User::query()->has("messages")->with("messages")->get();

        return $messages;

        return inertia("dashboard/Chats", [
            "chats" => $messages,
        ]);
    }
}
