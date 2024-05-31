<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = [
        'name',
        'support_user_id',
        'chatter_user_id',
    ];

    public function supportUser()
    {
        return $this->belongsTo(User::class, 'support_user_id');
    }

    public function chatterUser()
    {
        return $this->belongsTo(User::class, 'chatter_user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}
