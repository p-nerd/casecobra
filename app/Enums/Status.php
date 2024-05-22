<?php

namespace App\Enums;

enum Status: string
{
    case AWAITING = "awaiting";
    case PROCESSING = "processing";
    case SHIPPED = "shipped";
    case COMPLETED = "completed";

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
