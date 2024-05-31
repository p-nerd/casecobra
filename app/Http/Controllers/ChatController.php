<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $payload = $request->validate([
            'content' => ["required", "string", "max:1000"],
        ]);

        $user = auth()->user();

        if (count(auth()->user()->chats) === 0) {
            $chat = Chat::create([
                "name" => "Chat with {$user->name}",
                "user_id" => $user->id,
            ]);
        } else {
            $chat = $user->chats->last();
        }

        $message = Message::create([
            'chat_id' => $chat->id,
            'content' => $payload["content"],
            'user_id' => $user->id,
        ]);

        broadcast(new MessageSent($message))->toOthers();
    }

    public function getMessages($chatId)
    {
        $messages = Message::where('chat_id', $chatId)->with('user')->get();

        return response()->json(['messages' => $messages], 200);
    }
}
