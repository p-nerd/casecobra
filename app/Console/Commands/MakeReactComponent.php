<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class MakeReactComponent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:react-component {path}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a react component with boilerplate code';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $_path = $this->argument('path');
        $parts = explode("/", $_path);
        $name = end($parts);
        $path = resource_path('js/'.implode('/', array_slice($parts, 0, -1)));

        if (! File::isDirectory($path)) {
            File::makeDirectory($path, 0755, true);
        }

        $filepath = "$path/$name.tsx";

        if (File::exists($filepath)) {
            $this->error('Component already exists!');

            return;
        }

        $tab = "    ";
        $code = "const $name = () => {\n{$tab}return (\n{$tab}{$tab}<div>$name</div>\n{$tab});\n};\n\nexport default $name;";

        File::put($filepath, $code);
        $this->info("$_path.tsx component created successfully.");
    }
}
