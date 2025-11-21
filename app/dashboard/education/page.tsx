"use client";

import { useState } from "react";
import { useAppStore, Quiz } from "@/lib/store";
import QuizList from "@/components/features/QuizList";
import QuizComponent from "@/components/features/QuizComponent";
import EducationContent from "@/components/features/EducationContent";
import { SkipBack } from "lucide-react";

export default function EducationPage() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showEducation, setShowEducation] = useState(false);
  const { currentUser } = useAppStore();

  if (!currentUser) return null;

  if (currentUser.role !== "household") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Edukasi & Kuis
          </h2>
          <p className="text-sm md:text-base text-gray-500">
            Fitur ini hanya tersedia untuk pengguna rumah tangga.
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-700 mb-4">
            Silakan login sebagai pengguna rumah tangga untuk mengakses kuis
            edukasi.
          </p>
          <p className="text-sm text-blue-600">Email: budi@warga.com</p>
        </div>
      </div>
    );
  }

  if (selectedQuiz && showEducation) {
    return (
      <EducationContent
        quiz={selectedQuiz}
        onStartQuiz={() => setShowEducation(false)}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

  if (selectedQuiz && !showEducation) {
    return (
      <QuizComponent
        quiz={selectedQuiz}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

  return (
    <div className="space-y-8">
      <QuizList onSelectQuiz={(quiz) => {
        setSelectedQuiz(quiz);
        setShowEducation(true);
      }} />
    </div>
  );
}
