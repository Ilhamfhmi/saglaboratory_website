"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

export default function StudyGroupDetailPage() {
  const params = useParams();
  const id = params?.id;
  
  const [group, setGroup] = useState<StudyGroupItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (id) {
      fetchGroupDetail();
    }
  }, [id]);

  const fetchGroupDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/study-groups/${id}`, {
        cache: "no-store",
        headers: { "Accept": "application/json" },
      });

      if (!response.ok) throw new Error("Grup tidak ditemukan");

      const data = await response.json();

      if (data.image_url && !data.image_url.startsWith('http')) {
        data.image_url = `http://localhost:8000/storage/${data.image_url}`;
      }

      setGroup(data);
    } catch (err) {
      console.error("Detail Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      'Active': 'bg-green-500',
      'Open': 'bg-[#013599]',
      'Closed': 'bg-red-500',
      'Full': 'bg-orange-500',
    };
    return statusColors[status] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-jakarta">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#013599] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-gray-500 font-medium">Memuat detail study group...</p>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6 font-jakarta">
        <div className="max-w-md">
          <div className="text-9xl mb-6">📚</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Not Found</h2>
          <Link href="/study-group" className="inline-flex items-center gap-2 bg-[#013599] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all">
            Kembali ke Study Groups
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jakarta text-left">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="bg-white pt-28 pb-4 md:pt-36 md:pb-6">
        <div className="container mx-auto px-6 text-left">
          <Link 
            href="/study-group" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-[#013599] transition-colors mb-10 group font-semibold text-sm uppercase tracking-widest"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Study Groups
          </Link>
          
          <div className="max-w-3xl text-left" data-aos="fade-up">
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#013599] font-bold text-[10px] uppercase tracking-[0.2em] rounded-lg mb-4 border border-blue-100">
                Detail Study Group
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900 tracking-tight uppercase">
              {group.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ─── CONTENT SECTION ─── */}
      <div className="container mx-auto px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          <div className="space-y-8" data-aos="fade-right">
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <div className="relative aspect-[4/3]">
                {!imageError && group.image_url ? (
                  <img
                    src={group.image_url}
                    alt={group.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                    <div className="text-6xl mb-4">👥</div>
                    <p className="text-gray-400 text-sm font-medium text-center uppercase font-black">Gambar tidak tersedia</p>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-left">
                <div className="flex items-center gap-2 mb-2 text-left">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-[#013599]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kategori</span>
                </div>
                <p className="text-lg font-black text-gray-800 text-left uppercase tracking-tight">{group.category}</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 text-left">
                <div className="flex items-center gap-2 mb-2 text-left">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(group.status)} animate-pulse`}></div>
                  </div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Status</span>
                </div>
                <p className="text-lg font-black text-gray-800 text-left uppercase tracking-tight">{group.status}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8" data-aos="fade-left">
            {/* LEADER SECTION DENGAN IKON ORANG */}
            <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-left">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-[#013599] shadow-lg shadow-blue-900/10 border border-blue-50">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-black text-[#013599] uppercase tracking-[0.4em] mb-1">Study Group Leader</p>
                  <h3 className="text-2xl font-black text-gray-800 uppercase tracking-tight leading-none">{group.leader}</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-[#013599]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">About This Study Group</h3>
              </div>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line text-left font-medium">
                {group.description}
              </p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-8 border border-gray-100 text-left">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-6">Program Benefits</h3>
              <div className="space-y-4">
                {[
                  "Regular study sessions with experts",
                  "Collaborative learning environment",
                  "Access to premium study materials",
                  "Networking with fellow researchers"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 text-left border-b border-gray-200/50 pb-4 last:border-0 last:pb-0">
                    <div className="w-5 h-5 bg-[#013599] rounded-full flex items-center justify-center shadow-lg shadow-blue-900/20">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={4} viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-bold text-xs uppercase tracking-wider">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 text-left">
              <Link 
                href="/study-group/register" 
                className="group relative w-full inline-flex items-center justify-center gap-4 bg-[#013599] text-white px-8 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-blue-800 transition-all duration-300 shadow-2xl shadow-blue-900/30 transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10">Join This Study Group</span>
                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <p className="mt-5 text-[9px] font-bold text-gray-400 text-center uppercase tracking-widest">
                * Limited slots available for Batch 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}