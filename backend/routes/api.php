<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InconsistencieController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Middleware\EnsureTokenIsValid;


Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/inconsistencies', [InconsistencieController::class, 'store']);



Route::middleware(EnsureTokenIsValid::class)->group(function () {
    Route::get('/inconsistencies', [InconsistencieController::class, 'index']);
    Route::get('/inconsistencies/{id}/file', [InconsistencieController::class, 'download']);
    Route::get('/inconsistencies/show/{id}', [InconsistencieController::class, 'show']);
});
