<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Image;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
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

        return Redirect::to('/');
    }

    public function uploadPic(Request $request): RedirectResponse
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

        return redirect("/profile");
    }
}
