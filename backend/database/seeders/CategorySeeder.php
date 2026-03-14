<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

use Illuminate\Support\Facades\File;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('seeders/data/categories.json'));
        $categories = json_decode($json, true);

        foreach ($categories['categorias'] as $category) {
            Category::firstOrCreate([
                'name' => $category['nome']
            ]);
        }
    }
}
