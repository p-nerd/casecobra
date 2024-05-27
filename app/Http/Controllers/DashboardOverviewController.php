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

        return inertia('dashboard/Overview', [
            "orders" => $orders,
            "lastWeek" => [
                "sum" => 1000,
                "goal" => 3000,
            ],
            "lastMonth" => [
                "sum" => 1000,
                "goal" => 3000,
            ],
        ]);
    }
}
