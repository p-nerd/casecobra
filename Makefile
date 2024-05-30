install:
	composer install
	pnpm install

format:
	composer run-script format
	pnpm format

dev:
	pnpm dev

work:
	php artisan queue:work

boradcasting:
	php artisan reverb:start --debug

check:
	php artisan pulse:check

