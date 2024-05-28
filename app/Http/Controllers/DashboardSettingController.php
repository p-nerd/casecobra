<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardSettingController extends Controller
{
    public function index(): Response
    {
        return inertia('dashboard/Settings', ["caseBasePrice" => Option::caseBasePrice()]);
    }

    public function update(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            "caseBasePrice" => ["required", "decimal:0,2"],
        ]);

        Option::setCaseBasePrice($payload["caseBasePrice"]);

        return redirect()->route("dashboard.settings.index");
    }
}
