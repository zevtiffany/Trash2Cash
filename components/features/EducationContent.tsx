"use client";

import { useState } from "react";
import { Quiz } from "@/lib/store";
import { BookOpen, Play, SkipBack } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface EducationContentProps {
  quiz: Quiz;
  onStartQuiz: () => void;
  onBack: () => void;
}

export default function EducationContent({
  quiz,
  onStartQuiz,
  onBack,
}: EducationContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            <SkipBack className="w-5 h-5" />
            Kembali
          </button>
          <div className="text-sm font-semibold text-gray-600 bg-white px-4 py-2 rounded-lg">
            📚 Materi Belajar
          </div>
        </div>

        {/* Quiz Header */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 p-8 text-center text-white">
            <div className="text-6xl mb-4">{quiz.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {quiz.title}
            </h1>
            <p className="text-blue-100 text-lg">{quiz.description}</p>
          </div>

          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-blue-600">📖</p>
                <p className="text-xs text-gray-600 mt-2">Materi Lengkap</p>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-emerald-600">
                  {quiz.questions?.length || 0}
                </p>
                <p className="text-xs text-gray-600 mt-2">Soal</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-yellow-600">
                  {((quiz.questions?.length || 0) * quiz.points_per_question)}
                </p>
                <p className="text-xs text-gray-600 mt-2">Poin Maksimal</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-2xl font-bold text-purple-600">⏱️</p>
                <p className="text-xs text-gray-600 mt-2">Tanpa Batas Waktu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Content */}
        {quiz.content && (
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
            {!isExpanded ? (
              <>
                <div className="flex items-start gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      📚 Baca Materi Pembelajaran
                    </h2>
                    <p className="text-gray-600">
                      Pahami materi lengkap di bawah sebelum mengerjakan soal
                      kuis. Materi ini dirancang untuk membantu Anda
                      memaksimalkan skor.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-blue-50 to-transparent rounded-xl p-4 md:p-6 border border-blue-200 mb-6">
                  <div className="prose prose-sm max-w-none text-gray-700 line-clamp-4">
                    <ReactMarkdown>{quiz.content}</ReactMarkdown>
                  </div>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-flex items-center gap-2"
                  >
                    Baca Selengkapnya →
                  </button>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={onStartQuiz}
                    className="w-full bg-emerald-600 text-white py-4 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-lg"
                  >
                    <Play className="w-5 h-5" />
                    Mulai Kuis
                  </button>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="w-full bg-blue-100 text-blue-700 py-3 px-4 rounded-lg font-semibold hover:bg-blue-200 transition-colors"
                  >
                    Baca Materi Lengkap
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-6">
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-flex items-center gap-2"
                  >
                    ← Sembunyikan Materi
                  </button>
                </div>

                <div className="prose prose-sm md:prose-base max-w-none mb-8 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-6 md:p-8">
                  <ReactMarkdown>{quiz.content}</ReactMarkdown>
                </div>

                <button
                  onClick={onStartQuiz}
                  className="w-full bg-emerald-600 text-white py-4 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-lg"
                >
                  <Play className="w-5 h-5" />
                  Mulai Kuis
                </button>
              </>
            )}
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-semibold text-emerald-900 mb-2">
                Tips Sukses Kuis
              </h3>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>
                  ✓ Baca materi dengan seksama sebelum memulai kuis
                </li>
                <li>
                  ✓ Pahami setiap konsep yang dijelaskan dengan contoh konkret
                </li>
                <li>
                  ✓ Jawab setiap soal dengan teliti dan baca semua opsi
                </li>
                <li>
                  ✓ Gunakan penjelasan setelah menjawab untuk memperdalam pemahaman
                </li>
                <li>
                  ✓ Kerjakan ulang jika belum mencapai skor yang diinginkan
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
