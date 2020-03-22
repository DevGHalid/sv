<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\FormElement;

class FormElementController extends Controller
{
  /**
   * @return \Illuminate\Database\Eloquent\Collection
   */
  public function index()
  {
      return FormElement::select('id', 'title', 'slug', 'icon', 'attributes')->get();
  }
}
