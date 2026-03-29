# movie-app
movie recommendation

## What It Does

This is a web application for movie and TV show recommendations, built with a split architecture: Laravel backend API + React frontend.

- **Movie Discovery**: Fetches and displays movies/TV shows from the TVMaze API, with search and infinite scroll.
- **User Authentication**: Laravel handles user login/registration.
- **Watchlist Management**: Users can add/remove movies to/from their personal watchlist.
- **Recommendations**: Shows movies based on other users' watchlists (collaborative filtering via PHP-ML).
- **Profile View**: Displays user info and watchlist count.

## Architecture: BE/API + React FE

This project now follows a split architecture:

- Laravel backend in the project root
  - API routes in `routes/api.php`
  - `HomeController@getMovies` fetches TVMaze and returns JSON
  - `MovieController@store` creates watchlist entries with JSON support
  - `UserController@apiWatchlist` and `destroyWatchlistEntry` manage watchlist
  - CORS is enabled for `api/*` in `config/cors.php`

- React frontend in `frontend/`
  - `npm install` + `npm start` runs dev server
  - Frontend calls `/api/*` endpoints
  - Handles search, infinite pages, watchlist management, toasts

## Run backend

1. `composer install`
2. `.env` DB setup
3. `php artisan key:generate`
4. `php artisan migrate --seed`
5. `php artisan serve`

## Run frontend

1. `cd frontend`
2. `npm install`
3. `npm start`

React app uses `REACT_APP_API_BASE_URL` (default `''`) for dropped-in proxying to the same domain. For cross-origin, set the URL.

### Local backend API Base URL (dev)

Create `frontend/.env` with:

- `REACT_APP_API_BASE_URL=http://127.0.0.1:8000`

This makes the frontend call your locally running Laravel backend on port 8000.

### Docker backend API Base URL (container)

In `docker-compose.yml`, `frontend.environment` already sets:

- `REACT_APP_API_BASE_URL=http://backend:8000`

## Windows notes (PowerShell)

- Run `npm` using `npm.cmd` if `npm.ps1` is blocked:
  - `npm.cmd install`
  - `npm.cmd start`
- If `spawn` errors appear, use `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` in an elevated PowerShell.
- If using PHP 8.4, apply:
  - `composer update --no-interaction`
  - `composer dump-autoload`
  - `php artisan migrate --seed`
  - `php artisan serve --host=127.0.0.1 --port=8000`

## Run with Docker Compose

1. `docker compose up --build`
2. Backend: `http://localhost:8000`
3. Frontend: `http://localhost:3000`

Docker config:
- `docker-compose.yml`: mysql + laravel + react services
- `Dockerfile`: php-fpm image with composer + node
- `.env.docker`: Laravel config for containers

Use `docker compose down` to stop and remove containers.
 
