<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
   /**
    * Display the user's profile form.
    */
   public function edit(Request $request): Response
   {
      return Inertia::render('Profile/Edit', [
         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
         'status' => session('status'),
      ]);
   }

   /**
    * Update the user's profile information.
    */
   public function update(ProfileUpdateRequest $request): RedirectResponse
   {
      $request->user()->fill($request->validated());

      if ($request->user()->isDirty('email')) {
         $request->user()->email_verified_at = null;
      }

      $request->user()->save();

      return Redirect::route('profile.edit');
   }

   public function updateProfileImage(Request $request)
   {

      $user = Auth::user();

      $request->validate([
         'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
      ]);

      if ($request->hasFile('image')) {

         $path = $request->file('image')->store('profile_images', 'public');

         if ($user->image) {
            Storage::disk('public')->delete($user->image);
         }

         // Save the image path in the database
         $request->user()->update(['image' => $path]);
      }

      return redirect()->back()->with('success', 'Profile image updated successfully.');
   }

   /**
    * Delete the user's account.
    */
   public function destroy(Request $request): RedirectResponse
   {
      $request->validate([
         'password' => ['required', 'current_password'],
      ]);

      $user = $request->user();

      Auth::logout();

      $user->delete();

      $request->session()->invalidate();
      $request->session()->regenerateToken();

      return Redirect::to('/');
   }
}
