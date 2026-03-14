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

        public function index()
        {
            return $this->inconsistency->index();
        }

        public function store(InconsistencyRequest $request)
        {
            $this->inconsistency->store($request);

             return response()->json([
                 'message'=> "Enviado com sucesso!",
             ], 200);
        }

        public function download($id)
        {
            return $this->inconsistency->download($id);
        }
    }
