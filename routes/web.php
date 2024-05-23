<?php

use App\Http\Controllers\CreateCaseController;
use App\Http\Controllers\DashboardOrderController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Home'))->name("home");

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

Route::middleware('auth')->prefix("/profile")->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post("/picture", [ProfileController::class, "pictureStore"])->name("profile.picture.store");
    Route::patch("/billing", [ProfileController::class, "billingUpdate"])->name("profile.billing.update");
});

Route::middleware('auth')->prefix("/orders")->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/{order}', [OrderController::class, 'show']);
});

Route::middleware('auth', 'verified', "admin")->prefix("/dashboard")->group(function () {
    Route::get('/', fn () => redirect(route("dashboard.overview.index")));
    Route::get('/overview', fn () => inertia('dashboard/Overview'))->name('dashboard.overview.index');

    Route::prefix('/orders')->group(function () {
        Route::get('/', [DashboardOrderController::class, "index"])->name('dashboard.orders.index');
        Route::get('/{order}', [DashboardOrderController::class, "show"])->name('dashboard.orders.show');
        Route::patch('/{order}', [DashboardOrderController::class, "update"])->name('dashboard.orders.update');
        Route::delete('/{order}', [DashboardOrderController::class, "destroy"])->name('dashboard.orders.destroy');
    });

    Route::get('/settings', fn () => inertia('dashboard/Settings'))->name('dashboard.settings.index');
});

require __DIR__.'/auth.php';
