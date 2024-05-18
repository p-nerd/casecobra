<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CaseDesign extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'original_image_id',
        'cropped_image_id',
        'phone_model_id',
        'color_id',
        'material_id',
        'finish_id',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class, "id", "user_id");
    }

    public function originalImage(): HasOne
    {
        return $this->hasOne(Image::class, "id", "original_image_id");
    }

    public function croppedImage(): HasOne
    {
        return $this->hasOne(Image::class, "id", "cropped_image_id");
    }

    public function phoneModel(): HasOne
    {
        return $this->hasOne(PhoneModel::class, "id", "phone_model_id");
    }

    public function color(): HasOne
    {
        return $this->hasOne(Color::class, "id", "color_id");
    }

    public function material(): HasOne
    {
        return $this->hasOne(Material::class, "id", "material_id");
    }

    public function finish(): HasOne
    {
        return $this->hasOne(Finish::class, "id", "finish_id");
    }
}
