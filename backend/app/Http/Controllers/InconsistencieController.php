<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\InconsistencieService;
use App\Http\Requests\InconsistencyRequest;

    class InconsistencieController extends Controller
    {

        public function __construct(protected InconsistencieService $inconsistency)
        {
        }

        public function index(Request $request)
        {
            return $this->inconsistency->index($request);
        }

        public function store(InconsistencyRequest $request)
        {
            $this->inconsistency->store($request);

             return response()->json([
                 'message'=> "Enviado com sucesso!",
             ], 201);
        }

        public function show(Request $request)
        {
           $data =  $this->inconsistency->show($request->id);

           if(!$data){
            return response()->json([
                'message'=> "Registro não encontrado"
            ],404);
           }

           return response()->json($data);

        }

        public function download($id)
        {
            return $this->inconsistency->download($id);
        }
    }
