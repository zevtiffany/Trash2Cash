"use client";

import { Phone, Mail, MapPin, Clock, MessageSquare, Globe } from "lucide-react";

export default function ContactPage() {
  const contactChannels = [
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Telepon",
      description: "Hubungi kami melalui telepon",
      details: ["+62 812-3456-7890", "Senin - Jumat: 08:00 - 17:00 WIB"],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      description: "Kirim pertanyaan melalui email",
      details: ["info@trashtocash.id", "Kami balas dalam 24 jam"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "WhatsApp",
      description: "Chat langsung dengan tim kami",
      details: ["+62 812-3456-7890", "Tersedia 24/7"],
      color: "from-green-400 to-green-600",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Live Chat",
      description: "Chat dengan support team kami",
      details: ["Tersedia di website", "Jam kerja: 09:00 - 18:00 WIB"],
      color: "from-purple-500 to-purple-600",
    },
  ];

  const faqItems = [
    {
      question: "Bagaimana cara mendaftar di Trash to Cash?",
      answer:
        "Kunjungi halaman login, klik 'Daftar', pilih peran Anda (Rumah Tangga, Bank Sampah, atau Pemerintah), dan isi data pribadi Anda.",
    },
    {
      question: "Bagaimana cara menukar poin dengan hadiah?",
      answer:
        "Kumpulkan poin dari menyelesaikan kuis edukasi atau menginput sampah. Buka menu Reward, pilih hadiah yang diinginkan, dan tukar poin Anda.",
    },
    {
      question: "Berapa poin yang bisa saya dapatkan?",
      answer:
        "Setiap soal kuis yang benar memberikan 5 poin. Jumlah total poin tergantung pada jumlah soal yang benar dalam setiap kuis.",
    },
    {
      question: "Apakah ada biaya untuk menggunakan aplikasi ini?",
      answer:
        "Tidak, Trash to Cash adalah aplikasi gratis yang dirancang untuk mendidik masyarakat tentang pengelolaan sampah berkelanjutan.",
    },
    {
      question: "Bagaimana jika saya lupa password?",
      answer:
        "Klik 'Lupa Password' di halaman login, masukkan email Anda, dan ikuti instruksi yang dikirim ke email untuk reset password.",
    },
    {
      question: "Apakah data saya aman?",
      answer:
        "Ya, kami menggunakan enkripsi tingkat enterprise dan mematuhi standar keamanan data internasional untuk melindungi privasi Anda.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
          Hubungi Kami
        </h1>
        <p className="text-sm md:text-base text-gray-600">
          Kami siap membantu Anda 24/7. Pilih channel komunikasi yang paling nyaman.
        </p>
      </div>

      {/* Contact Channels */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
        {contactChannels.map((channel, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className={`bg-gradient-to-r ${channel.color} p-3 md:p-6 text-white`}>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="opacity-80 text-4xl md:text-6xl flex-shrink-0">{channel.icon}</div>
                <div className="min-w-0">
                  <h3 className="text-sm md:text-xl font-bold truncate">{channel.title}</h3>
                  <p className="text-xs md:text-sm opacity-90 line-clamp-1">{channel.description}</p>
                </div>
              </div>
            </div>
            <div className="p-3 md:p-6">
              {channel.details.map((detail, i) => (
                <div key={i} className="mb-2 md:mb-3 last:mb-0">
                  <p className="text-xs md:text-sm text-gray-800 font-semibold line-clamp-2">{detail}</p>
                </div>
              ))}
              <button className="w-full mt-2 md:mt-4 bg-emerald-600 text-white py-2 px-3 md:px-4 rounded-lg text-xs md:text-sm font-semibold hover:bg-emerald-700 transition-colors">
                Hubungi
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-lg p-3 md:p-6 border border-blue-200">
          <div className="flex items-start gap-2 md:gap-4">
            <Clock className="w-5 md:w-6 h-5 md:h-6 text-blue-600 flex-shrink-0 mt-0.5 md:mt-1" />
            <div className="min-w-0">
              <h4 className="font-semibold text-xs md:text-base text-gray-900 mb-1">Jam Layanan</h4>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                Senin - Jumat: 08:00 - 17:00 WIB
                <br />
                Sabtu: 09:00 - 13:00 WIB
                <br />
                Minggu & Hari Libur: Tutup
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 md:p-6 border border-purple-200">
          <div className="flex items-start gap-2 md:gap-4">
            <MapPin className="w-5 md:w-6 h-5 md:h-6 text-purple-600 flex-shrink-0 mt-0.5 md:mt-1" />
            <div className="min-w-0">
              <h4 className="font-semibold text-xs md:text-base text-gray-900 mb-1">Lokasi Kantor</h4>
              <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                Jl. Lingkungan Berkelanjutan No. 42
                <br />
                Jakarta Timur, 13220
                <br />
                Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
          Pertanyaan Umum (FAQ)
        </h2>
        <div className="space-y-2 md:space-y-4">
          {faqItems.map((faq, idx) => (
            <details
              key={idx}
              className="bg-white rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors"
            >
              <summary className="p-3 md:p-6 cursor-pointer font-semibold text-xs md:text-base text-gray-900 flex items-center justify-between">
                <span className="text-left">{faq.question}</span>
                <span className="text-emerald-600 ml-2 flex-shrink-0">+</span>
              </summary>
              <div className="px-3 md:px-6 pb-3 md:pb-6 text-xs md:text-sm text-gray-700 border-t border-gray-200">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-md md:shadow-lg p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
          Kirim Pesan Langsung
        </h2>
        <form className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="text-sm px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="text-sm px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <input
            type="text"
            placeholder="Subjek"
            className="w-full text-sm px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <textarea
            placeholder="Pesan Anda"
            rows={4}
            className="w-full text-sm px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white text-sm md:text-base py-2 md:py-3 px-3 md:px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
}
