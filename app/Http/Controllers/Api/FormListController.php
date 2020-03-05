<?php

namespace App\Http\Controllers\Api;

use App\Models\FormList;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class FormListController extends Controller
{
  /**
   * @return
   */
  public function index()
  {
    $form_lists = FormList::select('id', 'user_id', 'title', 'created_at')
      ->with('user:id,name')
      ->get();

    return Response::json($form_lists);
  }
}
