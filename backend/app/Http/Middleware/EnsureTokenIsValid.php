<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureTokenIsValid
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        if (!$request->user('sanctum')) {
            return response()->json([
                'message' => 'Apenas usuários autenticados podem acessar essa rota!',
            ], 401);
        }

        return $next($request);
    }
}
