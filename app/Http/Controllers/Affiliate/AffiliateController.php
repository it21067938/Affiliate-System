<?php

namespace App\Http\Controllers\Affiliate;

use App\Http\Controllers\Controller;
use App\Repositories\All\Links\LinkInterface;
use App\Repositories\All\Users\UserInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AffiliateController extends Controller
{
   public function __construct(protected UserInterface $userInterface,  
   protected LinkInterface $linkInterface ) {}
   /**
    * Display a listing of the resource.
    */
   public function index()
   {
      return Inertia::render('Affiliate/All/AffiliateDashboard', [
         'links' => $this->linkInterface->getByColumn(['user_id' => Auth::id()],['*'],['leads', 'redirects']),
      ]);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function show($slug)
   {
      $link = $this->linkInterface->findByColumn(['slug' => $slug,'user_id' => Auth::id()],['*'],['leads', 'redirects']);
      return Inertia::render('Affiliate/Show/Index', [
         'link' => $link,
      ]);
   }

   /**
    * Display the specified resource.
    */
}
