<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Image extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "url",
        "alt",
        "width",
        "height",
        "removable",
    ];

    protected const DIR = "images";

    public static function store(UploadedFile $file, int $height, int $width): self
    {
        $path = $file->store(self::DIR);

        return self::create([
            "user_id" => Auth::id(),
            'url' => str_replace('images/', '', $path),
            "alt" => self::humanityFilename($file->getClientOriginalName()),
            "height" => $height,
            "width" => $width,
        ]);
    }

    public function fullurl()
    {
        $url = $this->url;
        if (! Str::isUrl($this->url)) {
            $url = Storage::url(self::DIR."/".$this->url);
        }

        return $url;
    }

    public function makeRemovable(): void
    {
        self::update([
            "removable" => true,
        ]);
    }

    private static function humanityFilename($filename): string
    {
        $filenameWithoutExtension = pathinfo($filename, PATHINFO_FILENAME);
        $normalizedFilename = str_replace(['_', '-'], ' ', $filenameWithoutExtension);

        return Str::title($normalizedFilename);
    }
}
