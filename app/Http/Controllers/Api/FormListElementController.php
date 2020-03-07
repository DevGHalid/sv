<?php

namespace App\Http\Controllers\Api;

use App\Models\FormListElement;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class FormListElementController extends Controller
{
    public function index()
    {
        $form_list_elements = FormListElement::select('id', 'title', 'slug', 'icon', 'attributes')->get();

        return Response::json($form_list_elements);
    }
}
