<?php

namespace App\Http\Controllers\Admin\AdminDashboard;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\Redirect;
use App\Models\User;
use App\Repositories\All\Links\LinkInterface;
use App\Repositories\All\Redirect\RedirectInterface;
use App\Repositories\All\Users\UserInterface;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __construct(
        protected UserInterface $userInterface,
        protected LinkInterface $linkInterface,
        protected RedirectInterface $redirectInterface
    ) {}


    public function index()
    {
        $affiliateCount = $this->userInterface->getAffiliateCount();
        $totalLinksCount = $this->linkInterface->getTotalLinksCount();
        $totalSiteVisitors = $this->redirectInterface->getTotalSiteVisitorsCount();

        $newLinks = $this->linkInterface->getRecentLinks()
            ->map(function ($link) {
                return [
                    'message' => 'Affiliate - ' . $link->user->name . ' generated a new link.',
                    'created_at' => $link->created_at
                ];
            });

        $linkRedirects = $this->redirectInterface->getRecentRedirects()
            ->map(function ($redirect) {
                return [
                    'message' => 'Affiliate - ' . $redirect->link->user->name . '\'s link received a new visit.',
                    'created_at' => $redirect->created_at
                ];
            });

        $newAffiliates = $this->userInterface->getRecentAffiliates()
            ->map(function ($user) {
                return [
                    'message' => 'Affiliate - ' . $user->name . ' joined the program.',
                    'created_at' => $user->created_at
                ];
            });

        $recentActivities = collect()
            ->merge($newLinks)
            ->merge($linkRedirects)
            ->merge($newAffiliates)
            ->sortByDesc('created_at')
            ->values()
            ->all();

        $dailyLinkData = $this->linkInterface->getDailyLinkData();

        return Inertia::render('Admin/All/AdminDashboard', [
            'affiliateCount' => $affiliateCount,
            'totalLinksCount' => $totalLinksCount,
            'totalSiteVisitors' => $totalSiteVisitors,
            'recentActivities' => $recentActivities,
            'dailyLinkData' => $dailyLinkData
        ]);
    }


    // public function index()
    // {
    //     $affiliateCount = User::where('role', 'affiliate')->count();
    //     $totalLinksCount = Link::count();
    //     $totalSiteVisitors = Redirect::count();

    //     $recentActivities = [];

    //     $newLinks = Link::with('user')
    //         ->orderBy('created_at', 'desc')
    //         ->take(5)
    //         ->get()
    //         ->map(function ($link) {
    //             return [
    //                 'message' => 'Affiliate - ' . $link->user->name . ' generated a new link.',
    //                 'created_at' => $link->created_at
    //             ];
    //         });

    //     $linkRedirects = Redirect::with('link.user')
    //         ->orderBy('created_at', 'desc')
    //         ->take(5)
    //         ->get()
    //         ->map(function ($redirect) {
    //             return [
    //                 'message' => 'Affiliate - ' . $redirect->link->user->name . '\'s link received a new visit.',
    //                 'created_at' => $redirect->created_at
    //             ];
    //         });

    //     $newAffiliates = User::where('role', 'affiliate')
    //         ->orderBy('created_at', 'desc')
    //         ->take(5)
    //         ->get()
    //         ->map(function ($user) {
    //             return [
    //                 'message' => 'Affiliate - ' . $user->name . ' joined the program.',
    //                 'created_at' => $user->created_at
    //             ];
    //         });


    //     $recentActivities = collect()
    //         ->merge($newLinks)
    //         ->merge($linkRedirects)
    //         ->merge($newAffiliates)
    //         ->sortByDesc('created_at')
    //         ->values()
    //         ->all();

    //     $dailyLinkData = Link::select(\DB::raw('DATE(created_at) as date'), \DB::raw('count(*) as count'))
    //         ->groupBy('date')
    //         ->orderBy('date', 'asc')
    //         ->get();

    //     return Inertia::render('Admin/All/AdminDashboard', [
    //         'affiliateCount' => $affiliateCount,
    //         'totalLinksCount' => $totalLinksCount,
    //         'totalSiteVisitors' => $totalSiteVisitors,
    //         'recentActivities' => $recentActivities,
    //         'dailyLinkData' => $dailyLinkData
    //     ]);
    // }
    
}
