@component('mail::message')
# Order Confirmation

Hello {{ $order->name }},

Thank you for your order! Your order number is **{{ $order->id }}**.

## Order Details

@component('mail::table')
| Product       | Quantity | Price  |
| ------------- |:--------:| ------:|
| {{ $order->caseDesign->phoneModel->label }} Case | 1 | {{ $order->amount }} |
@endcomponent

**Total:** ${{ number_format($order->amount, 2) }}

@component('mail::button', ['url' => route('orders.show', $order->id)])
View Order Details
@endcomponent

If you have any questions, feel free to contact our support team.

Thanks,<br>
{{ config('app.name') }}
@endcomponent

