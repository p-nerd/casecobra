<?php

namespace App\Http\Middleware;

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

        $userData = null;
        if ($user) {
            $userData = [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->name,
            ];
        }

        $profileData = null;
        if ($user) {
            $profile = $user->profile;

            $profileData = [
                "avatar" => $profile->avatar,
            ];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $userData,
                'profile' => $profileData,
                'admin' => true,
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
