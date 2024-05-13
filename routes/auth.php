<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('register', [AuthController::class, 'registerCreate'])->name('register');
    Route::post('register', [AuthController::class, 'registerStore']);

    Route::get('login', [AuthController::class, 'loginCreate'])->name('login');
    Route::post('login', [AuthController::class, 'loginStore']);

    Route::get('forgot-password', [AuthController::class, 'forgotPasswordCreate'])->name('password.request');
    Route::post('forgot-password', [AuthController::class, 'forgotPasswordStore'])->name('password.email');

    Route::get('reset-password/{token}', [AuthController::class, 'resetPasswordCreate'])->name('password.reset');
    Route::post('reset-password', [AuthController::class, 'resetPasswordStore'])->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', [AuthController::class, "verifyEmailPrompt"])->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', [AuthController::class, "makeAuthenticatedUserEmailVerified"])->middleware(['signed', 'throttle:6,1'])->name('verification.verify');

    Route::post('email/verification-notification', [AuthController::class, 'emailVerificationNotificationStore'])->middleware('throttle:6,1')->name('verification.send');

    Route::get('confirm-password', [AuthController::class, 'confirmPasswordShow'])->name('password.confirm');
    Route::post('confirm-password', [AuthController::class, 'confirmPasswordStore']);

    Route::put('password', [AuthController::class, 'passwordUpdate'])->name('password.update');

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});
