<?php

use App\Http\Controllers\AgamaController;
use App\Http\Controllers\ProvinsiContoller;
use App\Http\Controllers\RegistrasiController;
use Illuminate\Support\Facades\Route;

Route::get('/api/agama', [AgamaController::class, 'getListAgama']);
Route::get('/api/provinces', [ProvinsiContoller::class, 'getListProvinsi']);
Route::get('/api/cities/{id}', [ProvinsiContoller::class, 'getKotaByProvinsiId']);

Route::post('/api/registrasi/mahasiswa', [RegistrasiController::class, 'registMahasiswaBaru'])->name('registrasi.mahasiswa-baru');
