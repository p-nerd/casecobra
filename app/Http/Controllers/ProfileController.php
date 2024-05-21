<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        $user = $request->user();
        $profile = $user->profile;

        return inertia('profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => [
                "name" => $user->name,
                "email" => $user->email,
                "email_verified_at" => $user->email_verified_at,
            ],
            'profile' => [
                "phone" => $profile->phone,
                "address_1" => $profile->address_1,
                "address_2" => $profile->address_2,
                "city" => $profile->city,
                "state" => $profile->state,
                "country" => $profile->country,
                "zip" => $profile->zip,
            ],
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($request->user()->id)],
        ]);

        $request->user()->fill($payload);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return redirect(route('profile.edit'));
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect(route('home'));
    }

    public function updatePicture(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg'],
            'height' => ['required', 'int', 'min:0'],
            'width' => ['required', 'int', 'min:0'],
        ]);

        $pic = Image::store(
            $payload['image'],
            $payload['height'],
            $payload['width']
        );

        $profile = auth()->user()->profile;

        if ($profile->image) {
            $profile->image->update([
                "removable" => true,
            ]);
        }

        $profile->update([
            "image_id" => $pic->id,
        ]);

        return redirect(route("profile.edit"));
    }

    public function updateBilling(Request $request)
    {
        $payload = $request->validate([
            'phone' => ['required', 'string', 'max:15'],
            'address_1' => ['required', 'string', 'max:255'],
            'address_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'country' => ['required', 'string', 'max:100'],
            'zip' => ['required', 'string', 'max:20'],
        ]);

        auth()->user()->profile->update($payload);

        return redirect(route("profile.edit"));
    }
}
