# Movie Recommendation

The original server-rendered version of a movie discovery and recommendation application. It is built with Laravel, traditional Blade views, and Laravel authentication. This branch intentionally has no React client.

## Features

- User registration, login, and logout
- Browse and search movies
- Add movies to a personal watchlist
- View a user profile and remove watchlist entries
- Recommendations based on users' watchlists

## Architecture

```text
Browser
  -> Laravel web routes (routes/web.php)
    -> controllers (app/Http/Controllers)
      -> Eloquent models (User, Watchlist)
        -> relational database
```

- `routes/web.php` defines the web routes and authentication endpoints.
- `HomeController` renders the home page and search results.
- `MovieController` manages movies, watchlists, and recommendation exploration.
- `UserController` renders the user profile and removes watchlist entries.
- `app/Models/Watchlist.php` represents the relationship between a user and saved movies.
- `database/migrations/` contains the database schema; `database/seeders/` contains initial data.

## Technology

- PHP 7.3+ / PHP 8+
- Laravel 8
- MySQL or another Laravel-supported database
- Blade and Laravel UI authentication

## Run Locally

1. Install PHP, Composer, and a database server.
2. Run `composer install`.
3. Copy `.env.example` to `.env` and configure the database settings.
4. Run `php artisan key:generate`.
5. Create the database tables and seed initial data with `php artisan migrate --seed`.
6. Start the application with `php artisan serve`.
7. Open the URL shown by Laravel, usually `http://127.0.0.1:8000`.

## Branches

- `main` — this original Laravel application, without React.
- `version-2-react` — the updated version with a Laravel API and a separate React client. See that branch's README for its setup instructions.
