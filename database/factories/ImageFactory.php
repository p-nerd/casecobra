<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'url' => fake()->imageUrl(),
            'alt' => fake()->optional(0.7)->sentence(),
            'width' => fake()->numberBetween(100, 1920),
            'height' => fake()->numberBetween(100, 1080),
            'removable' => false,
            'user_id' => User::inRandomOrder()->pluck('id')->random(),
        ];
    }
}
