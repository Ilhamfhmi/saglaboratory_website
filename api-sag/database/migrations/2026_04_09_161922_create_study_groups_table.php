<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('study_groups', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Contoh: Cybersecurity Study Group
            $table->string('category'); // Contoh: Cloud, Networking, Cyber
            $table->text('description'); // Penjelasan fokus belajar
            $table->string('leader'); // Nama koordinator/ketua grup
            $table->string('image_url')->nullable(); // Logo atau poster grup
            $table->enum('status', ['Active', 'Finished'])->default('Active'); // Status grup
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('study_groups');
    }
};