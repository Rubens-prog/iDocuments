<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\InconsistencieController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Middleware\EnsureTokenIsValid;


Route::get('/categories', [CategoryController::class, 'index']);


Route::post('/inconsistencies', [InconsistencieController::class, 'store']);



Route::prefix('admin')->middleware(EnsureTokenIsValid::class)->group(function () {

    Route::get('/admin/inconsistencies/{id}/file', [InconsistencieController::class, 'download']);
});
