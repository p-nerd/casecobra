@component('mail::message')
# Your {{$order->caseDesign->phoneModel->label}} Case Order is Placed.

Hello {{ $order->name }},

Thank you for your order! Your order id is **#{{ $order->id }}**.

## Details

- Phone Model: {{ $order->caseDesign->phoneModel->label }}
- Color: {{ $order->caseDesign->color->label }}
- Material: {{ $order->caseDesign->material->label }}
- Finish: {{ $order->caseDesign->material->label }}
- Cropped Image: [Link]({{ $order->caseDesign->croppedImage->fullurl() }})

## Price

- Base Price: ${{ number_format($caseBasePrice / 100, 2) }}
- Material: ${{ number_format($order->caseDesign->material->price / 100, 2) }}
- Finish: ${{ number_format($order->caseDesign->finish->price / 100, 2) }}
- Total Price: **${{ number_format($order->amount / 100, 2) }}**

@component('mail::button', ['url' => route('orders.show', $order->id)])
View Order Details
@endcomponent

If you have any questions, feel free to contact our support team.

Thanks,<br>
{{ config('app.name') }}
@endcomponent

