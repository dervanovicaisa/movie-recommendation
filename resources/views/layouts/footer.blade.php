<footer class="bg-gray-900 text-gray-300 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <h3 class="text-xl font-bold text-white mb-4">🎬 MovieRec</h3>
                <p class="text-gray-400">Your personal movie recommendation engine. Discover, watch, and share your favorite movies.</p>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-white mb-4">Quick Links</h4>
                <ul class="space-y-2">
                    <li><a href="{{ route('home') }}" class="hover:text-secondary transition-colors">Discover</a></li>
                    <li><a href="{{ route('home') }}#watchlist" class="hover:text-secondary transition-colors">Watchlist</a></li>
                    @auth
                        <li><a href="{{ route('user.profile') }}" class="hover:text-secondary transition-colors">Profile</a></li>
                    @endauth
                </ul>
            </div>
            <div>
                <h4 class="text-lg font-semibold text-white mb-4">Get Started</h4>
                @auth
                    <p class="text-gray-400">Welcome back, {{ Auth::user()->name }}!</p>
                @else
                    <p class="text-gray-400 mb-4">Sign up to get personalized recommendations</p>
                    <a href="{{ route('register') }}" class="btn-primary">Create Account</a>
                @endauth
            </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 MovieRec. All rights reserved.</p>
        </div>
    </div>
</footer>
