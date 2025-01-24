<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Permission\CreatePermissionController;
use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('signup', [UserController::class, 'store']); // No auth middleware
Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1'); // No auth middleware


Route::prefix('v1/permission')->middleware('auth:api')->group(function(){

    Route::post('/create', [CreatePermissionController::class, 'CreateNewPermission']);

});


Route::prefix('v1')->middleware('auth:api')->group(function () {
    // User-related routes
    Route::apiResource('users', UserController::class);

});

