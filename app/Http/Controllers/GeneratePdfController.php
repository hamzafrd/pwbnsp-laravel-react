<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RegMahasiswa;
use Barryvdh\DomPDF\Facade\Pdf;

class GeneratePdfController extends Controller
{
    public function generatePdf($id)
    {
        $data = RegMahasiswa::where('id', $id)->first();
        $pdf = Pdf::loadView('pdf.bukti-pendaftaran', compact('data'));
        return $pdf->download('bukti-pendaftaran-' . $data->id . '-' . $data->nama_lengkap . '.pdf');
    }
}
