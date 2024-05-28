<?php

namespace App\Listeners;

use App\Mail\LoginAlert;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Mail;

class SendLoginAlert
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        $userAgent = $this->parseUserAgent(request()->header('User-Agent'));

        Mail::to($event->user->email)
            ->send(new LoginAlert(
                $event->user->name,
                request()->ip(),
                $userAgent['browser'],
                $userAgent['os'],
                $userAgent['device'],
            ));
    }

    public function parseUserAgent($userAgent): array
    {
        // Initialize default values
        $browser = 'Unknown';
        $os = 'Unknown';
        $device = 'Unknown';

        // Detect browser
        if (preg_match('/Chrome/i', $userAgent)) {
            $browser = 'Chrome';
        } elseif (preg_match('/Firefox/i', $userAgent)) {
            $browser = 'Firefox';
        } elseif (preg_match('/Safari/i', $userAgent)) {
            $browser = 'Safari';
        } elseif (preg_match('/MSIE|Trident/i', $userAgent)) {
            $browser = 'Internet Explorer';
        } elseif (preg_match('/Edge/i', $userAgent)) {
            $browser = 'Edge';
        }

        // Detect OS
        if (preg_match('/Windows NT/i', $userAgent)) {
            $os = 'Windows';
        } elseif (preg_match('/Mac OS X/i', $userAgent)) {
            $os = 'MacOS';
        } elseif (preg_match('/Linux/i', $userAgent)) {
            $os = 'Linux';
        } elseif (preg_match('/iPhone|iPad|iPod/i', $userAgent)) {
            $os = 'iOS';
        } elseif (preg_match('/Android/i', $userAgent)) {
            $os = 'Android';
        }

        // Detect device
        if (preg_match('/iPhone/i', $userAgent)) {
            $device = 'iPhone';
        } elseif (preg_match('/iPad/i', $userAgent)) {
            $device = 'iPad';
        } elseif (preg_match('/Macintosh/i', $userAgent)) {
            $device = 'Macintosh';
        } elseif (preg_match('/Windows/i', $userAgent)) {
            $device = 'Windows PC';
        } elseif (preg_match('/Android/i', $userAgent)) {
            $device = 'Android Device';
        }

        return [
            'browser' => $browser,
            'os' => $os,
            'device' => $device,
        ];
    }
}
