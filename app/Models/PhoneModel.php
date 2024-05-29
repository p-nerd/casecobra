<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PhoneModel extends Model
{
    protected $fillable = [
        "user_id",
        "label",
        "value",
        "description",
    ];

    public function caseDesigns(): HasMany
    {
        return $this->hasMany(CaseDesign::class);
    }
}
