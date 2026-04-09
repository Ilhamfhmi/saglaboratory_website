"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

interface RecentResearch {
  id: number;
  title: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");
  const [counts, setCounts] = useState({ research: 0, events: 0, groups: 0 });
  const [recentResearch, setRecentResearch] = useState<RecentResearch[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [publicationData, setPublicationData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    const userData = localStorage.getItem("sag_user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setAdminName(parsed.name?.split(' ')[0] || "Admin");
      } catch (e) { setAdminName("Admin"); }
    }
    fetchCoreData();
  }, []);

  const fetchCoreData = async () => {
    try {
      const endpoints = [
        "http://localhost:8000/api/research",
        "http://localhost:8000/api/events",
        "http://localhost:8000/api/study-groups"
      ];
      
      const [resR, resE, resG] = await Promise.all(
        endpoints.map(url => fetch(url).then(res => res.json()))
      );

      const researchArr = Array.isArray(resR) ? resR : [];
      
      setCounts({
        research: researchArr.length,
        events: Array.isArray(resE) ? resE.length : 0,
        groups: Array.isArray(resG) ? resG.length : 0
      });

      const monthlyCounts = new Array(10).fill(0);
      researchArr.forEach((item: any) => {
        const date = new Date(item.created_at);
        const monthIndex = date.getMonth();
        if (monthIndex < 10) {
          monthlyCounts[monthIndex]++;
        }
      });
      setPublicationData(monthlyCounts);
      setRecentResearch(researchArr.slice(0, 5));

    } catch (error) { 
      console.error("Fetch Error:", error); 
    } finally { 
      setLoading(false); 
    }
  };

  const growth = publicationData[0] === 0 
    ? (publicationData.reduce((a, b) => a + b, 0) > 0 ? 100 : 0) 
    : (((publicationData[new Date().getMonth()] || 0) / counts.research) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8 text-left font-jakarta">
      
      {/* Header */}
      <div className="mb-8" data-aos="fade-down">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Selamat datang kembali, {adminName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Live Server Time</p>
            <p className="text-sm font-medium text-gray-500 tabular-nums">
                {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-aos="fade-up">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between text-left">
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1 font-medium">Publikasi Riset</p>
              <p className="text-3xl font-bold text-gray-800 tabular-nums">{loading ? "-" : counts.research}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
          <Link href="/admin/research" className="text-xs text-blue-600 hover:text-blue-700 mt-4 inline-block font-semibold">Kelola Publikasi →</Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between text-left">
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1 font-medium">Event Agenda</p>
              <p className="text-3xl font-bold text-gray-800 tabular-nums">{loading ? "-" : counts.events}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
          <Link href="/admin/events" className="text-xs text-purple-600 hover:text-purple-700 mt-4 inline-block font-semibold">Kelola Agenda →</Link>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between text-left">
            <div className="text-left">
              <p className="text-sm text-gray-500 mb-1 font-medium">Study Group</p>
              <p className="text-3xl font-bold text-gray-800 tabular-nums">{loading ? "-" : counts.groups}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
          <Link href="/admin/study-group" className="text-xs text-emerald-600 hover:text-emerald-700 mt-4 inline-block font-semibold">Kelola Pilar →</Link>
        </div>
      </div>

      {/* Grafik Pertumbuhan Publikasi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 text-left" data-aos="fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 text-left">
          <div className="text-left">
            <h2 className="text-lg font-semibold text-gray-800">Grafik Pertumbuhan Publikasi</h2>
            <p className="text-sm text-gray-500 mt-1">Data riil akumulasi publikasi riset per bulan</p>
          </div>
          <div className="mt-2 sm:mt-0">
            <span className="text-xs text-blue-600 font-bold uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">Verified Database Data</span>
          </div>
        </div>

        <div className="relative pt-6">
          <div className="flex items-end gap-2 h-64 px-10">
            {publicationData.map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600 group relative shadow-sm"
                  style={{ height: `${counts.research === 0 ? 0 : (value / Math.max(...publicationData, 10)) * 200}px`, minHeight: value > 0 ? '4px' : '0px' }}
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 font-bold">
                    {value} Publikasi
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">{months[index]}</span>
              </div>
            ))}
          </div>
          <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] text-gray-300 font-bold uppercase">
            <span>MAX</span><span></span><span>MID</span><span></span><span>0</span>
          </div>
        </div>
      </div>

      {/* Audit & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-aos="fade-up">
        
        {/* Recent Publications */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left">
          <div className="flex items-center justify-between mb-6 text-left">
            <h3 className="font-semibold text-gray-800 uppercase text-xs tracking-widest">History Aset Research Terbaru</h3>
            <Link href="/admin/research" className="text-[10px] font-black text-blue-600 uppercase hover:underline">View All Assets</Link>
          </div>
          <div className="space-y-0">
            {recentResearch.length === 0 ? (
              <p className="text-gray-400 text-sm py-10 text-center">Data database kosong.</p>
            ) : (
              recentResearch.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 px-4 rounded-lg transition-all">
                  <div className="text-left flex-1 mr-4">
                    <p className="text-sm font-bold text-gray-800 uppercase tracking-tight line-clamp-1">{item.title}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-widest">Uploaded: {new Date(item.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                    Verified
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions & System Info */}
        <div className="space-y-6 text-left">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left">
            <h3 className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-widest border-b border-gray-50 pb-2">Quick Command</h3>
            <div className="space-y-3">
              <Link href="/admin/research/add" className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100 group text-left">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-blue-600 font-bold group-hover:scale-110 transition-transform">＋</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Post Research</span>
              </Link>
              <Link href="/admin/events/add" className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all border border-transparent hover:border-purple-100 group text-left">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-purple-600 font-bold group-hover:scale-110 transition-transform">＋</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">New Event</span>
              </Link>
              {/* Added Study Group Quick Command */}
              <Link href="/admin/study-group/add" className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100 group text-left">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-emerald-600 font-bold group-hover:scale-110 transition-transform">＋</div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Initiate Group</span>
              </Link>
            </div>
          </div>

          {/* Engine Status (Clean Style) */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 shadow-sm text-left">
            <h3 className="font-black text-gray-800 mb-4 uppercase text-[10px] tracking-widest">Engine Status</h3>
            <div className="space-y-3 text-[11px] font-bold uppercase tracking-widest">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400">System</span>
                <span className="text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  Operational
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400">Version</span>
                <span className="text-gray-700">v2.4.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Database</span>
                <span className="text-blue-600">Synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}