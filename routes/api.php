<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['namespace' => 'Auth', 'prefix' => 'auth'], function() {
    Route::post('/login', 'LoginController@login');
    Route::post('/logout', 'LoginController@logout');
});

Route::group(['middleware' => 'auth:api', 'namespace' => 'Api'], function() {
    Route::prefix('/sheets')->group(function() {
      Route::get('/', 'SheetController@index');
      Route::get('/{sheet}', 'SheetController@show');

      Route::get('/{sheet}/answers', 'SheetController@answers');

      Route::post('/{sheet}/answers/add', 'SheetController@addAnswer');
      Route::put('/{sheet}/answers/index', 'SheetController@updateIndexAnswer');

      Route::delete('/{sheet}/delete', 'SheetController@destroy');
    });

    Route::prefix('/sheet-answers')->group(function() {
      Route::put('/{answer}', 'SheetAnswerController@update');
    });

    Route::prefix('/form-elements')->group(function() {
        Route::get('/', 'FormElementController@index');
    });
});
