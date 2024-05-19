<?php

use App\Http\Controllers\CreateCaseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name("home");

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
