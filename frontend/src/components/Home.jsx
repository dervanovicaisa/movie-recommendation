import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

function MovieCard({ movie, isInWatchlist, onAdd }) {
    const image = movie?.image?.original || movie?.show?.image?.original;
    const name = movie?.name || movie?.show?.name;
    const rating = movie?.rating?.average || movie?.show?.rating?.average;
    const genres = movie?.genres || movie?.show?.genres || [];

    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden h-full flex flex-col group">
            {/* Image */}
            <div className="relative h-64 overflow-hidden bg-gray-200">
                <img
                    src={image || 'https://via.placeholder.com/300x400?text=No+Image'}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                />
                {rating && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ {rating}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{name}</h3>

                {genres && genres.length > 0 && (
                    <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                        {genres.join(', ')}
                    </p>
                )}

                {/* Add to Watchlist Button */}
                <button
                    onClick={() => onAdd(movie)}
                    disabled={isInWatchlist}
                    className={`mt-auto py-2 px-4 rounded-lg font-semibold text-sm transition ${
                        isInWatchlist
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                    {isInWatchlist ? '✓ In Watchlist' : '+ Add to Watchlist'}
                </button>
            </div>
        </div>
    );
}

export default function Home({ watchlistIds, onAddWatchlist, setGlobalToast }) {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const fetchMovies = useCallback(async (pageNum = 0, searchTerm = '') => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/movies', {
                params: {
                    page: pageNum,
                    keyword: searchTerm
                }
            });

            if (!Array.isArray(data) || data.length === 0) {
                setHasMore(false);
                if (pageNum === 0) {
                    setMovies([]);
                    setGlobalToast({ message: 'No movies found', type: 'info' });
                }
            } else {
                if (pageNum === 0) {
                    setMovies(data);
                } else {
                    setMovies(prev => [...prev, ...data]);
                }
                setHasMore(data.length > 0);
            }
        } catch (error) {
            setGlobalToast({ message: 'Failed to load movies', type: 'error' });
        } finally {
            setLoading(false);
        }
    }, [setGlobalToast]);

    useEffect(() => {
        fetchMovies(0, '');
    }, [fetchMovies]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(0);
        setHasMore(true);
        fetchMovies(0, search);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Discover Movies</h1>
                <p className="text-gray-600">Find your next favorite movie and add it to your watchlist</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search movies by name..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Movies Grid */}
            {loading && page === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            ) : movies.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">No movies found. Try a different search.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {movies.map((movie, idx) => (
                            <MovieCard
                                key={`${movie.id}-${idx}`}
                                movie={movie}
                                isInWatchlist={watchlistIds.has(movie.id || movie.show?.id)}
                                onAdd={onAddWatchlist}
                            />
                        ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    const nextPage = page + 1;
                                    setPage(nextPage);
                                    fetchMovies(nextPage, search);
                                }}
                                disabled={loading}
                                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Loading...' : 'Load More Movies'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
