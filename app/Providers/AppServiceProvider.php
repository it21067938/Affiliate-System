<?php

namespace App\Providers;

use App\Repositories\All\Leads\LeadsInterface;
use App\Repositories\All\Leads\LeadsRepository;
use App\Repositories\All\Links\LinkInterface;
use App\Repositories\All\Links\LinkRepository;
use App\Repositories\All\Redirect\RedirectInterface;
use App\Repositories\All\Redirect\RedirectRepository;
use App\Repositories\All\Users\UserInterface;
use App\Repositories\All\Users\UserRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserInterface::class, UserRepository::class);
        $this->app->bind(LinkInterface::class, LinkRepository::class);
        $this->app->bind(RedirectInterface::class, RedirectRepository::class);
        $this->app->bind(LeadsInterface::class, LeadsRepository::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}