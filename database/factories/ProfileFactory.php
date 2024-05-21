<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image_id' => Image::factory(),
            'phone' => fake()->optional(0.3)->phoneNumber(),
            'address_1' => fake()->streetAddress(),
            'address_2' => fake()->optional(0.5)->secondaryAddress(),
            'city' => fake()->city(),
            'state' => fake()->optional(0.2)->state(),
            'country' => fake()->country(),
            'zip' => fake()->optional(0.4)->postcode(),
            'user_id' => User::factory(),
        ];
    }
}
