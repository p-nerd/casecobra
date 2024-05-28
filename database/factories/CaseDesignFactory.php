<?php

namespace Database\Factories;

use App\Models\CaseDesign;
use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\PhoneModel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CaseDesign>
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
            'phone_model_id' => PhoneModel::inRandomOrder()->pluck('id')->random(),
            'color_id' => Color::inRandomOrder()->pluck('id')->random(),
            'material_id' => Material::inRandomOrder()->pluck('id')->random(),
            'finish_id' => Finish::inRandomOrder()->pluck('id')->random(),
        ];
    }
}
