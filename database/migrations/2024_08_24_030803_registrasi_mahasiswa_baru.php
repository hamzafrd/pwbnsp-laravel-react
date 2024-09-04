<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrasi_mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->string('status')->default('pending');
            $table->unsignedBigInteger('region_pribadi_id');
            $table->unsignedBigInteger('region_tempat_lahir_id')->nullable();
            $table->string('kecamatan');
            $table->string('nama_lengkap');
            $table->string('alamat_ktp');
            $table->string('alamat_lengkap');
            $table->string('nomor_telepon');
            $table->string('nomor_handphone');
            $table->string('email');
            $table->string('kewarganegaraan');
            $table->string('negara_wna')->nullable();
            $table->date('tanggal_lahir');
            $table->string('tempat_lahir');
            $table->string('jenis_kelamin');
            $table->string('status_menikah');
            $table->string('agama');
            $table->string('nem');
            $table->timestamps();

            $table->foreign('region_pribadi_id')->references('id')->on('regions')->onDelete('cascade');
            $table->foreign('region_tempat_lahir_id')->references('id')->on('regions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mahasiswa');
    }
};
