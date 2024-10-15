<?php

namespace App\Http\Controllers\Link;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Repositories\All\Links\LinkInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB as FacadesDB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Inertia\Ssr\Response;

class LinkController extends Controller
{
   public function __construct(protected LinkInterface $linkInterface) {}
   /**
    * store
    *
    * @param  mixed $request
    * @return void
    */
   public function store(Request $request): RedirectResponse
   {
      $request->validate([
         'target' => ['required'],
         'name' => ['nullable', 'unique:links,name']
      ]);
      $url = filter_var($request->target, FILTER_SANITIZE_URL);
      $data['user_id'] = Auth::id();
      $data['target'] = $url;
      $data['name'] = $request->name;

      $this->linkInterface->create($data);

      return redirect(route('affiliate.dashboard'))->with('success', 'Link created successfully.');
   }

   /**
    * destroy
    *
    * @param  mixed $link
    * @return void
    */
   public function destroy(Link $link): RedirectResponse
   {
      abort_if(! auth()->user()->is($link->user), 403);

      FacadesDB::transaction(function () use ($link) {
         $link->redirects()->delete();
         $link->delete();
      });

      return to_route('affiliate.dashboard');
   }
}
