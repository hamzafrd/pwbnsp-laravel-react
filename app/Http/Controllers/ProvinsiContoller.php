<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Regions;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProvinsiContoller extends Controller
{
    public function getListProvinsi()
    {
        $data = Regions::select('provinsi as name')->distinct()->get();
        return response()->json($data);
    }
    public function getKotaByProvinsiId($provinsi_id)
    {
        $data = Regions::select('id', 'kota_kabupaten as name')->where('provinsi', $provinsi_id)->get();
        return response()->json($data);
    }
}
