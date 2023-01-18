<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => 'api'], function () {
    Route::get('index', 'App\Http\Controllers\CreateController@index');
    Route::post('create', 'App\Http\Controllers\CreateController@create');
    Route::post('addUser', 'App\Http\Controllers\CreateController@addUser');
    Route::post('checkin', 'App\Http\Controllers\CreateController@checkin');
    Route::post('home', 'App\Http\Controllers\CreateController@home');
    Route::post('getWeek', 'App\Http\Controllers\CreateController@getWeek');
    Route::post('detail', 'App\Http\Controllers\CreateController@getDetail');
    Route::post('fillOut', 'App\Http\Controllers\CreateController@fillOut');
});
