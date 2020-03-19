<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\{Auth, Response};

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email')
            ->where('id', '!=', Auth::id())
            ->get();

        return Response::json($users);
    }
}
