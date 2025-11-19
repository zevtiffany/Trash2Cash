"use client";

import { useAppStore } from "@/lib/store";
import { Quiz } from "@/lib/mockData";
import { BookOpen, Trophy, Lock } from "lucide-react";

interface QuizListProps {
  onSelectQuiz: (quiz: Quiz) => void;
}

export default function QuizList({ onSelectQuiz }: QuizListProps) {
  const { quizzes, quizAttempts, currentUser } = useAppStore();

  const getQuizStatus = (quizId: string) => {
    const attempts = quizAttempts.filter(
      (a) => a.userId === currentUser?.id && a.quizId === quizId
    );
    return attempts.length > 0
      ? {
          completed: true,
          bestScore: Math.max(...attempts.map((a) => a.score)),
          totalQuestions: attempts[0].totalQuestions,
        }
      : { completed: false };
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
          Kuis Edukasi 📚
        </h2>
        <p className="text-sm md:text-base text-gray-500">
          Tingkatkan pengetahuanmu tentang pengelolaan sampah dan dapatkan poin
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {quizzes.map((quiz) => {
          const status = getQuizStatus(quiz.id);

          return (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 text-center border-b border-gray-100">
                <div className="text-5xl mb-3">{quiz.icon}</div>
                <h3 className="text-lg font-bold text-gray-900">{quiz.title}</h3>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span>{quiz.questions.length} Soal</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Trophy className="w-4 h-4 text-yellow-600" />
                    <span>
                      {quiz.questions.length * quiz.pointsPerQuestion} Poin Maksimal
                    </span>
                  </div>
                </div>

                {status.completed ? (
                  <div className="bg-emerald-50 rounded-lg p-3 mb-4 text-center">
                    <p className="text-xs text-emerald-700 font-semibold mb-1">
                      ✓ Sudah Dikerjakan
                    </p>
                    <p className="text-sm font-bold text-emerald-600">
                      Skor Terbaik: {status.bestScore}/{status.totalQuestions}
                    </p>
                  </div>
                ) : null}

                <button
                  onClick={() => onSelectQuiz(quiz)}
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                >
                  {status.completed ? "Ulang Kuis" : "Mulai Kuis"}
                  {!status.completed && <span>→</span>}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Tips Belajar</h4>
            <p className="text-sm text-blue-700">
              Setiap soal yang benar akan memberikanmu 5 poin. Kerjakan semua
              kuis untuk memaksimalkan poin dan pelajari lebih banyak tentang
              pengelolaan sampah yang berkelanjutan!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
