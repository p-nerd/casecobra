<?php

namespace App\Http\Controllers;

use App\Models\CaseDesign;
use App\Models\Color;
use App\Models\Finish;
use App\Models\Image;
use App\Models\Material;
use App\Models\Option;
use App\Models\Order;
use App\Models\PhoneModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Laravel\Cashier\Cashier;

class CreateCaseController extends Controller
{
    public function uploadCreate(): Response
    {
        return inertia("createCase/Upload");
    }

    public function uploadStore(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'image' => ['required', 'image', 'mimes:jpeg,png,jpg'],
            'height' => ['required', 'int', 'min:0'],
            'width' => ['required', 'int', 'min:0'],
        ]);

        $originalImage = Image::store(
            $payload['image'],
            $payload['height'],
            $payload['width']
        );

        $caseDesign = CaseDesign::create([
            'user_id' => Auth::id(),
            'original_image_id' => $originalImage->id,
        ]);

        return redirect("/create-case/design?id={$caseDesign->id}");
    }

    public function designCreate(Request $request)
    {
        $caseDesignID = $request->query('id');
        $caseDesign = CaseDesign::findOrFail($caseDesignID);

        $order = $caseDesign->order;
        if ($order && $order->paid) {
            return redirect(route("user-orders.index"))->withErrors(["message" => "You order is done, checkout your orders"]);
        } elseif ($order) {
            return redirect("/create-case/checkout?id={$order->id}")->withErrors(["message" => "You already designed your case"]);
        }

        $originalImage = $caseDesign->originalImage;

        $colors = Color::all(['id', 'label', 'name', 'value']);
        $models = PhoneModel::all(['id', 'label', 'value']);
        $materials = Material::all(['id', 'label', 'value', 'description', 'price']);
        $finishes = Finish::all(['id', 'label', 'value', 'description', 'price']);
        $basePrice = Option::caseBasePrice();

        return inertia("createCase/Design", [
            'caseDesign' => [
                'id' => $caseDesign->id,
                'userId' => $caseDesign->user_id,
                'modelId' => $caseDesign->phone_model_id,
                'colorId' => $caseDesign->color_id,
                'materialId' => $caseDesign->material_id,
                'finishId' => $caseDesign->finish_id,
            ],
            'image' => [
                'url' => $originalImage->fullurl(),
                'alt' => $originalImage->alt,
                'height' => $originalImage->height,
                'width' => $originalImage->width,
            ],
            'colors' => $colors,
            'models' => $models,
            'materials' => $materials,
            'finishes' => $finishes,
            'basePrice' => $basePrice,
        ]);
    }

    public function designStore(Request $request): RedirectResponse
    {
        $payload = $request->validate([
            'caseDesignId' => ['required', 'numeric'],
            'phoneModelId' => ['required', 'numeric'],
            'colorId' => ['required', 'numeric'],
            'materialId' => ['required'],
            'finishId' => ['required'],
            'croppedImage' => ['required', 'image', 'mimes:png'],
            'height' => ['required', 'int', 'min:0'],
            'width' => ['required', 'int', 'min:0'],
        ]);

        $caseDesign = CaseDesign::findOrFail(
            $payload['caseDesignId']
        );

        $order = $caseDesign->order;
        if ($order && $order->paid) {
            return redirect(route("user-orders.index"))->withErrors(["message" => "You order is done, checkout your orders"]);
        } elseif ($order) {
            return redirect("/create-case/checkout?id={$order->id}")->withErrors(["message" => "You already designed your case"]);
        }

        $croppedImage = Image::store(
            $payload['croppedImage'],
            $payload['height'],
            $payload['width']
        );

        if ($caseDesign->cropped_image_id) {
            $caseDesign->croppedImage->update(
                ['removable' => true]
            );
        }

        $caseDesign->update([
            'phone_model_id' => $payload['phoneModelId'],
            'color_id' => $payload['colorId'],
            'material_id' => $payload['materialId'],
            'finish_id' => $payload['finishId'],
            'cropped_image_id' => $croppedImage->id,
        ]);

        return redirect("/create-case/preview?id={$caseDesign->id}");
    }

    public function previewCreate(Request $request)
    {
        $caseDesignID = $request->query('id');
        $caseDesign = CaseDesign::findOrFail($caseDesignID);

        if ($caseDesign->order && $caseDesign->order->paid) {
            return redirect(route("user-orders.index"))->withErrors(["message" => "You order is done, checkout your orders"]);
        } elseif ($caseDesign->order) {
            return redirect("/create-case/checkout?id={$caseDesign->order->id}")->withErrors(["message" => "You already previewed your case"]);
        }

        $originalImage = $caseDesign->originalImage;
        $croppedImage = $caseDesign->croppedImage;

        $basePrice = Option::caseBasePrice();
        $color = $caseDesign->color;
        $phoneModel = $caseDesign->phoneModel;
        $material = $caseDesign->material;
        $finish = $caseDesign->finish;

        return inertia("createCase/Preview", [
            'caseDesignID' => $caseDesign->id,
            'originalImage' => [
                'url' => $originalImage->fullurl(),
                'alt' => $originalImage->alt,
                'height' => $originalImage->height,
                'width' => $originalImage->width,
            ],
            'croppedImage' => [
                'url' => $croppedImage->fullurl(),
                'alt' => $croppedImage->alt,
                'height' => $croppedImage->height,
                'width' => $croppedImage->width,
            ],
            'color' => [
                'value' => $color->value,
            ],
            'model' => [
                'label' => $phoneModel->label,
            ],
            'material' => [
                'label' => $material->label,
                'price' => $material->price,
            ],
            'finish' => [
                'label' => $finish->label,
                'price' => $finish->price,
            ],
            'basePrice' => $basePrice,
        ]);
    }

    public function previewStore(Request $request): RedirectResponse
    {

        $payload = $request->validate([
            'caseDesignID' => ['required', 'numeric'],
        ]);

        $caseDesign = CaseDesign::findOrFail(
            $payload['caseDesignID']
        );

        if ($caseDesign->user_id && $caseDesign->user_id !== auth()->id()) {
            throw ValidationException::withMessages([
                'message' => 'This is not your order',
                'to' => '/create-case/upload',
            ]);
        }

        $caseDesign->update(['user_id' => auth()->id()]);

        if ($caseDesign->order && $caseDesign->order->paid) {
            return redirect(route("user-orders.index"))->withErrors(["message" => "You order is done, checkout your orders"]);
        } elseif ($caseDesign->order) {
            return redirect("/create-case/checkout?id={$caseDesign->order->id}")->withErrors(["message" => "You already previewed your case"]);
        }

        $order = $caseDesign->order()->create([
            'email' => auth()->user()->email,
            'amount' => $caseDesign->price(),
            'user_id' => auth()->id(),
        ]);

        return redirect("/create-case/checkout?id={$order->id}");
    }

    public function checkoutCreate(Request $request)
    {
        $orderId = $request->query('id');
        $order = Order::query()
            ->where('id', $orderId)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        if ($order->paid) {
            return redirect(route("user-orders.index"))->withErrors(["message" => "You already paid, checkout your orders"]);
        }

        $appUrl = config("app.url");

        $checkoutCharge = $request->user()->checkoutCharge(
            $order->amount,
            "Custom Phone Case",
            1,
            [
                'ui_mode' => 'embedded',
                'mode' => 'payment',
                'metadata' => ['order_id' => $order->id],
                'billing_address_collection' => 'required',
                'shipping_address_collection' => ['allowed_countries' => ["BD", 'US']],
                'customer' => auth()->user()->stripe_id,
                'phone_number_collection' => ['enabled' => true],
                'return_url' => "$appUrl/create-case/thank-you?session_id={CHECKOUT_SESSION_ID}",
            ]
        );

        $order->update([
            'charge_id' => $checkoutCharge->id,
            'charge_method' => 'stripe',
        ]);

        $caseDesign = $order->caseDesign;
        $croppedImage = $caseDesign->croppedImage;

        return inertia("createCase/Checkout", [
            'croppedImage' => [
                'url' => $croppedImage->fullurl(),
                'alt' => $croppedImage->alt,
                'height' => $croppedImage->height,
                'width' => $croppedImage->width,
            ],
            'color' => [
                'value' => $caseDesign->color->value,
            ],
            'model' => [
                'label' => $caseDesign->phoneModel->label,
            ],
            'clientSecret' => $checkoutCharge->client_secret,
        ]);
    }

    public function thankYouCreate(Request $request)
    {
        $sessionId = $request->query("session_id");
        $session = Cashier::stripe()->checkout->sessions->retrieve($sessionId);

        $orderId = $session->metadata->order_id;
        $order = Order::findOrFail($orderId);

        if ($order->paid) {
            return redirect(route("user-orders.index"))->withErrors(["message" => "Your order is done, checkout your orders"]);
        }

        $order->update([
            'name' => $session->shipping_details->name,
            'address_1' => $session->shipping_details->address->line1,
            'address_2' => $session->shipping_details->address->line2,
            'city' => $session->shipping_details->address->city,
            'state' => $session->shipping_details->address->state,
            'zip' => $session->shipping_details->address->postal_code,
            'country' => $session->shipping_details->address->country,
            'phone' => $session->customer_details->phone,
            'end' => true,
        ]);

        switch ($session->status) {
            case 'open':
                return redirect("/create-case/checkout?id={$order->caseDesign->id}");
            case 'complete':
                $order->update([
                    "paid" => true,
                ]);

                return inertia("createCase/ThankYou", [
                    "successful" => true,
                    "croppedImage" => [
                        "url" => $order->caseDesign->croppedImage->fullurl(),
                    ],
                    "color" => [
                        "value" => $order->caseDesign->color->value,
                    ],
                    "order" => [
                        "id" => $order->id,
                        "amount" => $order->amount,
                        "name" => $order->name,
                        "address_1" => $order->address_1,
                        "zip" => $order->zip,
                        "city" => $order->city,
                    ],
                ]);
            default:
                return inertia("createCase/ThankYou", [
                    "successful" => false,
                    "checkoutUrl" => "/create-case/checkout?id={$order->caseDesign->id}",
                ]);
        }
    }
}
