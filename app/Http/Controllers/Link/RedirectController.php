<?php

namespace App\Http\Controllers\Link;

use App\Http\Controllers\Controller;
use App\Models\Link;
use Inertia\Inertia;

class RedirectController extends Controller
{
    public function __invoke(Link $link)
    {
        $link->redirects()->create();

        return Inertia::location($link->target);
    }
}