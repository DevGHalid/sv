<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sheet;

class SheetController extends Controller
{
    /**
     * @return \App\Models\Sheet
     */
    public function index()
    {
        return Sheet::select('id', 'user_id', 'title', 'created_at')->with('user:id,name,email')->get();
    }

    /**
     * @param int $sheet_id
     * @return \App\Models\Sheet
     */
    public function show($sheet_id)
    {
        $sheet = Sheet::select('id','user_id','title')
            ->with(array('user:id,name', 'answers' => function($query) {
                $query->select(
                    'sheet_answers.id',
                    'sheet_answers.sheet_id',
                    'sheet_answers.index',
                    'sheet_answers.attributes',
                    'elements.title',
                    'elements.slug',
                    'elements.icon'
                )->join(
                    'form_elements AS elements',
                    'sheet_answers.form_element_id',
                    'elements.id'
                );
            }));

        return $sheet->findOrFail($sheet_id);;
    }

    /**
     * @param \App\Models\Sheet
     * @return array
     */
    public function destroy(Sheet $sheet) {
        $sheet->answers()->delete();

        return array('deleted' => $sheet->delete());
    }
}
