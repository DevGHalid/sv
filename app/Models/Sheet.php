<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sheet extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['user_id', 'title'];

    public function answers()
    {
        return $this->hasMany(SheetAnswer::class);
    }
}
