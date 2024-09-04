<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AgamaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $agama = [
            ['nama' => 'islam'],
            ['nama' => 'katolik'],
            ['nama' => 'kristen'],
            ['nama' => 'budha'],
            ['nama' => 'hindu'],
            ['nama' => 'lainnya'],
        ];

        foreach ($agama as $entry) {
            DB::table('agama')->insert([
                'nama' => $entry['nama'],
            ]);
        }
    }
}
