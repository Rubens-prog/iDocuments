<?php

namespace App\Services;
use DB;
use App\Models\Inconsistency;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InconsistencieService
{
    public static function index(Request $request)
    {
        $search = $request->input("search");
        $page = $request->input("page");


        $query = Inconsistency::query()->with('category');

        if(!empty($search) ){
            $query->where('name', 'LIKE', '%'.$search.'%')
            ->orWhere('email', 'LIKE', '%' . $search . '%');
        }

        $data = $query->paginate(1);

        return response()->json($data, 200);
    }

    public static function store(Request $request)
    {
        $model  = new Inconsistency();

        $path = $request->file('file')->store('documents');


        $model->name = $request->name;
        $model->email = $request->email;
        $model->file_path = $path;
        $model->category_id = $request->category_id;
        $model->description = $request->description;

        $model->save();

        return $model;
    }

    public static function show(int $id)
    {
        $data = Inconsistency::with('category')->find($id);
        return $data;
    }

    public function download($id)
    {
        $document = Inconsistency::find($id);

        if(!$document) {
            return response()->json([
                'message' => 'Registro não encontrado',
            ], 200);
        }


        return Storage::download($document->file_path);
    }

    public function preview($id)
    {
        $document = Document::findOrFail($id);

        $file = Storage::get($document->file_path);

        $type = Storage::mimeType($document->file_path);

        return response($file, 200)->header("Content-Type", $type);
    }
}
