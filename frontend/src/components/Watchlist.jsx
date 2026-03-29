import React from 'react';

export default function Watchlist({ items, onDelete, setGlobalToast }) {
    const handleRemove = async (id) => {
        try {
            await onDelete(id);
            setGlobalToast({ message: 'Removed from watchlist', type: 'success' });
        } catch (error) {
            setGlobalToast({ message: 'Failed to remove from watchlist', type: 'error' });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Watchlist</h1>
                <p className="text-gray-600">
                    {items.length} {items.length === 1 ? 'movie' : 'movies'} in your watchlist
                </p>
            </div>

            {/* Empty State */}
            {items.length === 0 ? (
                <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎬</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your watchlist is empty</h3>
                    <p className="text-gray-600 mb-6">Start by adding some movies from the discover page</p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                    >
                        Browse Movies
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-48 bg-gray-200 overflow-hidden">
                                <img
                                    src={item.movie_img_url || 'https://via.placeholder.com/300x400?text=No+Image'}
                                    alt={item.movie_name}
                                    className="w-full h-full object-cover"
                                />
                                {item.score && (
                                    <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        ⭐ {item.score}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg text-gray-900 mb-1">{item.movie_name}</h3>

                                {item.genre && (
                                    <p className="text-xs text-gray-600 mb-4 line-clamp-1">
                                        {typeof item.genre === 'string' ? item.genre : (Array.isArray(item.genre) ? item.genre.join(', ') : 'N/A')}
                                    </p>
                                )}

                                {/* Action Button */}
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="mt-auto py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                                >
                                    Remove from Watchlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
