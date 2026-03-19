'use client';
import { useState } from 'react';

export default function StudyGroup() {
  const [nim, setNim] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Simulasi Fetch ke Laravel API nanti
    // Untuk sekarang kita pakai logika dummy dulu agar kamu bisa lihat hasilnya
    if (nim === '1202220001') {
      setResult({ name: 'Ilham Fahmi', status: 'Lolos', division: 'Digital Content' });
    } else if (nim === '1202220002') {
      setResult({ name: 'Budi Santoso', status: 'Tidak Lolos', division: 'UI/UX Design' });
    } else {
      setError('NIM tidak ditemukan dalam database Study Group.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-sag-blue p-8 text-white text-center">
          <h1 className="text-3xl font-bold">Cek Kelulusan</h1>
          <p className="mt-2 text-blue-100 opacity-90">Study Group SAG Laboratory 2026</p>
        </div>

        <form onSubmit={handleCheck} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Masukkan NIM Kamu</label>
            <input 
              type="text" 
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Contoh: 120222xxxx"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sag-blue focus:border-transparent outline-none transition"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-sag-blue text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg"
          >
            Cek Sekarang
          </button>
        </form>

        {/* Menampilkan Hasil */}
        {result && (
          <div className="px-8 pb-8 animate-fade-in">
            <div className={`p-6 rounded-xl border ${result.status === 'Lolos' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <h3 className="font-bold text-gray-800 text-lg">{result.name}</h3>
              <p className="text-gray-600 mt-1">Divisi: {result.division}</p>
              <div className={`mt-4 inline-block px-4 py-1 rounded-full font-bold text-sm ${result.status === 'Lolos' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {result.status}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="px-8 pb-8">
            <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg text-sm text-center">
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}