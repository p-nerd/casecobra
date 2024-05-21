<?php

use App\Http\Controllers\CreateCaseController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Home'))->name("home");

Route::prefix("/create-case")->group(function () {
    Route::get("/", fn () => redirect("/create-case/upload"));

    Route::get("/upload", [CreateCaseController::class, "uploadCreate"]);
    Route::post("/upload", [CreateCaseController::class, "uploadStore"]);

    Route::get("/design", [CreateCaseController::class, "designCreate"]);
    Route::post("/design", [CreateCaseController::class, "designStore"]);

    Route::get("/preview", [CreateCaseController::class, "previewCreate"]);
    Route::post("/preview", [CreateCaseController::class, "previewStore"])->middleware("auth");

    Route::get("/checkout", [CreateCaseController::class, "checkoutCreate"])->middleware("auth");

    Route::get("/thank-you", [CreateCaseController::class, "thankYouCreate"])->middleware("auth");
});

Route::middleware('auth')->prefix("/profile")->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post("/picture", [ProfileController::class, "updatePicture"])->name("profile.picture.save");
    Route::patch("/billing", [ProfileController::class, "updateBilling"])->name("profile.billing.update");
});

Route::middleware('auth')->prefix("/orders")->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('orders.index');
    Route::get('/{order}', [OrderController::class, 'show']);
});

Route::middleware('auth', 'verified', "admin")->prefix("/dashboard")->group(function () {
    Route::get('/', fn () => redirect(route("dashboard.overview.index")));
    Route::get('/overview', fn () => inertia('dashboard/Overview'))->name('dashboard.overview.index');
    Route::get('/orders', fn () => inertia('dashboard/Orders'));
    Route::get('/settings', fn () => inertia('dashboard/Settings'));
});

require __DIR__.'/auth.php';
