<?php

namespace Database\Factories;

use App\Enums\Status;
use App\Models\CaseDesign;
use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Order>
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
        $time = fake()->dateTimeThisYear;

        return [
            'user_id' => User::factory(),
            'case_design_id' => CaseDesign::factory(),
            'amount' => fake()->randomFloat(2, 10, 500),
            'paid' => fake()->boolean,
            'status' => fake()->randomElement(Status::values()),
            'name' => fake()->name,
            'email' => fake()->safeEmail,
            'phone' => fake()->phoneNumber,
            'address_1' => fake()->streetAddress,
            'address_2' => fake()->secondaryAddress,
            'city' => fake()->city,
            'state' => fake()->state,
            'country' => fake()->country,
            'zip' => fake()->postcode,
            "created_at" => $time,
            "updated_at" => $time,
        ];
    }
}
