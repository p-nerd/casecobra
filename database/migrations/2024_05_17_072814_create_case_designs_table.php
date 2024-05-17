<?php

use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\PhoneModel;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('case_designs', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable();
            $table->foreignIdFor(Image::class, 'original_image_id');
            $table->foreignIdFor(Image::class, 'cropped_image_id')->nullable();
            $table->foreignIdFor(PhoneModel::class)->nullable();
            $table->foreignIdFor(Color::class)->nullable();
            $table->foreignIdFor(Material::class)->nullable();
            $table->foreignIdFor(Finish::class)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('case_designs');
    }
};
