<?php

namespace App\Http\Controllers\Admin\RedirectUsers;

use App\Http\Controllers\Controller;
use App\Models\Link;
use App\Models\Redirect;
use App\Repositories\All\Links\LinkInterface;
use App\Repositories\All\Redirect\RedirectInterface;
use Jenssegers\Agent\Agent;

class RedirectUserController extends Controller
{

    public function __construct(
        protected RedirectInterface $redirectInterface,
        protected LinkInterface $linkInterface
    ) {}

    public function redirect($slug)
    {
        $link = $this->linkInterface->findByColumn(['slug' => $slug]);

        $ipAddress = request()->ip();
        
        $agent = new Agent();
        $browser = $agent->browser();
        $os = $agent->platform();
        $device = $agent->device();

        $this->redirectInterface->create([
            'link_id' => $link->id,
            'ip_address' => $ipAddress,
            'device' => $device,
            'os' => $os,
            'browser' => $browser,
        ]);

        return redirect($link->target);
    }
}
