"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Definisikan tipe data agar tidak error 'any'
interface ResearchItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  link_medium: string;
}

export default function ResearchAdmin() {
  const [researchList, setResearchList] = useState<ResearchItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fungsi Fetch Data dari Laravel
  const fetchResearch = async () => {
    try {
      // Tambahkan nocache agar data selalu fresh saat admin buka halaman
      const response = await fetch(`http://localhost:8000/api/research?t=${Date.now()}`, {
        headers: {
          "Accept": "application/json"
        }
      });
      const data = await response.json();
      setResearchList(data);
    } catch (error) {
      console.error("Error fetching research:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fungsi Delete Data
  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus artikel ini? File gambar di server juga akan dihapus.")) return;

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch(`http://localhost:8000/api/research/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        // Optimistic UI update: hapus dari state lokal agar cepat
        setResearchList(researchList.filter(item => item.id !== id));
        alert("Research berhasil dihapus!");
      } else {
        alert("Gagal menghapus. Pastikan Anda memiliki akses.");
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi.");
    }
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  return (
    <div className="space-y-8" data-aos="fade-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-sag-blue uppercase tracking-tighter">Research Management</h1>
          <p className="text-gray-400 font-medium">Kelola publikasi dan artikel penelitian laboratorium SAG.</p>
        </div>
        
        <Link href="/admin/research/add" className="bg-sag-blue text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-800 hover:-translate-y-1 transition-all flex items-center gap-3 w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add New Research
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Cover</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Research Info</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Category</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-left">
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-gray-300 font-bold italic">Syncing with database...</td>
                </tr>
              ) : researchList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-20 text-center text-gray-300 font-bold italic">Belum ada data research. Silahkan tambah baru.</td>
                </tr>
              ) : (
                researchList.map((item) => (
                  <tr key={item.id} className="group hover:bg-gray-50/30 transition-colors">
                    <td className="p-8 w-32">
                      <div className="relative w-20 aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                        <img 
                          src={item.image_url} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover"
                          onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}}
                        />
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex flex-col max-w-md">
                        <span className="font-bold text-sag-blue text-base leading-tight group-hover:text-blue-600 transition-colors">{item.title}</span>
                        <span className="text-[11px] text-gray-400 font-medium mt-1 line-clamp-1">{item.description}</span>
                        {item.link_medium && (
                          <a href={item.link_medium} target="_blank" className="text-blue-400 font-bold text-[9px] uppercase tracking-widest mt-2 hover:text-blue-600">Medium Link ↗</a>
                        )}
                      </div>
                    </td>
                    <td className="p-8">
                      <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {/* Tombol Edit - Mengarah ke halaman edit dengan ID */}
                        <Link 
                          href={`/admin/research/edit/${item.id}`}
                          className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        
                        {/* Tombol Delete */}
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
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