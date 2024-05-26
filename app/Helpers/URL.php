<?php

namespace App\Helpers;

class URL
{
    public static function decode(?string $str): ?string
    {
        if (! $str) {
            return null;
        }

        return urldecode($str);
    }

    public static function querySplit(?string $query, string $spit = " "): ?array
    {
        if (! $query) {
            return null;
        }

        return explode($spit, URL::decode($query));
    }
}
