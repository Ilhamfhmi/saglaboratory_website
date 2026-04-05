<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::latest()->get()->map(function($item) {
            $item->image_url = $item->image_url ? url($item->image_url) : null;
            return $item;
        });

        return response()->json($events, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'description' => 'required',
            'event_date' => 'required|date',
            'location' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048', 
        ]);

        $imageUrl = null;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads/events'), $fileName);
            $imageUrl = '/uploads/events/' . $fileName;
        }

        $event = Event::create([
            'title' => $request->title,
            'category' => $request->category,
            'description' => $request->description,
            'event_date' => $request->event_date,
            'location' => $request->location,
            'registration_link' => $request->registration_link,
            'image_url' => $imageUrl,
        ]);

        return response()->json($event, 201);
    }

    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event tidak ditemukan.'], 404);
        }

        $event->image_url = $event->image_url ? url($event->image_url) : null;
        return response()->json($event, 200);
    }

    /**
     * UPDATE DATA (PERBAIKAN KRUSIAL)
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event tidak ditemukan'], 404);
        }

        // 1. Validasi harus menyertakan image nullable agar tidak error saat update teks saja
        $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'description' => 'required',
            'event_date' => 'required',
            'location' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', 
        ]);

        // 2. Handle Image Upload
        if ($request->hasFile('image')) {
            // Hapus file lama
            if ($event->image_url && File::exists(public_path($event->image_url))) {
                File::delete(public_path($event->image_url));
            }

            $file = $request->file('image');
            $fileName = time() . '_' . str_replace(' ', '_', $file->getClientOriginalName());
            $file->move(public_path('uploads/events'), $fileName);
            $event->image_url = '/uploads/events/' . $fileName;
        }

        // 3. Gunakan fill() daripada update() langsung untuk menghindari 
        // field '_method' ikut masuk ke proses database
        $event->fill($request->only([
            'title', 'category', 'description', 'event_date', 'location', 'registration_link'
        ]));
        
        $event->save();

        return response()->json([
            'message' => 'Event berhasil diupdate',
            'data' => $event
        ], 200);
    }

    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Event tidak ditemukan'], 404);
        }

        if ($event->image_url && File::exists(public_path($event->image_url))) {
            File::delete(public_path($event->image_url));
        }

        $event->delete();
        return response()->json(['message' => 'Event berhasil dihapus'], 200);
    }
}