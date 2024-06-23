<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function save(Request $request)
    {
        $payload = $request->validate([
            "content" => ["required"],
            "user_id" => ["required"],
            "replier_id" => ["nullable"],
        ]);

        $message = Message::create($payload);
        $profile = $message->user->profile;

        event(new MessageSent($message, $profile));
    }
}
