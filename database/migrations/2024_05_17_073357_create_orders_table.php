<?php

use App\Models\CaseDesign;
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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(CaseDesign::class);
            $table->decimal('amount', 8, 2);
            $table->boolean('paid')->default(false);
            $table->boolean('end')->default(false);
            $table->enum("status", ["awaiting", 'shipped', 'fullfilled'])->default('awaiting');
            $table->enum("charge_method", ["stripe", "free"])->default("stripe");
            $table->string("charge_id")->nullable();
            $table->string('email');
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('address_1')->nullable();
            $table->string('address_2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('zip')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
