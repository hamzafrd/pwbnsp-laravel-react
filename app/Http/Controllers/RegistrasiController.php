<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RegMahasiswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RegistrasiController extends Controller
{
    public function registMahasiswaBaru(Request $request)
    {
        $rules = [
            'namaLengkap' => 'required|max:255',
            'alamatKtp' => 'required|max:255',
            'alamatDomisili' => 'required|max:255',
            'kecamatan' => 'required|max:255',
            'regionKtpId' => 'required|integer',
            'regionLahirId' => 'max:255',
            'kecamatan' => 'required|max:255',
            'nomorTelepon' => 'required|min:8|max:13',
            'nomorHp' => 'required|min:8|max:13',
            'email' => 'required|email|max:255',
            'kewarganegaraan' => 'required|max:255',
            'negaraWNA' => 'nullable|max:255',
            'tanggalLahir' => 'required|date',
            'nem' => 'required|numeric|min:0|max:5',
            'tempatLahir' => 'required|max:255',
            'jenisKelamin' => 'required|in:pria,wanita',
            'statusMenikah' => 'required|in:belum menikah,menikah,lainnya',
            'agama' => 'required|max:255',
        ];

        $messages = [
            'namaLengkap.required' => 'Nama lengkap harus diisi.',
            'namaLengkap.max' => 'Nama lengkap tidak boleh lebih dari :max karakter.',
            'alamatKtp.required' => 'Alamat KTP harus diisi.',
            'alamatKtp.max' => 'Alamat KTP tidak boleh lebih dari :max karakter.',
            'alamatDomisili.required' => 'Alamat domisili harus diisi.',
            'alamatDomisili.max' => 'Alamat domisili tidak boleh lebih dari :max karakter.',
            'regionKtpId.required' => 'Region KTP harus dipilih.',
            'regionKtpId.integer' => 'Region KTP harus berupa angka.',
            'regionLahirId.required' => 'Region lahir harus dipilih.',
            'regionLahirId.integer' => 'Region lahir harus berupa angka.',
            'kecamatan.required' => 'Kecamatan harus diisi.',
            'kecamatan.max' => 'Kecamatan tidak boleh lebih dari :max karakter.',
            'nomorTelepon.required' => 'Nomor telepon harus diisi.',
            'nomorTelepon.numeric' => 'Nomor telepon harus berupa angka.',
            'nomorHp.required' => 'Nomor HP harus diisi.',
            'nomorHp.numeric' => 'Nomor HP harus berupa angka.',
            'email.required' => 'Email harus diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email tidak boleh lebih dari :max karakter.',
            'kewarganegaraan.required' => 'Kewarganegaraan harus diisi.',
            'kewarganegaraan.max' => 'Kewarganegaraan tidak boleh lebih dari :max karakter.',
            'negaraWNA.max' => 'Negara WNA tidak boleh lebih dari :max karakter.',
            'tanggalLahir.required' => 'Tanggal lahir harus diisi.',
            'tanggalLahir.date' => 'Tanggal lahir tidak valid.',
            'tempatLahir.required' => 'Tempat lahir harus diisi.',
            'tempatLahir.max' => 'Tempat lahir tidak boleh lebih dari :max karakter.',
            'jenisKelamin.required' => 'Jenis kelamin harus dipilih.',
            'jenisKelamin.in' => 'Jenis kelamin tidak valid.',
            'statusMenikah.required' => 'Status menikah harus diisi.',
            'statusMenikah.in' => 'Status menikah tidak valid.',
            'agama.required' => 'Agama harus diisi.',
            'agama.max' => 'Agama tidak boleh lebih dari :max karakter.',
            'nem.required' => 'NEM harus diisi.',
            'nem.numeric' => 'NEM harus berupa angka.',
            'nem.min' => 'NEM tidak boleh kurang dari :min.',
            'nem.max' => 'NEM tidak boleh lebih dari :max.',
        ];

        $validatedData = $request->validate($rules, $messages);

        $postData = [
            'status' => 'pending', // Default value
            'region_pribadi_id' => $validatedData['regionKtpId'],
            'region_tempat_lahir_id' => $validatedData['regionLahirId'],
            'nama_lengkap' => $validatedData['namaLengkap'],
            'alamat_ktp' => $validatedData['alamatKtp'],
            'alamat_lengkap' => $validatedData['alamatDomisili'],
            'nomor_telepon' => $validatedData['nomorTelepon'],
            'tempat_lahir' => $validatedData['tempatLahir'],
            'nomor_handphone' => $validatedData['nomorHp'],
            'email' => $validatedData['email'],
            'kecamatan' => $validatedData['kecamatan'],
            'kewarganegaraan' => $validatedData['kewarganegaraan'],
            'negara_wna' => $validatedData['negaraWNA'] ?? null, // Handle nullable field
            'tanggal_lahir' => $validatedData['tanggalLahir'],
            'jenis_kelamin' => $validatedData['jenisKelamin'],
            'status_menikah' => $validatedData['statusMenikah'],
            'agama' => $validatedData['agama'],
            'nem' => $validatedData['nem']
        ];

        try {
            RegMahasiswa::create($postData);
            return redirect()->route('landing-page')->with('success', 'Data inserted successfully.');
        } catch (\Exception $e) {
            return Inertia::render('Auth/Register',)->with('error', 'Gagal Mendaftar !');
        }
    }
}
