install:
	composer install
	pnpm install

format:
	composer run-script format
	pnpm format

dev:
	pnpm dev & \
	php artisan queue:work
