<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function originalImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'original_image_id');
    }

    public function croppedImage(): BelongsTo
    {
        return $this->belongsTo(Image::class, 'cropped_image_id');
    }

    public function phoneModel(): BelongsTo
    {
        return $this->belongsTo(PhoneModel::class);
    }

    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }

    public function material(): BelongsTo
    {
        return $this->belongsTo(Material::class);
    }

    public function finish(): BelongsTo
    {
        return $this->belongsTo(Finish::class);
    }
}
