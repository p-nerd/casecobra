<x-mail::message>
Hello, {{ $name }}.

You received this letter because someone logged into your account from:

- IP: {{ $ip }}
- Browser: {{ $browser }}
- OS: {{ $os }}
- Device: {{ $device }}

If this was you, ignore this message. Otherwise, change your account's password.

Thanks, {{ config('app.name') }}
</x-mail::message>
