"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
// Kita gunakan tag img standar untuk menghindari error Private IP Next.js di localhost
import AOS from "aos";
import "aos/dist/aos.css";

// ─── Interface Data ─────────────────────────────────────────────────────────
interface EventItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
  event_date: string;
  location: string;
  registration_link: string;
}

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id;
  
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    if (id) {
      fetchEventDetail();
    }
  }, [id]);

  const fetchEventDetail = async () => {
    try {
      setLoading(true);
      // Mengambil data langsung dari endpoint API Laravel
      const response = await fetch(`http://localhost:8000/api/events/${id}`, {
        cache: "no-store",
        headers: {
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Event tidak ditemukan");
      }

      const data = await response.json();
      setEvent(data);
    } catch (err) {
      console.error("Detail Fetch Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 1. State Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-semibold text-gray-500 text-sm tracking-wide">Memuat detail event...</p>
        </div>
      </div>
    );
  }

  // 2. State Error atau Data Tidak Ada
  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
        <div className="max-w-md">
          <div className="text-8xl mb-6">🔍</div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Event Not Found</h2>
          <p className="text-gray-500 mb-8">
            Maaf, detail kegiatan yang Anda cari tidak dapat ditemukan di database.
          </p>
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-16 md:py-24">
        
        {/* Back Button */}
        <div className="mb-8" data-aos="fade-right">
          <Link 
            href="/events" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Events
          </Link>
        </div>

        {/* Title Section */}
        <div className="mb-12" data-aos="fade-up">
          <div className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4">
            Detail Event
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {event.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              {event.category}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Image (Menggunakan img standar agar gambar localhost tampil) */}
          <div className="space-y-6" data-aos="fade-right">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <div className="relative aspect-[4/3]">
                {!imageError ? (
                  <img
                    src={event.image_url || "/logo-sag.png"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🖼️</div>
                      <p className="text-gray-400 text-sm">Gambar tidak tersedia</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8" data-aos="fade-left">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informasi Event</h2>
            </div>

            {/* Date & Location Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wide">Tanggal</h3>
                </div>
                <p className="text-xl font-bold text-gray-800">
                  {new Date(event.event_date).toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wide">Lokasi</h3>
                </div>
                <p className="text-xl font-bold text-gray-800 break-words">{event.location}</p>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wide">Deskripsi Event</h3>
              </div>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* CTA Button */}
            {event.registration_link && (
              <div className="pt-4">
                <a
                  href={event.registration_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <span>Daftar Sekarang</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}