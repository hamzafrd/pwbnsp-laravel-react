<?php

namespace App\Http\Controllers;

use App\Models\Regions;
use App\Models\RegMahasiswa;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Pest\Laravel\call;

class AdminController extends Controller
{
    public function index()
    {
        $data = RegMahasiswa::all();
        $user = Auth::user();
        return Inertia::render('Dashboard', ['listForm' => $data, 'user' => $user]);
    }

    public function show($id)
    {
        $data = RegMahasiswa::where('id', $id)->first();
        return Inertia::render('Admin/CreateUser', ['dokumen' => $data]);
    }

    public function create()
    {
        $data = RegMahasiswa::all();
        return Inertia::render('Dashboard', ['listForm' => $data]);
    }

    public function tinjauDokumen($id)
    {
        $dokumen = RegMahasiswa::where('id', $id)->first();
        $provinsi = Regions::where('id', $dokumen->region_pribadi_id)->pluck('provinsi')->first();
        $kota = Regions::where('id', $dokumen->region_pribadi_id)->pluck('kota_kabupaten')->first();

        $provinsiLahir = Regions::where('id', $dokumen->region_tempat_lahir_id)->pluck('provinsi')->first();
        $kotaLahir = Regions::where('id', $dokumen->region_tempat_lahir_id)->pluck('kota_kabupaten')->first();
        $user = Auth::user();
        return Inertia::render('Admin/EditDokumen', compact('dokumen', 'kota', 'kotaLahir', 'user', 'provinsi', 'provinsiLahir'));
    }

    public function editDokumen(Request $request, $idDokumen)
    {
        $rules = [
            'namaLengkap' => 'required|max:255',
            'alamatKtp' => 'required|max:255',
            'alamatDomisili' => 'required|max:255',
            'regionKtpId' => 'max:255',
            'regionLahirId' => 'max:255',
            'kecamatan' => 'required|max:255',
            'nomorTelepon' => 'required|min:8|max:13',
            'nomorHp' => 'required|min:8|max:13',
            'email' => 'required|email|max:255',
            'kewarganegaraan' => 'required|max:255',
            'negaraWNA' => 'nullable|max:255',
            'tanggalLahir' => 'required|date',
            'tempatLahir' => 'required|max:255',
            'jenisKelamin' => 'required|in:pria,wanita',
            'statusMenikah' => 'required|in:belum menikah,menikah,lainnya',
            'agama' => 'required|max:255',
            'nem' => 'required|numeric|min:0|max:5', // Adjust based on your needs
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
            'status' => $request['status'],
            'region_pribadi_id' => $validatedData['regionKtpId'],
            'region_tempat_lahir_id' => $validatedData['regionLahirId'],
            'nama_lengkap' => $validatedData['namaLengkap'],
            'alamat_ktp' => $validatedData['alamatKtp'],
            'alamat_lengkap' => $validatedData['alamatDomisili'],
            'nomor_telepon' => $validatedData['nomorTelepon'],
            'nomor_handphone' => $validatedData['nomorHp'],
            'email' => $validatedData['email'],
            'kewarganegaraan' => $validatedData['kewarganegaraan'],
            'negara_wna' => $validatedData['negaraWNA'] ?? null, // Handle nullable field
            'tanggal_lahir' => $validatedData['tanggalLahir'],
            'jenis_kelamin' => $validatedData['jenisKelamin'],
            'status_menikah' => $validatedData['statusMenikah'],
            'agama' => $validatedData['agama'],
            'nem' => $validatedData['nem'],
        ];

        try {
            RegMahasiswa::where('id', $idDokumen)->update($postData);
            return redirect()->route('dashboard')->with('success', 'Data inserted successfully.');
        } catch (\Exception $e) {
            return redirect()->route('admin.dokumen.show', $idDokumen)->with('error', 'Gagal.');
        }
    }

    public function manageUsers()
    {
        $users = User::whereNot('id', Auth::id())->get();
        return Inertia::render('Admin/Users', ['users' => $users, 'user' => Auth::user()]);
    }

    public function editUser(User $user)
    {
        return Inertia::render('Admin/EditUser', ['user' => $user]);
    }

    public function updateUser(Request $request, User $user)
    {
        try {
            User::where('id', $user->id)->update(['role' => $request->role]);
        } catch (Exception $e) {
            dd($e);
        };
        return redirect()->route('admin.users')->with('success', 'User role updated successfully');
    }

    public function deleteUser($id)
    {
        try {
            User::where('id', $id)->delete();
        } catch (Exception $e) {
            dd($e);
        };
        return redirect()->route('admin.users')->with('success', 'User deleted successfully');
    }
    public function deleteDokumen(RegMahasiswa $rh, $id)
    {
        $rh->where('id', $id)->delete();
        return redirect()->route('admin.index')->with('success', 'User deleted successfully');
    }
}
