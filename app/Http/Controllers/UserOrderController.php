<?php

namespace App\Http\Controllers;

use App\Models\Order;

class UserOrderController extends Controller
{
    public function index()
    {
        $orders = Order::query()
            ->where("user_id", auth()->id())
            ->with("caseDesign.color")
            ->with("caseDesign.phoneModel")
            ->get()
            ->map(fn (Order $order) => [
                "id" => $order->id,
                "status" => $order->status,
                "amount" => $order->amount,
                "croppedImageUrl" => $order->caseDesign->croppedImage->fullurl(),
                "colorValue" => $order->caseDesign->color->value,
                "modelLabel" => $order->caseDesign->phoneModel->label,
            ]);

        return inertia("user/orders/Index", [
            "orders" => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $order = [
            "id" => $order->id,
            "status" => $order->status,
            "amount" => $order->amount,
            "name" => $order->name,
            "address_1" => $order->address_1,
            "address_2" => $order->address_2,
            "zip" => $order->zip,
            "city" => $order->city,
            "croppedImageUrl" => $order->caseDesign->croppedImage->fullurl(),
            "colorValue" => $order->caseDesign->color->value,
        ];

        return inertia("user/orders/Show", [
            "order" => $order,
        ]);
    }
}
