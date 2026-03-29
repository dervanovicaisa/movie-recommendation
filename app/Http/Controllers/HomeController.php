<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp;
use GuzzleHttp\Client;
use App\Models\User;
use App\Models\Watchlist;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $watchlists = Watchlist::where('user_id', Auth::id())->get();
        $moviesNeighbors = HomeController::exploreMovie();
        $user = $movies_alike = "";
        foreach ($moviesNeighbors as $key => $value) {
            foreach ($value as $key1 => $value1) {
                if (!empty($value1)) {
                    $movies_alike = $value1;
                    $user = User::where('id', $value1[$key1]['user_id'])->first();
                }
            }
        }

        $client = new Client(['timeout' => 5]);
        $keyword = $request->keyword;
        $page = $request->page ?? 1;
        try {
            if (!empty($keyword)) {
                $res = $client->get('http://api.tvmaze.com/search/shows?q=' . urlencode($keyword) . '&page=' . $page);
                $movies = json_decode($res->getBody());
            } else {
                $res = $client->get('http://api.tvmaze.com/shows?page=' . $page);
                $movies = json_decode($res->getBody());
            }
        } catch (\Throwable $e) {
            $movies = [];
        }
        return view("site.index", compact('movies', 'watchlists', 'user', 'movies_alike', 'page'));
    }

    public function getMovies(Request $request)
    {
        $client = new Client(['timeout' => 5]);
        $page = $request->page ?? 1;
        $keyword = $request->keyword;
        
        try {
            if (!empty($keyword)) {
                $res = $client->get('http://api.tvmaze.com/search/shows?q=' . urlencode($keyword) . '&page=' . $page);
                $movies = json_decode($res->getBody());
            } else {
                $res = $client->get('http://api.tvmaze.com/shows?page=' . $page);
                $movies = json_decode($res->getBody());
            }
        } catch (\Throwable $e) {
            $movies = [];
        }

        return response()->json($movies);
    }

    public function search(Request $request)
    {
        $search = $request->search_keyword;
        $client = new Client(['timeout' => 5]);
        try {
            $res = $client->get('http://api.tvmaze.com/search/shows?q=' . urlencode($search));
            $movie_search = json_decode($res->getBody());
        } catch (\Throwable $e) {
            $movie_search = [];
        }
        return view("search", compact('movie_search'));
    }

    public static function exploreMovie()
    {
        $users = User::where('id', '!=', Auth::id())->get();
        $user = User::where('id', Auth::id())->get();
        $getMovieName =  Watchlist::select('movie_name')->where('user_id', Auth::id())->get()->toArray();
        foreach ($user  as $key => $value) {
            if ($value->id == Auth::id()) {
                $movie[$key] = array(Watchlist::where('user_id', $value->id)->get()->toArray());
            }
        }
        foreach ($users as $key => $value) {
            if ($value->id != Auth::id()) {
                $movies[$key] = array(Watchlist::where('user_id', '=', $value->id)->whereNotIn('movie_name', $getMovieName)->get()->toArray());
            }
        }
        $k = 1;

        //  u helepers.php se nalazi metoda getNeighbors
        return getNeighbors($movie[0], $movies, $k);
    }

    public function watchlist()
    {
        $watchlists = Watchlist::where('user_id', Auth::id())->paginate(12);
        return view('site.watchlist', compact('watchlists'));
    }
}
 