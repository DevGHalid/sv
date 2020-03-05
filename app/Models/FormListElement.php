<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormListElement extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['title', 'slug', 'icon', 'attributes'];

    /**
     * @var array
     */
    protected $casts = [
        'attributes' => 'json'
    ];
}
