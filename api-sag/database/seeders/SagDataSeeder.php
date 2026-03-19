<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SagDataSeeder extends Seeder
{
    public function run(): void
    {
        // Data Contoh untuk Study Group (Cek NIM)
        DB::table('study_groups')->insert([
            ['nim' => '1202220001', 'student_name' => 'Ilham Fahmi', 'division' => 'Digital Content', 'is_passed' => true],
            ['nim' => '1202220002', 'student_name' => 'Budi Santoso', 'division' => 'UI/UX Design', 'is_passed' => false],
        ]);

        // Data Contoh untuk Event
        DB::table('events')->insert([
            [
                'title' => 'SAG x ISG Workshop 2026',
                'description' => 'Workshop kolaborasi membahas masa depan UI/UX dan Cloud Computing.',
                'event_date' => '2026-04-10',
            ],
        ]);

        // Data Contoh untuk Research
        DB::table('researches')->insert([
            [
                'title' => 'Implementation of IT Governance in University Lab',
                'author' => 'SAG Research Team',
                'year' => 2025,
                'link_paper' => 'https://google.com'
            ],
        ]);
    }
}