<?php

namespace App\Http\Controllers;

use App\Models\Order;

class OrderController extends Controller
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
                "materialLabel" => $order->caseDesign->material->label,
                "finishLabel" => $order->caseDesign->finish->label,
            ]);

        return inertia("orders/Index", [
            "orders" => $orders,
        ]);
    }

    public function show(Order $order)
    {
        if (auth()->id() !== $order->user_id) {
            return abort(404);
        }

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
            "modelLabel" => $order->caseDesign->phoneModel->label,
            "materialLabel" => $order->caseDesign->material->label,
            "finishLabel" => $order->caseDesign->finish->label,

        ];

        return inertia("orders/Show", [
            "order" => $order,
        ]);
    }
}
