<?php

namespace App\Http\Middleware;

use App\Enums\Role;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role !== Role::ADMIN->value) {
            return abort(404);
        }

        return $next($request);
    }
}
