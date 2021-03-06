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
  Route::prefix('/users')->group(function() {
    Route::get('/', 'UserController@index');
  });

  Route::prefix('/form-lists')->group(function() {
    Route::get('/', 'FormListController@index');
    Route::post('/create', 'FormListController@create');
    Route::get('/{form_list}/edit', 'FormListController@edit');
    Route::delete('{form_list}/delete', 'FormListController@destroy');

    Route::post('{form_list}/add/sheet', 'FormListController@addSheetToFormList');
  });

  Route::prefix('/sheets')->group(function() {
    Route::get('/', 'SheetController@index');
    Route::post('{sheet}/elements/add', 'SheetController@addElementToSheet');
    Route::post('{sheet}/elements/update-index', 'SheetController@updateIndexesForElements');
    Route::post('{sheet}/elements/change-column', 'SheetController@changeColumnToElement');
    Route::delete('{sheet}/elements/{answer}/delete', 'SheetController@removeElementFromSheet');
  });

  Route::prefix('/form-list-elements')->group(function() {
    Route::get('/', 'FormListElementController@index');
  });
});
