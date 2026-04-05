<?php

namespace App\Http\Controllers;

use App\Models\Research;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File; // Tambahkan ini untuk hapus file fisik

class ResearchController extends Controller
{
    public function index()
    {
        // Mengirim data terbaru dengan URL lengkap untuk gambar
        $research = Research::latest()->get()->map(function($item) {
            $item->image_url = $item->image_url ? url($item->image_url) : null;
            return $item;
        });
        
        return response()->json($research, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Validasi file gambar
            'link_medium' => 'nullable|url',
        ]);

        $imageUrl = null;

        // Logika Upload Gambar
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            
            // Simpan ke public/uploads/research
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

    public function show(Research $research)
    {
        $research->image_url = $research->image_url ? url($research->image_url) : null;
        return response()->json($research, 200);
    }

    public function update(Request $request, Research $research)
    {
        $request->validate([
            'title' => 'string|max:255',
            'category' => 'string',
            'description' => 'string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'link_medium' => 'nullable|url',
        ]);

        // Update data teks
        $research->fill($request->only(['title', 'category', 'description', 'link_medium']));

        // Update Gambar jika ada file baru
        if ($request->hasFile('image')) {
            // Hapus foto lama jika ada
            if ($research->image_url && File::exists(public_path($research->image_url))) {
                File::delete(public_path($research->image_url));
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

    public function destroy(Research $research)
    {
        // Hapus file fisik dari folder uploads sebelum hapus data di DB
        if ($research->image_url && File::exists(public_path($research->image_url))) {
            File::delete(public_path($research->image_url));
        }

        $research->delete();

        return response()->json([
            'message' => 'Research berhasil dihapus!'
        ], 200);
    }
}