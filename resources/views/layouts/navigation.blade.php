<nav class="bg-white shadow-md sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Logo -->
            <div class="flex-shrink-0">
                <a href="{{ route('home') }}" class="text-2xl font-bold text-secondary">
                    🎬 MovieRec
                </a>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
                <a href="{{ route('home') }}" class="text-gray-600 hover:text-secondary transition-colors duration-200">
                    Discover
                </a>
                <a href="{{ route('watchlist') }}" class="text-gray-600 hover:text-secondary transition-colors duration-200">
                    My Watchlist
                </a>
                @auth
                    <a href="{{ route('user.profile') }}" class="text-gray-600 hover:text-secondary transition-colors duration-200">
                        Profile
                    </a>
                    <form method="POST" action="{{ route('logout') }}" class="inline">
                        @csrf
                        <button type="submit" class="btn-primary">
                            Logout
                        </button>
                    </form>
                @else
                    <a href="{{ route('login') }}" class="text-gray-600 hover:text-secondary transition-colors duration-200">
                        Login
                    </a>
                    <a href="{{ route('register') }}" class="btn-primary">
                        Sign Up
                    </a>
                @endauth
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button id="mobile-menu-btn" class="text-gray-600 hover:text-secondary focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobile-menu" class="hidden md:hidden pb-4">
            <a href="{{ route('home') }}" class="block px-2 py-2 text-gray-600 hover:text-secondary">Discover</a>
            <a href="{{ route('watchlist') }}" class="block px-2 py-2 text-gray-600 hover:text-secondary">My Watchlist</a>
            @auth
                <a href="{{ route('user.profile') }}" class="block px-2 py-2 text-gray-600 hover:text-secondary">Profile</a>
                <form method="POST" action="{{ route('logout') }}" class="inline">
                    @csrf
                    <button type="submit" class="block w-full text-left px-2 py-2 text-gray-600 hover:text-secondary">
                        Logout
                    </button>
                </form>
            @else
                <a href="{{ route('login') }}" class="block px-2 py-2 text-gray-600 hover:text-secondary">Login</a>
                <a href="{{ route('register') }}" class="block px-2 py-2 text-gray-600 hover:text-secondary">Sign Up</a>
            @endauth
        </div>
    </div>
</nav>

<script>
    document.getElementById('mobile-menu-btn').addEventListener('click', function() {
        const menu = document.getElementById('mobile-menu');
        menu.classList.toggle('hidden');
    });
</script>
