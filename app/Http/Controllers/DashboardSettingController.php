<?php

namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\PhoneModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardSettingController extends Controller
{
    public function index(): Response
    {
        $phoneModels = PhoneModel::query()->get(["id", "label", "value", "description"]);

        return inertia('dashboard/Settings', [
            "caseBasePrice" => Option::caseBasePrice(),
            "phoneModels" => $phoneModels,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            "caseBasePrice" => ["required", "decimal:0,2"],
        ]);

        Option::setCaseBasePrice($payload["caseBasePrice"]);

        return redirect()->route("dashboard.settings.index");
    }

    public function phoneModelSave(Request $request)
    {
        $payload = $request->validate(
            [
                'label' => ['required', 'string', 'max:255'],
                'value' => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
            ]
        );

        PhoneModel::create([
            ...$payload,
            "user_id" => auth()->id(),
        ]);

        return redirect()->route("dashboard.settings.index");
    }
}
