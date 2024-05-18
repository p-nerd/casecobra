<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'case_design_id',
        'amount',
        'paid',
        'status',
        'email',
        'phone',
        'address_1',
        'address_2',
        'city',
        'state',
        'country',
        'zip',
    ];
}
