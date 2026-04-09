<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudyGroupController; // 1. Import Controller Study Group

/*
|--------------------------------------------------------------------------
| SAGA Laboratory API Routes - FINAL OPTIMIZED
|--------------------------------------------------------------------------
*/

// ─── GOLONGAN RUTE PUBLIK ──────────────────────────────────────────────────
// Rute yang bisa diakses tanpa login (Landing Page & Detail)

Route::post('/login', [AuthController::class, 'login']);

// Rute Research (Publik)
Route::get('/research', [ResearchController::class, 'index']);
Route::get('/research/{id}', [ResearchController::class, 'show']);

// Rute Events (Publik)
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

// Rute Study Group (Publik)
Route::get('/study-groups', [StudyGroupController::class, 'index']);
Route::get('/study-groups/{id}', [StudyGroupController::class, 'show']);


// ─── GOLONGAN RUTE ADMIN (PROTECTED) ───────────────────────────────────────
// Wajib menggunakan Bearer Token dari Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Auth & User Profile
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // --- Admin Research Management ---
    Route::post('/research', [ResearchController::class, 'store']);
    Route::match(['post', 'put'], '/research/{id}', [ResearchController::class, 'update']); 
    Route::delete('/research/{id}', [ResearchController::class, 'destroy']);

    // --- Admin Events Management ---
    Route::post('/events', [EventController::class, 'store']);
    Route::match(['post', 'put'], '/events/{id}', [EventController::class, 'update']); 
    Route::delete('/events/{id}', [EventController::class, 'destroy']);

    // --- Admin Study Group Management ---
    // 1. Tambah Grup Baru
    Route::post('/study-groups', [StudyGroupController::class, 'store']);
    
    // 2. Update Grup (Handle Multipart/Form-Data dengan Method Spoofing)
    Route::match(['post', 'put'], '/study-groups/{id}', [StudyGroupController::class, 'update']); 
    
    // 3. Hapus Grup
    Route::delete('/study-groups/{id}', [StudyGroupController::class, 'destroy']);

});

// ─── FALLBACK ROUTE ────────────────────────────────────────────────────────
// Menangani jika rute tidak terdaftar agar return JSON (Bukan HTML Error)
Route::fallback(function () {
    return response()->json([
        'message' => 'Endpoint atau Method tidak ditemukan. Cek kembali URL API Anda.'
    ], 404);
});