<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;

class DashboardChatController extends Controller
{
    public function index()
    {
        $chats = User::query()
            ->has("messages")
            ->with("messages")
            ->with("profile.image")
            ->get();

        $chats = collect($chats)->map(fn ($chat) => [
            ...$chat->toArray(),
            "avatar" => $chat->profile->image->fullurl(),
        ]);

        $repliers = User::query()
            ->with("profile.image")
            ->where("role", Role::ADMIN->value)
            ->get();

        $repliers = collect($repliers)->map(fn ($replier) => [
            ...$replier->toArray(),
            "avatar" => $replier->profile->image->fullurl(),
        ]);

        // return $chats;

        return inertia("dashboard/Chats", [
            "chats" => $chats,
            "repliers" => $repliers,
        ]);
    }
}
