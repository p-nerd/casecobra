<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    protected $fillable = ['name', 'value', 'type'];

    public function getValueAttribute($value)
    {
        return match ($this->type) {
            'integer' => (int) $value,
            'float' => (float) $value,
            'boolean' => filter_var($value, FILTER_VALIDATE_BOOLEAN),
            'json' => json_decode($value, true),
            default => (string) $value,
        };
    }

    public function setValueAttribute($value): void
    {
        if ($this->type === 'json' && is_array($value)) {
            $this->attributes['value'] = json_encode($value);
        } else {
            $this->attributes['value'] = $value;
        }
    }
}
