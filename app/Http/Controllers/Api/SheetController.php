<?php

namespace App\Http\Controllers\Api;

use App\Models\Sheet;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SheetController extends Controller
{
    /**
     * @param \Illuminate\Http\Request
     * @return \Illuminate\Support\Facades\Response
     */
    public function index(Request $request)
    {
        $sheets = Sheet::with('answers')
            ->select('id', 'user_id', 'form_list_id');

        if ($form_list_id = $request->form_list_id) {
            $sheets->where('form_list_id', $form_list_id);
        }

        return Response::json($sheets->get());
    }
}
