<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminDashboard\AdminDashboardController;
use App\Http\Controllers\Admin\AdminReportAnalytics\AdminReportAnalyticsController;
use App\Http\Controllers\Admin\AffiliateManagement\AffiliateManagementController;
use App\Http\Controllers\Admin\RedirectUsers\RedirectUserController;
use App\Http\Controllers\Affiliate\AffiliateController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Link\LinkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Link\RedirectController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\AffiliateMiddleware;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';

Route::redirect('/', '/login');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile', [ProfileController::class, 'updateProfileImage'])->name('profile.image.update');
});

Route::middleware(['auth', 'verified'])->group(function () {

   Route::prefix('admin')->middleware(AdminMiddleware::class)->group(function () {
      Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
      Route::get('/affiliatemanagement', [AffiliateManagementController::class, 'index'])->name('admin.affiliatemanagement');
      Route::get('/affiliate/{id}', [AffiliateManagementController::class, 'show'])->name('admin.affiliateshow');
      Route::delete('/admin/affiliates/{id}', [AffiliateManagementController::class, 'destroy'])->name('admin.affiliatedestroy');
      Route::post('/addaffiliates', [AffiliateManagementController::class, 'store'])->name('admin.addaffiliate');
      Route::put('/editaffiliates/{id}', [AffiliateManagementController::class, 'update'])->name('admin.updateaffiliate');
      Route::get('/reportanalytics', [AdminReportAnalyticsController::class, 'index'])->name('admin.reportanalytics');
   });

   Route::prefix('/')->middleware(AffiliateMiddleware::class)->group(function () {
      Route::get('/dashboard', [AffiliateController::class, 'index'])->name('affiliate.dashboard');
      Route::get('/dashboard/{slug}', [AffiliateController::class, 'show'])->name('affiliate.show');
      Route::post('/links/store', [LinkController::class, 'store'])->name('links.store');
      Route::post('/links/{link:id}/destroy', [LinkController::class, 'destroy'])->name('links.destroy');
   });
});
// Get redirect user Details
Route::get('/{slug}', [RedirectUserController::class, 'redirect'])->name('redirect.link');
