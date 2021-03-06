<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SheetAnswer extends Model
{
    /**
     * @var array
     */
    protected $fillable = ['sheet_id', 'form_element_id', 'index', 'attributes'];

    /**
     * @var array
     */
    protected $casts = [
        'attributes' => 'json'
    ];

    public function elements() {
        return $this->belongsTo(FormListElement::class, 'form_element_id');
    }
}
