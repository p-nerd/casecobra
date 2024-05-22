<?php

namespace Database\Factories;

use App\Enums\Status;
use App\Models\CaseDesign;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'case_design_id' => CaseDesign::factory(),
            'amount' => fake()->randomFloat(2, 10, 500),
            'paid' => fake()->boolean,
            'status' => fake()->randomElement(Status::values()),
            'email' => fake()->safeEmail,
            'phone' => fake()->phoneNumber,
            'address_1' => fake()->streetAddress,
            'address_2' => fake()->secondaryAddress,
            'city' => fake()->city,
            'state' => fake()->state,
            'country' => fake()->country,
            'zip' => fake()->postcode,
        ];
    }
}
