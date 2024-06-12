<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Enums\Role;
use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\Message;
use App\Models\Option;
use App\Models\Order;
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
        Option::setCaseBasePrice(1500);

        $admin = User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@casecobra.com',
            "role" => Role::ADMIN->value,
        ]);
        Profile::factory()->create([
            "user_id" => $admin->id,
        ]);

        $this->phoneModels($admin->id);
        $this->colors($admin->id);
        $this->materials($admin->id);
        $this->finishes($admin->id);

        $shihab4t = User::factory()->create([
            "name" => "Shihab Mahamud",
            "email" => "shihab4t@gmail.com",
            "role" => Role::USER->value,
        ]);
        Profile::factory()->create([
            "user_id" => $shihab4t->id,
        ]);
        Order::factory(1000)->create([
            "user_id" => $shihab4t->id,
        ]);
        Message::factory(10)->create([
            "user_id" => $shihab4t->id,
        ]);
        Message::factory(5)->create([
            "user_id" => $shihab4t->id,
            "replier_id" => $admin->id,
        ]);

        $romi = User::factory()->create([
            "name" => "MD Romi",
            "email" => "romi@gmail.com",
            "role" => Role::USER->value,
        ]);
        Profile::factory()->create([
            "user_id" => $romi->id,
        ]);
        Order::factory(10)->create([
            "user_id" => $romi->id,
        ]);
        Message::factory(10)->create([
            "user_id" => $romi->id,
        ]);
        Message::factory(5)->create([
            "user_id" => $romi->id,
            "replier_id" => $admin->id,
        ]);
    }

    private function phoneModels(int $user_id): void
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

    private function colors(int $user_id): void
    {
        $colors = [
            [
                'label' => 'Black',
                'value' => '#18181b',
                'name' => 'black',
            ],
            [
                'label' => 'Blue',
                'value' => '#172554',
                'name' => 'blue',
            ],
            [
                'label' => 'Rose',
                'value' => '#4c0519',
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

    private function materials(int $user_id): void
    {
        $materials = [
            [
                'label' => 'Silicone',
                'value' => 'silicone',
                'description' => null,
                'price' => 0,
            ],
            [
                'label' => 'Soft Polycarbonate',
                'value' => 'polycarbonate',
                'description' => 'Scratch-resistant coating',
                'price' => 500,
            ],
        ];

        foreach ($materials as $material) {
            Material::create([
                'label' => $material['label'],
                'value' => $material['value'],
                'description' => $material['description'],
                'price' => $material['price'],
                'user_id' => $user_id,
            ]);
        }
    }

    private function finishes(int $user_id): void
    {
        $finishes = [
            [
                'label' => 'Smooth Finish',
                'value' => 'smooth',
                'description' => null,
                'price' => 0,
            ],
            [
                'label' => 'Textured Finish',
                'value' => 'textured',
                'description' => 'Soft grippy texture',
                'price' => 300,
            ],
        ];

        foreach ($finishes as $finish) {
            Finish::create([
                'label' => $finish['label'],
                'value' => $finish['value'],
                'description' => $finish['description'],
                'price' => $finish['price'],
                'user_id' => $user_id,
            ]);
        }
    }
}
