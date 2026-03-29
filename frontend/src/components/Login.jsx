import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Toast from './Toast';

export default function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post('/api/login', { email, password });
            setToast({ message: 'Login successful!', type: 'success' });
            onLoginSuccess(data.user);
            setTimeout(() => navigate('/'), 1000);
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed. Please try again.';
            setToast({ message, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                        <span className="text-white text-2xl">🎬</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">MovieFlix</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>

                {/* Toast */}
                {toast && (
                    <div className="mb-4">
                        <Toast message={toast.message} type={toast.type} />
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg p-8 space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition outline-none"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Signup Link */}
                <p className="text-center mt-6 text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                        Sign up here
                    </Link>
                </p>

                {/* Demo Credentials */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Demo Credentials:</p>
                    <p className="text-xs text-gray-600">
                        <span className="font-mono">dervanovicaisa@gmail.com</span>
                    </p>
                    <p className="text-xs text-gray-600">
                        <span className="font-mono">aisa1234</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
