<?php

namespace Database\Factories;

use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\PhoneModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CaseDesign>
 */
class CaseDesignFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'original_image_id' => Image::factory(),
            'cropped_image_id' => Image::factory(),
            'phone_model_id' => PhoneModel::factory(),
            'color_id' => Color::factory(),
            'material_id' => Material::factory(),
            'finish_id' => Finish::factory(),
            'user_id' => User::factory(),
        ];
    }
}
