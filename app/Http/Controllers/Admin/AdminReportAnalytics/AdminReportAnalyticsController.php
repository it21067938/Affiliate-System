<?php

namespace App\Http\Controllers\Admin\AdminReportAnalytics;

use App\Http\Controllers\Controller;
use App\Repositories\All\Users\UserInterface;
use Inertia\Inertia;

class AdminReportAnalyticsController extends Controller
{

    public function __construct(
        protected UserInterface $userInterface,
    ) {}

    public function index()
    {
        $users = $this->userInterface->getByColumn(
            ['role' => 'affiliate'],
            ['*'],
            ['links.redirects']
        );

        $analyticsData = [];

        foreach ($users as $user) {
            foreach ($user->links as $link) {
                $analyticsData[] = [
                    'link' => $link->target,
                    'created_at' => $link->created_at->format('Y-m-d H:i:s'),
                    'daily_visit_count' => $link->redirects()->whereDate('created_at', today())->count(),
                    'monthly_visit_count' => $link->redirects()->whereMonth('created_at', now()->month)->count(),
                    'user_name' => $user->name,
                ];
            }
        }

        return Inertia::render('Admin/ReportAnalytics/ReportAnalytics', [
            'analyticsData' => $analyticsData,
        ]);
    }
}
