"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

interface StudyGroupItem {
  id: number;
  title: string;
  category: string;
  description: string;
  leader: string;
  image_url: string;
  status: string;
}

export default function StudyGroupAdminPage() {
  const [groups, setGroups] = useState<StudyGroupItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/study-groups?t=${Date.now()}`, {
        headers: { "Accept": "application/json" }
      });
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setGroups(data);
      } else if (data && Array.isArray(data.data)) {
        setGroups(data.data);
      } else {
        setGroups([]);
      }
    } catch (error) {
      console.error("Gagal mengambil data study groups:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus Study Group ini?")) return;

    try {
      const token = localStorage.getItem("sag_token");
      const response = await fetch(`http://localhost:8000/api/study-groups/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json" 
        }
      });

      if (response.ok) {
        setGroups(groups.filter(group => group.id !== id));
        alert("Study Group berhasil dihapus!");
      }
    } catch (error) {
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="space-y-8 text-left" data-aos="fade-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h1 className="text-3xl font-black text-sag-blue uppercase tracking-tighter">Study Group Management</h1>
          <p className="text-gray-400 font-medium text-sm">Kelola pilar riset: Enterprise Architecture, Business Process, dan IT Governance.</p>
        </div>
        
        <Link href="/admin/study-group/add" className="bg-sag-blue text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all flex items-center gap-3 w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
          Add New Group
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Cover</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Group Details</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Coordinator & Status</th>
                <th className="p-8 text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-bold italic">Loading study groups...</td></tr>
              ) : groups.length === 0 ? (
                <tr><td colSpan={4} className="p-20 text-center text-gray-300 font-bold italic">Belum ada data study group.</td></tr>
              ) : (
                groups.map((group) => (
                  <tr key={group.id} className="group hover:bg-gray-50/30 transition-colors">
                    {/* Cover Column */}
                    <td className="p-8 w-32">
                      <div className="w-20 aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                        <img 
                          src={group.image_url} 
                          alt="Cover" 
                          className="w-full h-full object-cover"
                          onError={(e) => {(e.target as HTMLImageElement).src = 'https://via.placeholder.com/150'}}
                        />
                      </div>
                    </td>

                    {/* Group Details Column */}
                    <td className="p-8">
                      <div className="flex flex-col max-w-xs text-left">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest w-fit mb-2">
                          {group.category}
                        </span>
                        <span className="font-bold text-sag-blue text-base leading-tight group-hover:text-blue-600 transition-colors">
                          {group.title}
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium mt-1 line-clamp-1">{group.description}</span>
                      </div>
                    </td>

                    {/* Coordinator & Status Column */}
                    <td className="p-8 text-sm text-left">
                      <div className="flex flex-col gap-3 text-left">
                        <div className="flex items-center gap-3 font-bold text-sag-blue text-left">
                          {/* FIX: GANTI HURUF DENGAN IKON ORANG SVG */}
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-50">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                          </div>
                          <span className="text-sm font-bold uppercase tracking-tight">{group.leader}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            group.status === 'Active' 
                            ? 'bg-green-50 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                          }`}>
                            {group.status}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="p-8 text-right">
                      <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                        <Link href={`/admin/study-group/edit/${group.id}`} className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </Link>
                        <button onClick={() => handleDelete(group.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm">
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