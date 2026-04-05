<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Research extends Model
{
    use HasFactory;

    // Nama tabel di database
    protected $table = 'research';

    // Kolom yang boleh diisi (Mass Assignment)
    protected $fillable = [
        'title',
        'category',
        'description',
        'image_url',
        'link_medium'
    ];
}