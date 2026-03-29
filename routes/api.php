<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

// Public auth routes with session middleware
Route::middleware(['web'])->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['web', 'auth:web'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/movies', [\App\Http\Controllers\HomeController::class, 'getMovies']);
    Route::get('/watchlist', [\App\Http\Controllers\UserController::class, 'apiWatchlist']);
    Route::post('/watchlist', [\App\Http\Controllers\MovieController::class, 'store']);
    Route::delete('/watchlist/{id}', [\App\Http\Controllers\UserController::class, 'destroyWatchlistEntry']);
});
