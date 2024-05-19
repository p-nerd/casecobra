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

        $image = Image::store($payload['image'], $payload['height'], $payload['width']);
        $caseDesign = CaseDesign::create([
            'user_id' => Auth::id(),
            'original_image_id' => $image->id,
        ]);

        return redirect("/create-case/design?id={$caseDesign->id}");
    }

    public function designCreate(Request $request): Response
    {
        $id = $request->query('id');

        $caseDesign = CaseDesign::findOrFail($id);
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

        $croppedImage = Image::store($payload['croppedImage'], $payload['height'], $payload['width']);
        $caseDesign = CaseDesign::findOrFail($payload['caseDesignId']);

        if ($caseDesign->cropped_image_id) {
            $caseDesign->croppedImage->update(['removable' => true]);
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

    public function previewCreate(Request $request): Response
    {
        $id = $request->query('id');

        $caseDesign = CaseDesign::findOrFail($id);
        $originalImage = $caseDesign->originalImage;
        $croppedImage = $caseDesign->croppedImage;

        $basePrice = Option::caseBasePrice();
        $color = $caseDesign->color;
        $phoneModel = $caseDesign->phoneModel;
        $material = $caseDesign->material;
        $finish = $caseDesign->finish;

        return inertia("createCase/Preview", [
            'id' => $caseDesign->id,
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
            'caseDesignId' => ['required', 'numeric'],
        ]);

        $caseDesign = CaseDesign::findOrFail($payload['caseDesignId']);

        if ($caseDesign->user_id && $caseDesign->user_id !== Auth::id()) {
            throw ValidationException::withMessages([
                'message' => 'This is not your order',
                'to' => '/create-case/upload',
            ]);
        }

        $caseDesign->update(['user_id' => Auth::id()]);

        return redirect("create-case/checkout?id={$caseDesign->id}");
    }

    public function checkoutCreate(Request $request)
    {
        $caseDesignId = $request->query('id');
        $userId = auth()->id();

        $caseDesign = CaseDesign::query()
            ->where('id', $caseDesignId)
            ->where('user_id', $userId)
            ->firstOrFail();

        if (! $caseDesign->order) {
            $order = $caseDesign->order()->create([
                'user_id' => $userId,
                'amount' => $caseDesign->price(),
                'email' => auth()->user()->email,
                // @TODO add user profile phone number
                'phone' => "01758776344",
            ]);
            $caseDesign->setRelation('order', $order);
        } else {
            if ($caseDesign->order->paid) {
                return redirect("/dashboard")->withErrors(["message" => "You already paid, checkout your orders"]);
            }
        }

        $checkoutCharge = $request->user()->checkoutCharge(
            $caseDesign->order->amount,
            "Custom Phone Case",
            1,
            [
                'ui_mode' => 'embedded',
                'mode' => 'payment',
                'metadata' => [
                    'order_id' => $caseDesign->order->id,
                ],
                'billing_address_collection' => 'required',
                'shipping_address_collection' => [
                    'allowed_countries' => ["BD", 'US'],
                ],
                'return_url' => config("app.url").'/create-case/thank-you?session_id={CHECKOUT_SESSION_ID}',
            ]
        );

        $caseDesign->order->update([
            'charge_id' => $checkoutCharge->id,
            'charge_method' => 'stripe',
        ]);

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
            return redirect("/dashboard")->withErrors(["message" => "Your order is done, checkout your orders"]);
        }

        $order->update([
            'name' => $session->shipping_details->name,
            'address_1' => $session->shipping_details->address->line1,
            'address_2' => $session->shipping_details->address->line2,
            'city' => $session->shipping_details->address->city,
            'state' => $session->shipping_details->address->state,
            'zip' => $session->shipping_details->address->postal_code,
            'country' => $session->shipping_details->address->country,
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
