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

    public static function store(UploadedFile $file): self
    {
        $path = $file->store(self::DIR);

        return self::create([
            "user_id" => Auth::id(),
            'url' => str_replace('images/', '', $path),
            "alt" => self::humanifyFilename($file->getClientOriginalName()),
        ]);
    }

    public function fullurl()
    {
        $url = $this->url;
        if (!Str::isUrl($this->url)) {
            $url = Storage::url(self::DIR . "/" . $this->url);
        }

        return $url;
    }

    private static function humanifyFilename($filename)
    {
        $filenameWithoutExtension = pathinfo($filename, PATHINFO_FILENAME);
        $normalizedFilename = str_replace(['_', '-'], ' ', $filenameWithoutExtension);
        $humanReadableName = Str::title($normalizedFilename);

        return $humanReadableName;
    }
}
