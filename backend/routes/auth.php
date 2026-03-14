<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\EnsureTokenIsValid;

Route::post('/login', [AuthController::class, 'login']);


Route::middleware(EnsureTokenIsValid::class)->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
