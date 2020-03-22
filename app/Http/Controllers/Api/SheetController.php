<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FormElement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Sheet;

class SheetController extends Controller
{
    /**
     * @return \Illuminate\Database\Eloquent\Collection
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
        return Sheet::select('id','user_id','title')->with(array('user:id,name'))->findOrFail($sheet_id);
    }

    /**
     * @param \App\Models\Sheet
     * @return array
     */
    public function destroy(Sheet $sheet)
    {
        $sheet->answers()->delete();

        return array('deleted' => $sheet->delete());
    }

  /**
   * @param \App\Models\Sheet $sheet
   * @return \Illuminate\Database\Eloquent\Collection
   */
    public function answers(Sheet $sheet)
    {
      $answers = $sheet->answers()->join(
        'form_elements AS elements',
        'sheet_answers.form_element_id',
        'elements.id'
      )->select(
        'sheet_answers.id',
        'sheet_answers.sheet_id',
        'sheet_answers.form_element_id',
        'sheet_answers.index',
        'sheet_answers.attributes',
        'elements.title',
        'elements.slug',
        'elements.icon'
      )->orderBy('sheet_answers.index', 'asc')->get();

      return $answers;
    }

    /**
     * @param \App\Models\Sheet $sheet
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function addAnswer(Sheet $sheet, Request $request)
    {
      $candidate = Validator::make($request->all(), array(
        'form_element_id' => 'required',
        'attributes' => 'required',
        'index' => 'required'
      ))->validate();

      // make order
      $sheet->answers()->where('index', '>=', $request->index)
        ->increment('index');

      // create a new answer for the sheet
      $new_answer = $sheet->answers()->create($candidate);

      // load the form element
      $form_element = FormElement::find($new_answer->form_element_id);

      return array(
        'id' => $new_answer->id,
        'sheet_id' => $new_answer->sheet_id,
        'index' => $new_answer->index,
        'attributes' => $new_answer->attributes,
        'form_element_id' => $form_element->id,
        'title' => $form_element->title,
        'slug' => $form_element->slug,
        'icon' => $form_element->icon
      );
    }

    /**
     * @param \App\Models\Sheet $sheet
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function updateIndexAnswer(Sheet $sheet, Request $request)
    {
      Validator::make($request->all(), array(
        'old_index' => 'required',
        'new_index' => 'required'
      ));

      $answer = $sheet->answers()
        ->where('index', $request->old_index)
        ->firstOrFail();

      if ($request->old_index < $request->new_index) {
        $sheet->answers()
          ->where('index', '>', $request->old_index)
          ->where('index', '<=', $request->new_index)
          ->decrement('index');
      } else {
        $sheet->answers()
          ->where('index', '<', $request->old_index)
          ->where('index', '>=', $request->new_index)
          ->increment('index');
      }

      $answer->index = $request->new_index;

      return array(
        'updated' => $answer->save()
      );
    }
}
