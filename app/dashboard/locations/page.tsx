"use client";

import { MapPin, Phone, Clock, DollarSign, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function WasteBankLocationsPage() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const wasteBanks = [
    {
      id: 1,
      name: "Bank Sampah Jaya Barokah",
      address: "Jl. Raya Penggilingan No. 42, Jakarta Timur",
      phone: "+62 812-3456-7890",
      email: "jaya@banksamah.id",
      hours: "08:00 - 17:00 (Senin-Jumat)",
      rating: 4.8,
      reviews: 245,
      lat: -6.1819,
      lng: 106.8862,
      types: ["Plastik", "Kertas", "Logam", "Kaca"],
      pricePerKg: 2000,
      image: "🏢",
      description: "Bank sampah terbesar di area Jakarta Timur dengan layanan lengkap dan profesional.",
    },
    {
      id: 2,
      name: "Eco Bank Sampah Bersama",
      address: "Jl. Warung Buncit No. 15, Jakarta Selatan",
      phone: "+62 813-2345-6789",
      email: "contact@ecobanksamah.id",
      hours: "07:00 - 18:00 (Senin-Sabtu)",
      rating: 4.6,
      reviews: 182,
      lat: -6.2645,
      lng: 106.7884,
      types: ["Plastik", "Kertas", "Elektronik"],
      pricePerKg: 1800,
      image: "♻️",
      description: "Spesialis dalam penanganan sampah elektronik dan plastik berkualitas tinggi.",
    },
    {
      id: 3,
      name: "Bank Sampah Hijau Mandiri",
      address: "Jl. Pulo Gebang No. 8, Jakarta Utara",
      phone: "+62 814-1234-5678",
      email: "info@hijaummandiri.id",
      hours: "08:00 - 16:00 (Senin-Jumat)",
      rating: 4.5,
      reviews: 156,
      lat: -6.1278,
      lng: 106.9068,
      types: ["Plastik", "Kertas", "Logam"],
      pricePerKg: 1900,
      image: "🌱",
      description: "Fokus pada pemberdayaan masyarakat dan edukasi lingkungan berkelanjutan.",
    },
    {
      id: 4,
      name: "Sampah Berkah Sejahtera",
      address: "Jl. Depok No. 123, Jakarta Barat",
      phone: "+62 815-3456-7890",
      email: "hello@samahberkah.id",
      hours: "09:00 - 17:00 (Senin-Jumat)",
      rating: 4.7,
      reviews: 198,
      lat: -6.3549,
      lng: 106.7696,
      types: ["Plastik", "Kertas", "Kaca", "Logam"],
      pricePerKg: 2100,
      image: "💚",
      description: "Program komprehensif dengan pickup service gratis untuk volume besar.",
    },
    {
      id: 5,
      name: "Bank Sampah Sejuk Alam",
      address: "Jl. Kramat Jati No. 56, Jakarta Timur",
      phone: "+62 816-2345-6789",
      email: "sejuk@banksamah.id",
      hours: "07:30 - 17:30 (Senin-Sabtu)",
      rating: 4.4,
      reviews: 134,
      lat: -6.2427,
      lng: 106.8885,
      types: ["Plastik", "Kertas", "Logam"],
      pricePerKg: 1700,
      image: "🌿",
      description: "Bank sampah komunitas dengan program reward menarik untuk pelanggan setia.",
    },
    {
      id: 6,
      name: "Pusat Daur Ulang Ceria",
      address: "Jl. Ancol Timur No. 99, Jakarta Utara",
      phone: "+62 817-1234-5678",
      email: "ceria@dauurulang.id",
      hours: "08:00 - 18:00 (Setiap Hari)",
      rating: 4.9,
      reviews: 267,
      lat: -6.1139,
      lng: 106.8455,
      types: ["Plastik", "Kertas", "Kaca", "Logam", "Elektronik"],
      pricePerKg: 2200,
      image: "✨",
      description: "Pusat daur ulang modern dengan teknologi terkini dan layanan terlengkap.",
    },
  ];

  const currentBank = wasteBanks[selectedLocation];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          Lokasi Bank Sampah
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Temukan bank sampah terdekat untuk menukar sampah dengan poin
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        {/* Bank List */}
        <div className="lg:col-span-1">
          <div className="space-y-2 md:space-y-3 max-h-96 overflow-y-auto">
            {wasteBanks.map((bank, idx) => (
              <button
                key={bank.id}
                onClick={() => setSelectedLocation(idx)}
                className={`w-full p-2 md:p-4 rounded-lg border-2 text-left transition-all ${
                  selectedLocation === idx
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-gray-200 bg-white hover:border-emerald-300"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-xl md:text-2xl mb-0.5 md:mb-1">{bank.image}</div>
                    <h3 className="font-semibold text-gray-900 text-xs md:text-sm line-clamp-2">
                      {bank.name}
                    </h3>
                    <div className="flex items-center gap-1 md:gap-2 mt-1">
                      <span className="text-yellow-500 text-xs md:text-sm">★</span>
                      <span className="text-xs font-semibold">
                        {bank.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({bank.reviews})
                      </span>
                    </div>
                  </div>
                  {selectedLocation === idx && (
                    <div className="text-emerald-600 text-lg flex-shrink-0">→</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg overflow-hidden">
            {/* Header dengan gambar */}
            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 md:p-8 text-center">
              <div className="text-6xl md:text-8xl mb-2 md:mb-4">{currentBank.image}</div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 line-clamp-2">
                {currentBank.name}
              </h1>
              <div className="flex items-center justify-center gap-2">
                <span className="text-yellow-500 text-base md:text-lg">★</span>
                <span className="font-bold text-base md:text-lg">{currentBank.rating}</span>
                <span className="text-xs md:text-base text-gray-600">
                  ({currentBank.reviews})
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-8 space-y-4 md:space-y-6">
              {/* Description */}
              <p className="text-xs md:text-base text-gray-700 text-center italic">
                {currentBank.description}
              </p>

              {/* Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-4">
                <div className="bg-blue-50 rounded-lg p-2 md:p-4 border border-blue-200">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 md:w-5 h-4 md:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-blue-900 mb-1">
                        ALAMAT
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 line-clamp-3">
                        {currentBank.address}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-2 md:p-4 border border-green-200">
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 md:w-5 h-4 md:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-green-900 mb-1">
                        TELEPON
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 font-mono truncate">
                        {currentBank.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-2 md:p-4 border border-purple-200">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 md:w-5 h-4 md:h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-purple-900 mb-1">
                        JAM BUKA
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 line-clamp-2">{currentBank.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-2 md:p-4 border border-yellow-200">
                  <div className="flex items-start gap-2">
                    <DollarSign className="w-4 md:w-5 h-4 md:h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-yellow-900 mb-1">
                        HARGA
                      </p>
                      <p className="text-xs md:text-sm text-gray-700 truncate">
                        Rp {currentBank.pricePerKg.toLocaleString()}/kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Types of Waste */}
              <div>
                <p className="text-xs md:text-base font-semibold text-gray-900 mb-2 md:mb-3">
                  Jenis Sampah:
                </p>
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {currentBank.types.map((type, idx) => (
                    <span
                      key={idx}
                      className="bg-emerald-100 text-emerald-800 px-2 md:px-4 py-1 md:py-2 rounded-full text-xs md:text-sm font-semibold"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3 pt-3 md:pt-4 border-t border-gray-200">
                <a
                  href={`https://wa.me/62${currentBank.phone.replace(/[^\d]/g, "").slice(2)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 md:gap-2 bg-green-500 text-white py-2 md:py-3 px-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold hover:bg-green-600 transition-colors"
                >
                  💬 WhatsApp
                </a>
                <a
                  href={`mailto:${currentBank.email}`}
                  className="flex items-center justify-center gap-1 md:gap-2 bg-blue-600 text-white py-2 md:py-3 px-2 md:px-4 rounded-lg text-xs md:text-sm font-semibold hover:bg-blue-700 transition-colors"
                >
                  📧 Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg p-3 md:p-4 border border-emerald-200 text-center">
          <p className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">
            {wasteBanks.length}
          </p>
          <p className="text-xs md:text-sm text-gray-700">Bank Sampah</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 md:p-4 border border-blue-200 text-center">
          <p className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">24/7</p>
          <p className="text-xs md:text-sm text-gray-700">Layanan</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 md:p-4 border border-purple-200 text-center">
          <p className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">4.6⭐</p>
          <p className="text-xs md:text-sm text-gray-700">Rating</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 md:p-4 border border-yellow-200 text-center">
          <p className="text-2xl md:text-3xl font-bold text-yellow-600 mb-1">Gratis</p>
          <p className="text-xs md:text-sm text-gray-700">Member</p>
        </div>
      </div>
    </div>
  );
}
