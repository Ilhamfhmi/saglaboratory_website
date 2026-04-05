<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Membuat user admin spesifik untuk SAG Laboratory
        User::factory()->create([
            'name' => 'Admin SAG',
            'email' => 'admin@sag.com',
            'password' => bcrypt('admin123'), // Password diset manual menjadi admin123
        ]);
    }
}
