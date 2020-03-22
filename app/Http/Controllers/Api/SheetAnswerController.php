<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SheetAnswer;

class SheetAnswerController extends Controller
{
    public function update(SheetAnswer $answer, Request $request)
    {
        $answer->attributes = $request['attributes'];
        $answer->save();

        return array(
            'id' => $answer->id,
            'sheet_id' => $answer->sheet_id,
            'form_element_id' => $answer->form_element_id,
            'index' => $answer->index,
            'attributes' => $answer->attributes
        );
    }
}
