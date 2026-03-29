import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ user, watchlistCount = 0, onLogout }) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await onLogout();
        navigate('/login');
    };

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 no-underline">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">🎬</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">MovieFlix</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {user && (
                            <>
                                <Link
                                    to="/"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/watchlist"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition flex items-center gap-2"
                                >
                                    Watchlist
                                    {watchlistCount > 0 && (
                                        <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold">{watchlistCount}</span>
                                    )}
                                </Link>
                                <Link
                                    to="/profile"
                                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {user ? (
                            <>
                                <div className="hidden sm:flex items-center gap-2">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm no-underline"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
