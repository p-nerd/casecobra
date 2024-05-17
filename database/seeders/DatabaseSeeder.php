<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Color;
use App\Models\Image;
use App\Models\PhoneModel;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $adminUser = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@casecobra.com',
            "role" => "admin",
        ]);
        Profile::factory()->create([
            "user_id" => $adminUser->id,
        ]);
        Profile::factory(10)->create();

        Image::factory(10)->create();

        $this->phoneModel($adminUser->id);
        $this->color($adminUser->id);
    }

    private function phoneModel(int $user_id)
    {
        $image = Image::factory()->create();

        $phoneModels = [
            [
                'label' => 'iPhone X',
                'value' => 'iphonex',
                'description' => 'Bezel-less design, Face ID.',
            ],
            [
                'label' => 'iPhone 11',
                'value' => 'iphone11',
                'description' => 'Dual-camera, improved battery.',
            ],
            [
                'label' => 'iPhone 12',
                'value' => 'iphone12',
                'description' => '5G, flat-edged design.',
            ],
            [
                'label' => 'iPhone 13',
                'value' => 'iphone13',
                'description' => 'Better camera, longer battery life.',
            ],
            [
                'label' => 'iPhone 14',
                'value' => 'iphone14',
                'description' => '48MP camera, advanced capabilities.',
            ],
            [
                'label' => 'iPhone 15',
                'value' => 'iphone15',
                'description' => 'Latest model, improved performance.',
            ],
        ];

        foreach ($phoneModels as $model) {
            PhoneModel::create([
                'label' => $model['label'],
                'value' => $model['value'],
                'description' => $model['description'],
                'user_id' => $user_id,
                "image_id" => $image->id,
            ]);
        }
    }

    private function color(int $user_id)
    {
        $colors = [
            [
                'label' => 'Black',
                'value' => '#27272a',
                'name' => 'black',
            ],
            [
                'label' => 'Blue',
                'value' => '#171e29',
                'name' => 'blue',
            ],
            [
                'label' => 'Rose',
                'value' => '#1e1b1e',
                'name' => 'rose',
            ],
        ];

        foreach ($colors as $color) {
            Color::create([
                'label' => $color['label'],
                'name' => $color['name'],
                'value' => $color['value'],
                'user_id' => $user_id,
            ]);
        }
    }
}
