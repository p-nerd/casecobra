<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\CreateCaseController;
use App\Http\Controllers\DashboardOrderController;
use App\Http\Controllers\DashboardOverviewController;
use App\Http\Controllers\DashboardSettingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::prefix("/")->group(function () {
    Route::get('/', fn () => inertia('Home'))->name("home");

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
});

Route::prefix("/create-case")->group(function () {
    Route::get("/", fn () => redirect()->route("create-case.upload.create"));

    Route::get("/upload", [CreateCaseController::class, "uploadCreate"])->name("create-case.upload.create");
    Route::post("/upload", [CreateCaseController::class, "uploadStore"])->name("create-case.upload.store");

    Route::get("/design", [CreateCaseController::class, "designCreate"])->name("create-case.design.create");
    Route::post("/design", [CreateCaseController::class, "designStore"])->name("create-case.design.store");

    Route::get("/preview", [CreateCaseController::class, "previewCreate"])->name("create-case.preview.create");
    Route::post("/preview", [CreateCaseController::class, "previewStore"])->middleware("auth")->name("create-case.preview.store");

    Route::get("/checkout", [CreateCaseController::class, "checkoutCreate"])->middleware("auth")->name("create-case.checkout.create");

    Route::get("/thank-you", [CreateCaseController::class, "thankYouCreate"])->middleware("auth")->name("create-case.thank-you.create");
});

Route::prefix("/profile")->middleware('auth')->group(function () {
    Route::get('/', [ProfileController::class, 'index'])->name('profile.index');
    Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post("/picture", [ProfileController::class, "pictureStore"])->name("profile.picture.store");
    Route::patch("/billing", [ProfileController::class, "billingUpdate"])->name("profile.billing.update");
});

Route::prefix("/orders")->middleware('auth')->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/{order}', [OrderController::class, 'show'])->name("orders.show");
});

Route::prefix("/dashboard")->middleware('auth', 'verified', "admin")->group(function () {
    Route::get('/', fn () => redirect(route("dashboard.overview.index")));

    Route::prefix("/overview")->group(function () {
        Route::get('/', [DashboardOverviewController::class, "index"])->name('dashboard.overview.index');
    });

    Route::prefix('/orders')->group(function () {
        Route::get('/', [DashboardOrderController::class, "index"])->name('dashboard.orders.index');
        Route::delete('/', [DashboardOrderController::class, "destroyMany"])->name('dashboard.orders.destroyMany');
        Route::get('/{order}', [DashboardOrderController::class, "show"])->name('dashboard.orders.show');
        Route::patch('/{order}', [DashboardOrderController::class, "update"])->name('dashboard.orders.update');
        Route::delete('/{order}', [DashboardOrderController::class, "destroy"])->name('dashboard.orders.destroy');
    });

    Route::prefix("/settings")->group(function () {
        Route::get('/', [DashboardSettingController::class, "index"])->name('dashboard.settings.index');
        Route::patch('/', [DashboardSettingController::class, "update"])->name('dashboard.settings.update');
        Route::post('/phone-models', [DashboardSettingController::class, "phoneModelSave"])->name('dashboard.settings.phone-model-save');
    });
});

Route::prefix("/chats")->group(function () {
    Route::post('/', [ChatController::class, 'sendMessage']);
    Route::get('/{chatId}/messages', [ChatController::class, 'getMessages']);
});
