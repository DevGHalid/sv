<?php

namespace App\Http\Controllers\Api;

use App\Models\FormList;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Response, Auth};

class FormListController extends Controller
{
  /**
   * @return \Illuminate\Support\Facades\Response
   */
  public function index()
  {
    $form_lists = FormList::select('id', 'user_id', 'title', 'created_at')
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
   */
  public function destroy($form_list_id)
  {
    return Response::json([
      'deleted' => FormList::destroy($form_list_id)
    ]);
  }
}
