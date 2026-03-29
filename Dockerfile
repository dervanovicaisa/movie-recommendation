FROM php:8.2-fpm

# Install dependencies
RUN apt-get update && \
    apt-get install -y git unzip libzip-dev libpng-dev libicu-dev libonig-dev zlib1g-dev libxml2-dev libonig-dev && \
    docker-php-ext-install pdo pdo_mysql zip bcmath intl mbstring xml

# Node support for npm scripts in backend (if needed)
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# Composer install
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy files, install composer dependencies on container start
CMD ["php-fpm"]
