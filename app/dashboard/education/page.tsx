import { BookOpen } from "lucide-react";

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900">Edukasi & Kuis</h2>
        <p className="text-gray-500">Pelajari cara memilah sampah yang benar.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="font-bold text-lg mb-2">Panduan Memilah Sampah</h3>
          <p className="text-gray-500 mb-4">Pelajari jenis-jenis sampah dan cara memisahkannya sebelum disetor ke Bank Sampah.</p>
          <button className="text-emerald-600 font-medium hover:underline">Baca Selengkapnya →</button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-2xl">?</span>
          </div>
          <h3 className="font-bold text-lg mb-2">Kuis Mingguan</h3>
          <p className="text-gray-500 mb-4">Ikuti kuis mingguan untuk mendapatkan poin tambahan!</p>
          <button className="text-emerald-600 font-medium hover:underline">Mulai Kuis →</button>
        </div>
      </div>
    </div>
  );
}
