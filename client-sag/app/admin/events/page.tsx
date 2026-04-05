"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

interface EventItem {
  id: number;
  title: string;
  category: string;
  event_date: string;
  location: string;
  image_url: string;
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/events?t=${Date.now()}`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Gagal mengambil data events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus event ini?")) return;

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch(`http://localhost:8000/api/events/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        setEvents(events.filter(event => event.id !== id));
        alert("Event berhasil dihapus!");
      }
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sag-blue uppercase tracking-tighter">Events Management</h1>
          <p className="text-gray-400 font-medium text-sm">Kelola jadwal webinar, workshop, dan agenda SAG Laboratory.</p>
        </div>
        
        <Link href="/admin/events/add" className="bg-sag-blue text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all flex items-center gap-3 w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add New Event
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Poster</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Event Details</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Date & Location</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-bold italic">Loading events...</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-bold italic">Belum ada agenda event.</td></tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="group hover:bg-gray-50/30 transition-colors">
                    <td className="p-8 w-32">
                      <div className="w-20 aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                        <img 
                          src={event.image_url} 
                          alt="Poster" 
                          className="w-full h-full object-cover"
                          onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}}
                        />
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col max-w-xs">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest w-fit mb-2">
                          {event.category}
                        </span>
                        <span className="font-bold text-sag-blue text-base leading-tight group-hover:text-blue-600 transition-colors">
                          {event.title}
                        </span>
                      </div>
                    </td>
                    <td className="p-8 text-sm">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 font-bold text-sag-blue">
                          <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 font-medium">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                          {event.location}
                        </div>
                      </div>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                        <Link href={`/admin/events/${event.id}/edit`} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        <button onClick={() => handleDelete(event.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}