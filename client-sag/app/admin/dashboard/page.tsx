"use client";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("sag_user");
    if (userData) {
      setAdminName(JSON.parse(userData).name);
    }
  }, []);

  const stats = [
    { 
      title: "Research Published", 
      count: "12", 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      color: "from-blue-600 to-blue-700",
      bgLight: "bg-blue-50",
      trend: "+23%",
    },
    { 
      title: "Active Events", 
      count: "04", 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      color: "from-indigo-600 to-indigo-700",
      bgLight: "bg-indigo-50",
      trend: "+12%",
    },
    { 
      title: "Study Group", 
      count: "86", 
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      color: "from-emerald-600 to-emerald-700",
      bgLight: "bg-emerald-50",
      trend: "+5%",
    },
  ];

  return (
    <div className="space-y-10" data-aos="fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-4xl font-black text-sag-blue uppercase tracking-tighter">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 font-medium mt-1">
            Selamat datang kembali, <span className="text-sag-blue font-bold">{adminName || "Admin"}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-green-50 rounded-2xl border border-green-100 flex items-center gap-3">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">System Live</span>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all duration-500">
            <div className={`w-14 h-14 rounded-2xl ${stat.bgLight} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <div className={`text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`}>
                   {stat.icon}
                </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-5xl font-black text-sag-blue tracking-tighter mb-1">{stat.count}</h2>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.title}</p>
              </div>
              <span className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1.5 rounded-full mb-1">
                {stat.trend} ↑
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black text-sag-blue uppercase tracking-tight">Recent System Activity</h3>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View History</button>
          </div>
          
          <div className="space-y-5">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center gap-5 p-5 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-gray-100">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl">
                  {item === 1 ? "📄" : item === 2 ? "📅" : "👥"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-sag-blue">Admin updated Research content</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Enterprise Architecture v2.0</p>
                </div>
                <span className="text-[9px] font-black text-gray-300 uppercase">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-sag-blue rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-10"></div>
          
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight mb-8">System Health</h3>
            <div className="space-y-6">
              {[
                { label: "Database", status: "Connected", color: "bg-green-400" },
                { label: "Storage", status: "85% Used", color: "bg-blue-400" },
                { label: "Server", status: "Stable", color: "bg-cyan-400" },
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-200">
                    <span>{s.label}</span>
                    <span>{s.status}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full">
                    <div className={`${s.color} h-full rounded-full transition-all duration-1000`} style={{ width: s.status === 'Connected' ? '100%' : s.status === '85% Used' ? '85%' : '100%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 mt-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all">
             Run Diagnostic Check
          </button>
        </div>
      </div>
    </div>
  );
}