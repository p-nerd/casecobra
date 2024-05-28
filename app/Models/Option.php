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

    protected const CASE_BASE_PRICE = "case-base-price";

    public static function caseBasePrice()
    {
        $price = self::query()
            ->where('name', self::CASE_BASE_PRICE)
            ->first();

        if (! $price) {
            return 0;
        }

        return $price->value;
    }

    public static function setCaseBasePrice(int $price): self
    {
        $caseBasePrice = Option::query()
            ->where("name", self::CASE_BASE_PRICE)
            ->first();

        if (! $caseBasePrice) {
            return self::create([
                "name" => self::CASE_BASE_PRICE,
                "value" => $price,
                "type" => "integer",
            ]);
        }

        $caseBasePrice->value = $price;
        $caseBasePrice->save();

        return $caseBasePrice;
    }
}
