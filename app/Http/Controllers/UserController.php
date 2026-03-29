<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Watchlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::find(Auth::id());
        $watchlists = Watchlist::where('user_id',Auth::id())->orderBy('id', 'DESC')->get();
        return view('site.profile.profile', compact('user','watchlists'));
    }

    public function apiWatchlist(Request $request)
    {
        $watchlists = Watchlist::where('user_id', Auth::id())->orderBy('id', 'DESC')->get();
        return response()->json($watchlists);
    }

    public function destroyWatchlistEntry($id)
    {
        $item = Watchlist::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$item) {
            return response()->json(['message' => 'Watchlist item not found'], 404);
        }

        $item->delete();
        return response()->json(['message' => 'Item removed from watchlist']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::where('id', $id)->delete();
        return redirect()->back()->with('success', 'Your account is successfully deleted!');
    }
}
