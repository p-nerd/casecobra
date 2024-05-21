<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'image_id',
        'phone',
        'address_1',
        'address_2',
        'city',
        'state',
        'country',
        'zip',
    ];

    public function image(): BelongsTo
    {
        return $this->belongsTo(Image::class);
    }
}
