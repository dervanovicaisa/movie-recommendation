<?php

namespace App\Http\Controllers;

use GuzzleHttp;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Watchlist;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Use authenticated user rather than trusting user_id from the request
        $validator = Validator::make($request->all(), [
            'movie_name' => 'required|string|max:255',
            'movie_genre' => 'required',
            'score' => 'required|numeric|min:0|max:10',
            'movie_img_url' => 'nullable|url',
            'movieID' => 'nullable'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        $watchlist = new Watchlist();
        $watchlist->movie_name = $request->movie_name;
        $watchlist->cover_photo = $request->movie_img_url ?? null;
        $watchlist->user_id = Auth::id();
        $watchlist->rating = $request->score;

        // movie_genre may be an array from the client; store as a comma-separated string for now
        if (is_array($request->movie_genre)) {
            $watchlist->genre = implode(',', $request->movie_genre);
        } else {
            $watchlist->genre = $request->movie_genre;
        }

        $watchlist->movie_id = $request->movieID ?? null;

        try {
            $watchlist->save();
        } catch (\Throwable $e) {
            // Log exception in real app; return a friendly message here
            if ($request->expectsJson() || $request->ajax()) {
                return response()->json(['message' => 'Failed to add movie to watchlist.'], 500);
            }
            return redirect()->back()->with('error', 'Failed to add movie to watchlist.');
        }

        if ($request->expectsJson() || $request->ajax()) {
            return response()->json(['message' => 'Successfully added movie to watchlist.']);
        }

        return redirect()->back()->with('success', 'Successfully added movie in your watchlist!');
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $client = new Client(['timeout' => 5]);
        try {
            $res = $client->get('http://api.tvmaze.com/shows/' . (int)$id);
            $movie_details = json_decode($res->getBody());
        } catch (\Throwable $e) {
            // On error, show a friendly message or fallback view
            $movie_details = null;
        }
        return view('site.movie_details', compact('movie_details'));
    }
}
