<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(9)->create();
        User::factory()->create([
            'name' => 'Hamza',
            'email' => 'hamza@mail.com',
            'password' => Hash::make('hamzaf625'),
        ]);

        User::factory()->create([
            'name' => 'admin A',
            'email' => 'admin@mail.com',
            'role' => 'admin',
            'password' => Hash::make('hamzaf625'),
        ]);
        User::factory()->create([
            'name' => 'admin B',
            'email' => 'admin2@mail.com',
            'role' => 'admin',
            'password' => Hash::make('hamzaf625'),
        ]);

        $this->call([
            RegionsSeeder::class,
        ]);

        $this->call([
            AgamaSeeder::class,
        ]);
    }
}
