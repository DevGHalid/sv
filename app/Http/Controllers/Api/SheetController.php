<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Sheet;

class SheetController extends Controller
{
    /**
     * @return Sheet
     */
    public function index()
    {
        return Sheet::select('id', 'user_id', 'title', 'created_at')->with('user:id,name,email')->get();
    }
}
