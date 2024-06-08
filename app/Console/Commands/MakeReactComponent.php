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
        $parts = explode("/", $this->argument('path'));
        $name = $parts[count($parts) - 1];

        $path = resource_path('js');

        for ($i = 0; $i < count($parts) - 1; $i++) {
            $path .= "/".$parts[$i];
            if (! File::isDirectory($path)) {
                File::makeDirectory($path, 0755, true);
            }
        }

        $path .= "/$name.tsx";

        if (File::exists($path)) {
            $this->error('Component already exists!');

            return;
        }

        $tab = "    ";
        $code = "const $name = () => {\n{$tab}return (\n{$tab}{$tab}<div>$name</div>\n{$tab});\n};\n\nexport default $name;";

        File::put($path, $code);
        $this->info('React component created successfully.');
    }
}
