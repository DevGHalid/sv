<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormList extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'user_id'];

    public function user()
    {
      return $this->belongsTo(User::class);
    }
}
