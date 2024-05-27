<?php

namespace App\Http\Controllers;

use App\Models\Order;

class DashboardOverviewController extends Controller
{
    public function index()
    {
        $orders = Order::query()
            ->latest()
            ->take(5)
            ->get()
            ->map(fn (Order $order) => [
                "id" => $order->id,
                "user_id" => $order->user_id,
                "name" => $order->name,
                "email" => $order->email,
                "amount" => $order->amount,
                "payment" => $order->paid ? "paid" : "unpaid",
                "status" => $order->status,
                "createdAt" => $order->created_at,
            ]);

        $lastWeekGoal = 3000;
        $lastWeekSum = Order::query()
            ->where('created_at', '>=', now()->subWeek())
            ->sum('amount');

        $lastMonthGoal = 3000 * 4;
        $lastMonthSum = Order::query()
            ->where('created_at', '>=', now()->subMonth())
            ->sum('amount');

        return inertia('dashboard/Overview', [
            "orders" => $orders,
            "lastWeek" => [
                "sum" => $lastWeekSum,
                "goal" => $lastWeekGoal,
            ],
            "lastMonth" => [
                "sum" => $lastMonthSum,
                "goal" => $lastMonthGoal,
            ],
        ]);
    }
}
