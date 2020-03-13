<?php

namespace App\Http\Controllers\Api;

use App\Models\Sheet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Response};

class SheetController extends Controller
{
    /**
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Support\Facades\Response
     */
    public function index(Request $request)
    {
      $sheets = Sheet::select('id', 'user_id', 'form_list_id');

      $sheets->with(['answers' => function($query) {
        $query->join('form_list_elements AS elements', 'sheet_answers.form_element_id', 'elements.id');
        $query->select(
          'sheet_answers.id',
          'sheet_answers.sheet_id',
          'sheet_answers.index',
          'sheet_answers.attributes',
          'elements.title',
          'elements.slug',
          'elements.icon'
        )->orderBy('sheet_answers.index', 'asc');
      }]);

      return Response::json($sheets->get());
    }

    /**
     * @param \App\Models\Sheet;
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Support\Facades\Response
     */
    public function addElementToSheet(Sheet $sheet, Request $request)
    {
      $request->validate([
        'element.id' => 'required',
        'element.index' => 'required',
        'element.attributes' => 'required'
      ]);

      $sheet->answers()->where('index', '>=', $request->element['index'])->increment('index');

      $sheet_answer = $sheet->answers()->create([
        'form_element_id' => $request->element['id'],
        'index' => $request->element['index'],
        'attributes' => $request->element['attributes']
      ]);


      return Response::json([
        'id' => $sheet_answer->id,
        'sheet_id' => $sheet_answer->sheet_id,
        'index' => $sheet_answer->index,
        'attributes' => $sheet_answer->attributes,
        'title' => $request->element['title'],
        'slug' => $request->element['slug'],
        'icon' => $request->element['icon']
      ]);
    }

    /**
     * @param \App\Models\Sheet;
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Support\Facades\Response
     */
    public function updateIndexesForElements(Sheet $sheet, Request $request)
    {
      $request->validate([
        'oldIndex'  => 'required',
        'newIndex' => 'required'
      ]);

      $answer = $sheet->answers()
        ->where('index', $request->oldIndex)
        ->firstOrFail();

      if ($request->oldIndex < $request->newIndex) {
        $sheet->answers()
          ->where('index', '>', $request->oldIndex)
          ->where('index', '<=', $request->newIndex)
          ->decrement('index');
      } else {
        $sheet->answers()
          ->where('index', '<', $request->oldIndex)
          ->where('index', '>=', $request->newIndex)
          ->increment('index');
      }

      $answer->index = $request->newIndex;

      return Response::json([
        'updated' => $answer->save()
      ]);
    }
}
