<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

Route::get('/home', [HomeController::class, 'index'])->name('home');
Route::get('/watchlist', [HomeController::class, 'watchlist'])->name('watchlist');
Route::get('/api/movies', [HomeController::class, 'getMovies'])->name('api.movies');
Route::resource('movie', MovieController::class);
Route::get('/search', [HomeController::class, 'search']);
Route::get('/profile', [UserController::class, 'index'])->name('user.profile');
// Use DELETE for destructive action and protect with auth middleware
Route::delete('/delete/{id}', [UserController::class, 'destroy'])->middleware('auth')->name('user.destroy');
