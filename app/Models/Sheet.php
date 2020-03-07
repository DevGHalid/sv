<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sheet extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['form_list_id', 'user_id'];

    public function answers()
    {
        return $this->hasMany(SheetAnswer::class);
    }
}
