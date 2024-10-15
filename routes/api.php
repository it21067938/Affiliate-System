<?php

use App\Http\Controllers\WebHooksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::any('/webhook/{form}', [WebHooksController::class, 'handle']);
