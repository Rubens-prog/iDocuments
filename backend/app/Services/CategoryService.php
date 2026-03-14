<?php

namespace App\Services;
use DB;
use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryService
{

    public static function index(Request $request)
    {
        $data = Category::all();

        return $data;
    }

}
