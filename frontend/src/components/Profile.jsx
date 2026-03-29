import React from 'react';

export default function Profile({ user, watchlistCount }) {
    if (!user) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <p className="text-gray-600">Please login to view your profile</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
                <p className="text-gray-600">Manage your account information</p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-md p-6 text-center">
                        {/* Avatar */}
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white font-bold text-3xl">
                                {user.name ? user.name[0].toUpperCase() : 'U'}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
                        <p className="text-gray-600 text-sm mb-4">{user.email}</p>

                        {/* Status Badge */}
                        <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            ✓ Active
                        </div>
                    </div>
                </div>

                {/* Account Details */}
                <div className="lg:col-span-2">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="text-gray-600 text-sm font-semibold mb-1">Watchlist Items</div>
                            <div className="text-4xl font-bold text-blue-600">{watchlistCount}</div>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <div className="text-gray-600 text-sm font-semibold mb-1">Account Age</div>
                            <div className="text-lg font-bold text-gray-900">
                                {user.created_at
                                    ? new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                    })
                                    : 'Recently'}
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Account Information</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                                    {user.name}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                                    {user.email}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Member Since</label>
                                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                                    {user.created_at
                                        ? new Date(user.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })
                                        : 'Recently joined'}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Preferences</h3>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-gray-900">Email Notifications</p>
                                    <p className="text-sm text-gray-600">Get updates about new movies</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
