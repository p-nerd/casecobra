<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class DashboardOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::query()
            ->with("caseDesign.croppedImage")
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
                "croppedImageUrl" => $order->caseDesign->croppedImage->fullurl(),
            ]);

        return inertia('dashboard/orders/Index', [
            "orders" => $orders,
            "statuses" => Status::values(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order = [
            "id" => $order->id,
            "user_id" => $order->user_id,
            "status" => $order->status,
            "amount" => $order->amount,
            "name" => $order->name,
            "email" => $order->email,
            "phone" => $order->phone,
            "address_1" => $order->address_1,
            "address_2" => $order->address_2,
            "zip" => $order->zip,
            "city" => $order->city,
            "state" => $order->state,
            "country" => $order->country,
            "originalImageKey" => $order->caseDesign->originalImage->url,
            "originalImageUrl" => $order->caseDesign->originalImage->fullurl(),
            "croppedImageKey" => $order->caseDesign->croppedImage->url,
            "croppedImageUrl" => $order->caseDesign->croppedImage->fullurl(),
            "color" => [
                "label" => $order->caseDesign->color->label,
                "value" => $order->caseDesign->color->value,
            ],
            "modelLabel" => $order->caseDesign->phoneModel->label,
            "materialLabel" => $order->caseDesign->material->label,
            "finishLabel" => $order->caseDesign->finish->label,
            "paid" => $order->paid,
            "created_at" => $order->created_at,
            "charge_id" => $order->charge_id,
        ];

        return inertia("dashboard/orders/Show", [
            "order" => $order,
            "statuses" => Status::values(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $payload = $request->validate([
            'status' => ["sometimes", Rule::enum(Status::class)],
            "from" => ["required", "in:index,show"],
        ]);

        $order->fill($payload);
        $order->save();

        if ($payload["from"] === "show") {
            return redirect()->route("dashboard.orders.show", ["order" => $order->id]);
        }

        return redirect()->route("dashboard.orders.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route("dashboard.orders.index");
    }
}
