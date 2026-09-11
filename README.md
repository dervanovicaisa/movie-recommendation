# Movie Recommendation

Prvobitna, server-rendered verzija aplikacije za pronalazak i čuvanje filmskih preporuka. Aplikacija je izrađena u Laravelu i koristi klasične Blade prikaze i Laravelovu autentifikaciju; ova grana namjerno ne sadrži React klijent.

## Funkcionalnosti

- registracija, prijava i odjava korisnika
- pregled i pretraga filmova
- dodavanje filmova na ličnu listu za gledanje
- pregled profila i brisanje stavki s liste
- preporuke zasnovane na korisničkim listama za gledanje

## Arhitektura

```text
Pregledač
  -> Laravel web rute (routes/web.php)
    -> kontroleri (app/Http/Controllers)
      -> modeli Eloquent (User, Watchlist)
        -> relaciona baza podataka
```

- `routes/web.php` definiše web rute i autentifikaciju.
- `HomeController` prikazuje početnu stranicu i pretragu.
- `MovieController` upravlja filmovima, listom za gledanje i istraživanjem preporuka.
- `UserController` prikazuje profil korisnika i uklanja stavke iz liste.
- `app/Models/Watchlist.php` predstavlja vezu korisnika i sačuvanih filmova.
- `database/migrations/` sadrži šemu baze, a `database/seeders/` početne podatke.

## Tehnologije

- PHP 7.3+ / PHP 8+
- Laravel 8
- MySQL ili druga Laravelom podržana baza
- Blade i Laravel UI autentifikacija

## Lokalno pokretanje

1. Instalirajte PHP, Composer i bazu podataka.
2. Pokrenite `composer install`.
3. Kopirajte `.env.example` u `.env` i unesite parametre baze podataka.
4. Pokrenite `php artisan key:generate`.
5. Kreirajte tabele i početne podatke komandom `php artisan migrate --seed`.
6. Pokrenite aplikaciju: `php artisan serve`.
7. Otvorite adresu koju ispiše Laravel, uobičajeno `http://127.0.0.1:8000`.

## Grane

- `main` — ova prvobitna Laravel verzija, bez Reacta.
- `version-2-react` — nova verzija sa Laravel API-jem i odvojenim React klijentom. Uputstva za nju nalaze se u README-u te grane.
