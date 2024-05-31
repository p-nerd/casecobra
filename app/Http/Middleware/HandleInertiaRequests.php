<?php

namespace App\Http\Middleware;

use App\Enums\Role;
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
        $_chat = null;
        $_profile = null;
        $_admin = false;

        if ($user) {
            $_user = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];
            $_chat = [
                "id" => $user->chats,
            ];
            $_profile = [
                'avatar' => $user->profile?->image?->fullurl(),
            ];
            $_admin = $user->role === Role::ADMIN->value;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $_user,
                "chat" => $_chat,
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
