<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Agama;


class AgamaController extends Controller
{
    public function getListAgama()
    {
        $data = Agama::all();
        return response()->json($data);
    }
}
