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

    public function originalImage(): HasOne
    {
        return $this->hasOne(Image::class, "id", "original_image_id");
    }
}
