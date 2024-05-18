<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Finish extends Model
{
    public function caseDesigns(): HasMany
    {
        return $this->hasMany(CaseDesign::class);
    }
}
