<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inconsistency extends Model
{
    protected $fillable = [
        "name",
        "email",
        "description",
        "file_path",
        "status",
        "category_id"
    ];



    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

}
