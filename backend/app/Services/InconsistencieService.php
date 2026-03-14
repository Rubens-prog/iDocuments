<?php

namespace App\Services;
use DB;
use App\Models\Inconsistency;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InconsistencieService
{
    public static function index()
    {
        return response()->json([
            'message' => 'justATest Service',
            'status' => 'ok'
        ], 200);
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

    public function download($id)
    {
        $document = Inconsistency::find($id);

        if(!$document) {
            return response()->json([
                'message' => 'Não achei',
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
