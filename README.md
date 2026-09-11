# Movie Recommendation — Version 2 (React)

A full-stack application for discovering movies and TV shows, maintaining a personal watchlist, and receiving recommendations. This branch introduces a separate React client that consumes a Laravel API.

## Features

- Browse movies and TV shows provided by the TVMaze API
- Search and infinite scrolling
- User registration and login
- Add and remove items from a personal watchlist
- Collaborative recommendations based on other users' watchlists
- Profile page with user information and watchlist summary

## Architecture

The application uses a split frontend/backend design:

```text
React client (frontend/)
  -> Axios requests over HTTP/JSON
    -> Laravel API (routes/api.php)
      -> controllers and Eloquent models
        -> relational database and TVMaze API
```

- The Laravel backend lives in the repository root.
  - `routes/api.php` defines API endpoints.
  - Controllers retrieve TVMaze data, authenticate users, and manage watchlists and recommendations.
  - CORS settings are configured in `config/cors.php`.
- The React client lives in `frontend/`.
  - `src/App.js` configures Axios, routes, and authentication handling.
  - `src/components/` contains the UI pages and reusable components.
  - The client manages search, infinite scrolling, watchlists, and toast messages.

## Project Structure

```text
movie-recommendation/
├── app/                 Laravel controllers, models, and middleware
├── routes/              Web and API endpoints
├── database/            Migrations, factories, and seeders
├── config/              Laravel, session, and CORS configuration
└── frontend/            Independent React application
    └── src/components/  Page and UI components
```

React communicates with Laravel through `/api/*` endpoints using JSON. Laravel handles authentication, authorization, database access, and the TVMaze integration. On startup, React requests a Sanctum CSRF cookie for authenticated requests. Configure allowed cross-origin clients with `CORS_ALLOWED_ORIGINS`.

## Technology

- Laravel 8 and PHP
- React and Axios
- MySQL or another Laravel-supported database
- TVMaze API
- Tailwind CSS UI components

## Run the Backend

1. Run `composer install`.
2. Copy `.env.example` to `.env` and configure the database.
3. Run `php artisan key:generate`.
4. Run `php artisan migrate --seed`.
5. Start Laravel with `php artisan serve`.

## Run the Frontend

1. Change to the frontend directory: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

Set `REACT_APP_API_BASE_URL` in `frontend/.env` when the frontend and backend run on different origins. For a local Laravel server, use:

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

## Required Environment Settings

- In Laravel `.env`, configure the `DB_*` variables for the database.
- For a local React client, optionally set `CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000` in Laravel `.env`.
- In `frontend/.env`, set `REACT_APP_API_BASE_URL` to the Laravel server URL when needed.

## Docker

Start the full stack with:

```bash
docker compose up --build
```

The backend is available at `http://localhost:8000` and the frontend at `http://localhost:3000`. Stop the containers with `docker compose down`.

## Windows Notes

If PowerShell blocks `npm.ps1`, run `npm.cmd install` and `npm.cmd start` instead.
