<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Illuminate\Http\Request;

class DashboardSettingController extends Controller
{
    public function index()
    {
        return inertia('dashboard/Settings', ["caseBasePrice" => Option::caseBasePrice()]);
    }

    public function update(Request $request)
    {
        $payload = $request->validate([
            "caseBasePrice" => ["required", "decimal:0,2"],
        ]);

        Option::setCaseBasePrice($payload["caseBasePrice"]);

        return redirect()->route("dashboard.settings.index");
    }
}
