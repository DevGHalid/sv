<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\{Response, Hash, Auth};
use App\Models\User;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api')->except('login');
    }

    /**
     * @param \App\Http\Requests\LoginRequest
     */
    public function login(LoginRequest $request)
    {
        // find a user by email
        $user = User::where('email', $request->email)->first();

        // check user
        if ($user && Hash::check($request->password, $user->password)) {
            // add or update token
            $user->updateApiToken();

            return Response::json([
                'id' => $user->id,
                'accessToken' => $user->api_token,
                'name' => $user->name,
            ]);
        }

        return Response::json([
            'errors' => [
                'message' => ['Электронный адрес или пароль, который вы указали, не соответствует ни одному аккаунту!']
            ]
        ], 422);
    }

    public function logout()
    {
      return Response::json([
        'loggedOut' => Auth::user()->resetApiToken()
      ]);
    }
}
