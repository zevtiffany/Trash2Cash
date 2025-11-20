"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Quiz, Question } from "@/lib/mockData";
import { CheckCircle2, XCircle, SkipBack, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizComponentProps {
  quiz: Quiz;
  onBack: () => void;
}

export default function QuizComponent({ quiz, onBack }: QuizComponentProps) {
  const { completeQuiz } = useAppStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(quiz.questions.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const currentAnswer = selectedAnswers[currentQuestionIndex];
  const isAnswered = currentAnswer !== null;
  const isCorrect = isAnswered && currentAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (optionIndex: number) => {
    if (!showExplanation) {
      const newAnswers = [...selectedAnswers];
      newAnswers[currentQuestionIndex] = optionIndex;
      setSelectedAnswers(newAnswers);
      setShowExplanation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
    }
  };

  const handleFinish = () => {
    const score = selectedAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer
    ).length;
    completeQuiz(quiz.id, score, quiz.questions.length);
    onBack();
  };

  if (showResult) {
    const score = selectedAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correctAnswer
    ).length;
    const percentage = Math.round((score / quiz.questions.length) * 100);
    const pointsEarned = score * quiz.pointsPerQuestion;

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {percentage >= 70 ? (
              <>
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-2xl md:text-3xl font-bold text-emerald-600 mb-2">
                  Luar Biasa!
                </h1>
                <p className="text-gray-600 mb-6">
                  Kamu telah menyelesaikan kuis dengan baik
                </p>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">📚</div>
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
                  Bagus Sekali!
                </h1>
                <p className="text-gray-600 mb-6">
                  Terus belajar untuk meningkatkan pengetahuanmu
                </p>
              </>
            )}

            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 mb-6">
              <div className="text-5xl font-bold text-emerald-600 mb-2">
                {percentage}%
              </div>
              <p className="text-gray-600 mb-4">
                {score} dari {quiz.questions.length} jawaban benar
              </p>
              <div className="bg-emerald-100 rounded-lg p-4">
                <p className="text-sm text-gray-700 mb-1">Poin yang Diperoleh</p>
                <p className="text-3xl font-bold text-emerald-600">
                  +{pointsEarned}
                </p>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mb-2"
            >
              Selesai
            </button>
            <button
              onClick={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswers(new Array(quiz.questions.length).fill(null));
                setShowExplanation(false);
                setShowResult(false);
              }}
              className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Ulang Kuis
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
          >
            <SkipBack className="w-5 h-5" />
            Kembali
          </button>
          <div className="text-sm font-semibold text-gray-600">
            Soal {currentQuestionIndex + 1} dari {quiz.questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6 bg-white rounded-lg p-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          {/* Question */}
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer === index;
              const isCorrectOption = index === currentQuestion.correctAnswer;
              const showCorrect =
                showExplanation && isCorrectOption && !isSelected;
              const showWrong = showExplanation && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showExplanation}
                  className={cn(
                    "w-full p-4 rounded-lg border-2 text-left transition-all text-sm md:text-base",
                    isSelected
                      ? isCorrect
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-red-500 bg-red-50"
                      : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50",
                    showCorrect && "border-emerald-500 bg-emerald-50",
                    showWrong && "border-red-500 bg-red-50",
                    showExplanation && "cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                        isSelected
                          ? isCorrect
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-red-500 bg-red-500"
                          : "border-gray-300",
                        showCorrect && "border-emerald-500 bg-emerald-500",
                        showWrong && "border-red-500 bg-red-500"
                      )}
                    >
                      {isSelected && (
                        <span className="text-white font-bold">
                          {isCorrect ? "✓" : "✗"}
                        </span>
                      )}
                      {showCorrect && (
                        <span className="text-white font-bold">✓</span>
                      )}
                    </div>
                    <span
                      className={
                        isSelected || showCorrect || showWrong
                          ? "font-semibold"
                          : ""
                      }
                    >
                      {option}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div
              className={cn(
                "p-4 rounded-lg border-l-4 mb-6",
                isCorrect
                  ? "bg-emerald-50 border-emerald-500"
                  : "bg-blue-50 border-blue-500"
              )}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-semibold text-sm mb-2">
                    {isCorrect ? "Jawaban Benar! 🎉" : "Jawaban Kurang Tepat"}
                  </p>
                  <p className="text-sm text-gray-700">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex-1 py-3 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Sebelumnya
            </button>
            <button
              onClick={handleNext}
              disabled={!showExplanation}
              className="flex-1 py-3 px-4 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex === quiz.questions.length - 1
                ? "Lihat Hasil"
                : "Selanjutnya →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
