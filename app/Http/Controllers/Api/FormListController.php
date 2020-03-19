<?php

namespace App\Http\Controllers\Api;

use App\Models\{FormList, Sheet};
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Response, DB};

class FormListController extends Controller
{
  /**
   * @return \Illuminate\Support\Facades\Response
   */
  public function index()
  {
    $form_lists = FormList::select(
      'form_lists.id',
      'form_lists.user_id',
      'form_lists.title',
      'form_lists.created_at',
      DB::raw('COUNT(sheets.id) as sheet_count')
    )
      ->leftJoin('sheets', 'form_lists.id', 'sheets.form_list_id')
      ->groupBy('form_lists.id')
      ->with('user:id,name')
      ->get();

    return Response::json($form_lists);
  }

  /**
   * @param \Illuminate\Http\Request $request
   * @return \Illuminate\Support\Facades\Response
   */
  public function create(Request $request)
  {
    $user = Auth::user();

    $form_list = $user->formLists()->create([
      'title' => $request->title
    ]);

    return Response::json([
      'user' => $user,

      'id' => $form_list->id,
      'title' => $form_list->title,
      'created_at' => $form_list->created_at
    ]);
  }

  /**
   * @param int $form_list_id
   * @return \Illuminate\Support\Facades\Response
   */
  public function addSheetToFormList($form_list_id)
  {
    $sheet = Sheet::create([
      'user_id' => Auth::id(),
      'form_list_id' => $form_list_id
    ]);

    return Response::json([
      'id' => $sheet->id,
      'user_id' => $sheet->user_id,
      'form_list_id' => $sheet->form_list_id,
      'answers' => []
    ]);
  }

  /**
   * @param \App\Models\FormList $form_list
   * @return \Illuminate\Support\Facades\Response
   */

  public function edit(FormList $form_list)
  {
    return Response::json($form_list);
  }

  /**
   * @param int $form_list_id
   * @return \Illuminate\Support\Facades\Response
   */
  public function destroy(FormList $form_list)
  {
    // remove all answers from the form list
    $form_list->sheets()->each(function($sheet) {
      $sheet->answers()->delete();
    });

    // remove all sheets from the form list
    $form_list->sheets()->delete();

    return Response::json([
      // remove the form list
      'deleted' => $form_list->delete()
    ]);
  }
}
