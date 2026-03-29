import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Watchlist from './components/Watchlist';
import Profile from './components/Profile';


// Configure axios
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000';

// Add response interceptor for 401 errors
let navigationRef = null;

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // User is not authenticated
            navigationRef && navigationRef('/login');
        }
        return Promise.reject(error);
    }
);

function AppContent() {
    const [user, setUser] = useState(() => {
        try {
            const saved = localStorage.getItem('movieflix_user');
            return saved ? JSON.parse(saved) : null;
        } catch {
            return null;
        }
    });
    const [watchlist, setWatchlist] = useState([]);
    const [toast, setToast] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);

    // Check if user is already authenticated on mount with session check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get('/api/user');
                setUser(data);
                localStorage.setItem('movieflix_user', JSON.stringify(data));
                await loadWatchlist();
            } catch (error) {
                // User is not authenticated
                setUser(null);
                localStorage.removeItem('movieflix_user');
            } finally {
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, []);

    const loadWatchlist = async () => {
        try {
            const { data } = await axios.get('/api/watchlist');
            setWatchlist(Array.isArray(data) ? data : []);
        } catch (error) {
            setWatchlist([]);
        }
    };

    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('movieflix_user', JSON.stringify(userData));
        loadWatchlist();
        showToast('Welcome back!', 'success');
    };

    const handleSignupSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('movieflix_user', JSON.stringify(userData));
        loadWatchlist();
        showToast('Account created successfully!', 'success');
    };

    const handleLogout = async () => {
        try {
            await axios.post('/api/logout', {});
            setUser(null);
            setWatchlist([]);
            localStorage.removeItem('movieflix_user');
            showToast('Logged out successfully', 'success');
        } catch (error) {
            showToast('Logout failed', 'error');
        }
    };

    const handleAddWatchlist = async (movie) => {
        if (!user) {
            showToast('Please login first', 'error');
            return;
        }

        const payload = {
            movieID: movie.id || movie.show?.id,
            movie_name: movie.name || movie.show?.name,
            movie_img_url: movie.image?.original || movie.show?.image?.original || '',
            score: movie.rating?.average || movie.show?.rating?.average || 0,
            movie_genre: movie.genres || movie.show?.genres || [],
        };

        try {
            await axios.post('/api/watchlist', payload);
            await loadWatchlist();
            showToast(`${payload.movie_name} added to watchlist!`, 'success');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to add to watchlist';
            showToast(message, 'error');
        }
    };

    const handleRemoveWatchlist = async (id) => {
        try {
            await axios.delete(`/api/watchlist/${id}`);
            await loadWatchlist();
        } catch (error) {
            showToast('Failed to remove from watchlist', 'error');
        }
    };

    const showToast = (messageOrObject, type = 'info') => {
        const toastPayload =
            typeof messageOrObject === 'object' && messageOrObject !== null
                ? {
                    message: messageOrObject.message || 'Notification',
                    type: messageOrObject.type || 'info',
                }
                : {
                    message: String(messageOrObject),
                    type,
                };

        setToast(toastPayload);
        setTimeout(() => setToast(null), 3000);
    };

    const watchlistIds = new Set(watchlist.map(item => item.movieID || item.movie_id || item.id));

    if (!authChecked) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="text-gray-600 font-semibold">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header user={user} watchlistCount={watchlist.length} onLogout={handleLogout} />

            {/* Toast Container */}
            {toast && (
                <div className="fixed top-20 right-4 z-50">
                    <Toast message={toast.message} type={toast.type} />
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1">
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={
                            user ? (
                                <Navigate to="/" replace />
                            ) : (
                                <Login onLoginSuccess={handleLoginSuccess} />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            user ? (
                                <Navigate to="/" replace />
                            ) : (
                                <Signup onSignupSuccess={handleSignupSuccess} />
                            )
                        }
                    />

                    {/* Protected Routes */}
                    <Route
                        path="/"
                        element={
                            user ? (
                                <Home
                                    watchlistIds={watchlistIds}
                                    onAddWatchlist={handleAddWatchlist}
                                    setGlobalToast={showToast}
                                />
                            ) : (
                                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">🎬</div>
                                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to MovieFlix</h1>
                                        <p className="text-gray-600 mb-6 max-w-md">
                                            Discover, track, and share your favorite movies. Sign in to get started.
                                        </p>
                                        <a
                                            href="/login"
                                            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Sign In
                                        </a>
                                    </div>
                                </div>
                            )
                        }
                    />

                    <Route
                        path="/watchlist"
                        element={
                            user ? (
                                <Watchlist
                                    items={watchlist}
                                    onDelete={handleRemoveWatchlist}
                                    setGlobalToast={showToast}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            user ? (
                                <Profile
                                    user={user}
                                    watchlistCount={watchlist.length}
                                />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
