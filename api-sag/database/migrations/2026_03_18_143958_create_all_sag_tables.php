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
        // Tabel Event untuk pengumuman kegiatan SAG & ISG
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('image')->nullable();
            $table->date('event_date');
            $table->timestamps();
        });

        // Tabel Research untuk publikasi paper/riset
        Schema::create('researches', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('link_paper')->nullable();
            $table->year('year');
            $table->timestamps();
        });

        // Tabel Study Group untuk fitur Cek NIM (Lolos/Tidak)
        Schema::create('study_groups', function (Blueprint $table) {
            $table->id();
            $table->string('nim')->unique();
            $table->string('student_name');
            $table->string('division');
            $table->boolean('is_passed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
        Schema::dropIfExists('researches');
        Schema::dropIfExists('study_groups');
    }
};