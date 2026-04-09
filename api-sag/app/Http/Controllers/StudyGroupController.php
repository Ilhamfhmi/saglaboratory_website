<?php

namespace App\Http\Controllers;

use App\Models\StudyGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class StudyGroupController extends Controller
{
    // 1. Tampilkan Semua (Untuk Admin & Publik)
    public function index()
    {
        $groups = StudyGroup::latest()->get()->map(function ($group) {
            // Pastikan URL gambar lengkap agar Next.js bisa baca
            $group->image_url = $group->image_url ? asset('storage/' . $group->image_url) : null;
            return $group;
        });

        return response()->json($groups);
    }

    // 2. Simpan Data Baru (Add)
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'category'    => 'required|string',
            'description' => 'required|string',
            'leader'      => 'required|string|max:255',
            'status'      => 'required|in:Active,Finished',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Max 2MB
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('study-groups', 'public');
        }

        $group = StudyGroup::create([
            'title'       => $request->title,
            'category'    => $request->category,
            'description' => $request->description,
            'leader'      => $request->leader,
            'status'      => $request->status,
            'image_url'   => $imagePath,
        ]);

        return response()->json($group, 201);
    }

    // 3. Detail Data (Untuk Edit)
    public function show($id)
    {
        $group = StudyGroup::find($id);
        if (!$group) return response()->json(['message' => 'Data tidak ditemukan'], 444);

        $group->image_url = $group->image_url ? asset('storage/' . $group->image_url) : null;
        return response()->json($group);
    }

    // 4. Update Data
    public function update(Request $request, $id)
    {
        $group = StudyGroup::find($id);
        if (!$group) return response()->json(['message' => 'Data tidak ditemukan'], 444);

        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'category'    => 'required|string',
            'description' => 'required|string',
            'leader'      => 'required|string|max:255',
            'status'      => 'required|in:Active,Finished',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update data teks
        $group->title       = $request->title;
        $group->category    = $request->category;
        $group->description = $request->description;
        $group->leader      = $request->leader;
        $group->status      = $request->status;

        // Update gambar jika ada file baru
        if ($request->hasFile('image')) {
            // Hapus gambar lama
            if ($group->image_url) {
                Storage::disk('public')->delete($group->image_url);
            }
            $group->image_url = $request->file('image')->store('study-groups', 'public');
        }

        $group->save();

        return response()->json($group);
    }

    // 5. Hapus Data
    public function destroy($id)
    {
        $group = StudyGroup::find($id);
        if ($group) {
            if ($group->image_url) {
                Storage::disk('public')->delete($group->image_url);
            }
            $group->delete();
            return response()->json(['message' => 'Berhasil dihapus']);
        }
        return response()->json(['message' => 'Gagal menghapus'], 400);
    }
}