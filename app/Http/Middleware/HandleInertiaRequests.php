<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use App\Models\Message;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = auth()->user();

        $_user = null;
        $_profile = null;
        $_admin = false;
        $_messages = null;

        if ($user) {
            $_user = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];
            if ($request->query("chat") === "true") {
                $_messages = Message::where('user_id', $user->id)
                    ->with(['replier:id,name'])
                    ->get();
            }
            $_profile = [
                'avatar' => $user->profile?->image?->fullurl(),
            ];
            $_admin = $user->role === Role::ADMIN->value;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $_user,
                "messages" => $_messages,
                'profile' => $_profile,
                'admin' => $_admin,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
