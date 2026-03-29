import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">MovieFlix</h3>
                        <p className="text-sm">Your personal movie recommendation platform. Discover and track movies you love.</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
                        <ul className="space-y-1 text-sm">
                            <li><a href="/" className="hover:text-white transition">Home</a></li>
                            <li><a href="/watchlist" className="hover:text-white transition">Watchlist</a></li>
                            <li><a href="/profile" className="hover:text-white transition">Profile</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">Contact</h3>
                        <p className="text-sm">Email: support@movieflix.com</p>
                        <p className="text-sm">© 2026 MovieFlix. All rights reserved.</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
                    <p>Made with ❤️ for movie lovers</p>
                </div>
            </div>
        </footer>
    );
}
