<?php

namespace App\Http\Controllers\Admin\AffiliateManagement;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\User;
use App\Repositories\All\Links\LinkInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AffiliateManagementController extends Controller
{
    public function __construct(
        protected UserInterface $userInterface,
        protected LinkInterface $linkInterface
    ) {}

    public function index()
    {
        $affiliates = $this->userInterface->getAffiliatesWithLinksAndRedirects()
            ->map(function ($affiliate) {
                $affiliate->redirect_user_count = $affiliate->links->sum('redirects_count');
                return $affiliate;
            });

        return Inertia::render('Admin/AffiliateManagement/AffiliateManagement', [
            'affiliates' => $affiliates,
        ]);
    }
    



    public function show($id)
    {
        $affiliate = $this->userInterface->findById($id, ['*'], ['links.redirects']);

        return Inertia::render('Admin/AffiliateManagement/AffiliateDetails', [
            'affiliate' => $affiliate,
            'currentUrl' => url('/'),
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $affiliateData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => 'affiliate',
        ];

        $affiliate = $this->userInterface->create($affiliateData);

        return redirect()->route('admin.affiliatemanagement')->with('success', 'Affiliate created successfully.');
    }


    public function update(Request $request, $id)
    {
        $affiliate = $this->userInterface->findById($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $affiliate->id,
            'password' => 'nullable|string|min:8',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $affiliate->password,
        ];

        $this->userInterface->update($id, $updateData);

        return redirect()->route('admin.affiliatemanagement')->with('success', 'Affiliate updated successfully!');
    }

    public function destroy($id)
    {
        $user = $this->userInterface->findById($id);

        if ($user) {
            foreach ($user->links as $link) {
                $link->redirects()->delete();
            }

            $user->links()->delete();

            $this->userInterface->deleteById($id);
        }

        return redirect()->route('admin.dashboard')->with('success', 'User and related data deleted successfully.');
    }
}
