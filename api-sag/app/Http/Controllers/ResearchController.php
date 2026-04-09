<?php

namespace App\Http\Controllers;

use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ResearchController extends Controller
{
    /**
     * TAMPILKAN SEMUA DATA
     */
    public function index()
    {
        $research = Research::latest()->get()->map(function($item) {
            // Pastikan URL gambar lengkap (http://localhost:8000/uploads/...)
            $item->image_url = $item->image_url ? url($item->image_url) : null;
            return $item;
        });
        
        return response()->json($research, 200);
    }

    /**
     * SIMPAN DATA BARU
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'link_medium' => 'nullable|url',
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads/research'), $fileName);
            $imageUrl = '/uploads/research/' . $fileName;
        }

        $research = Research::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'image_url' => $imageUrl,
            'link_medium' => $request->link_medium,
        ]);

        return response()->json([
            'message' => 'Research berhasil dipublikasikan!',
            'data' => $research
        ], 201);
    }

    /**
     * AMBIL DETAIL DATA (PERBAIKAN UTAMA)
     * Menggunakan $id untuk menghindari error binding di Next.js
     */
    public function show($id)
    {
        $research = Research::find($id);

        if (!$research) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        // Generate URL lengkap agar muncul di preview Edit Page Next.js
        $research->image_url = $research->image_url ? url($research->image_url) : null;
        
        return response()->json($research, 200);
    }

    /**
     * UPDATE DATA
     */
    public function update(Request $request, $id)
    {
        $research = Research::find($id);

        if (!$research) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'link_medium' => 'nullable|url',
        ]);

        // Update data teks menggunakan fill agar field '_method' dari Next.js tidak ikut masuk
        $research->fill($request->only(['title', 'category', 'description', 'link_medium']));

        if ($request->hasFile('image')) {
            // Hapus foto lama dari storage jika user upload baru
            // Kita pakai string path asli dari DB, bukan URL lengkap
            $oldPath = $research->getRawOriginal('image_url');
            if ($oldPath && File::exists(public_path($oldPath))) {
                File::delete(public_path($oldPath));
            }

            $file = $request->file('image');
            $fileName = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads/research'), $fileName);
            $research->image_url = '/uploads/research/' . $fileName;
        }

        $research->save();

        return response()->json([
            'message' => 'Research berhasil diperbarui!',
            'data' => $research
        ], 200);
    }

    /**
     * HAPUS DATA
     */
    public function destroy($id)
    {
        $research = Research::find($id);

        if (!$research) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        // Hapus file fisik
        $path = $research->getRawOriginal('image_url');
        if ($path && File::exists(public_path($path))) {
            File::delete(public_path($path));
        }

        $research->delete();

        return response()->json([
            'message' => 'Research berhasil dihapus!'
        ], 200);
    }
}