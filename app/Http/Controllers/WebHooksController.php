<?php

namespace App\Http\Controllers;

use App\Services\Leads\LeadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebHooksController extends Controller
{
    
    public function __construct(protected LeadService $leadService)
    {
        
    }
    /**
     * handle
     *
     * @param  mixed $request
     * @return void
     */
    public function handle(Request $request)
    {
        $payload = $request->all();
        Log::notice("webhook",[$payload]);
        // Check if the data is empty
        if (!empty($payload)) {
            $this->leadService->saveLead($payload);
        }
        return response()->json(['message' => 'Webhook received']);
    }
}
