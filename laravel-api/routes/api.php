<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Permission\CreatePermissionController;
use App\Http\Controllers\User\CreateUserController;
use App\Http\Controllers\User\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('users', [UserController::class, 'store']); // No auth middleware
Route::post('login', [AuthController::class, 'login']); // No auth middleware


Route::prefix('api/v1/permission')->middleware('auth:api')->group(function(){

    Route::post('/create', [CreatePermissionController::class, 'CreateNewPermission']);

});


Route::prefix('api/v1')->middleware('auth:api')->group(function () {
    // User-related routes
    Route::apiResource('users', UserController::class);

});

