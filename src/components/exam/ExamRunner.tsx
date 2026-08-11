"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { ExamIntro } from "@/components/exam/ExamIntro";
import { ExamTimer } from "@/components/exam/ExamTimer";
import { QuestionCard, type OptionItem } from "@/components/exam/QuestionCard";
import { QuestionNavigator } from "@/components/exam/QuestionNavigator";
import { SubmitConfirmModal } from "@/components/exam/SubmitConfirmModal";
import { ExamResults, type ExamResultQuestionItem } from "@/components/exam/ExamResults";
import { Button } from "@/components/ui/Button";

export interface ExamQuestion {
  id: string;
  orderNumber: number;
  text: string;
  questionType?: "mcq" | "true_false";
  options: OptionItem[];
  correctOptionId: string;
  marks: number;
  explanation: string;
}

export interface ExamRunnerProps {
  examId: string;
  title?: string;
  durationMinutes?: number;
  attemptsRemaining?: number;
  courseId?: string;
}

const sampleQuestions: ExamQuestion[] = [
  {
    id: "q1",
    orderNumber: 1,
    text: "ما هو الأنود (القطب الموجب) في الخلية الجلفانية القياسية؟",
    questionType: "mcq",
    options: [
      { id: "opt-1a", text: "القطب الذي تحدث عنده عملية الأكسدة" },
      { id: "opt-1b", text: "القطب الذي تحدث عنده عملية الاختزال" },
      { id: "opt-1c", text: "القطب الموصل للتيار الخارجي فقط" },
      { id: "opt-1d", text: "المحلول الإلكتروليتي المساعد" },
    ],
    correctOptionId: "opt-1a",
    marks: 5,
    explanation: "في الخلايا الجلفانية، الأنود هو القطب السالب مصدر الإلكترونات وتحدث عنده دائماً عملية الأكسدة (فقد إلكترونات).",
  },
  {
    id: "q2",
    orderNumber: 2,
    text: "تزداد التوصيلية الكهربية للمحلول الإلكتروليتي بزيادة تركيز الأيونات الحرة الحركة.",
    questionType: "true_false",
    options: [
      { id: "opt-2t", text: "صح" },
      { id: "opt-2f", text: "خطأ" },
    ],
    correctOptionId: "opt-2t",
    marks: 5,
    explanation: "صحيح، لأن التوصيل الكهربي في الإلكتروليتات يعتمد على حركة الأيونات الحرة أو المماهة بين القطبين.",
  },
  {
    id: "q3",
    orderNumber: 3,
    text: "أي من المركبات التالية يعتبر هيدروكربوناً أروماتياً غير مشبع؟",
    questionType: "mcq",
    options: [
      { id: "opt-3a", text: "البنزين العطري (C6H6)" },
      { id: "opt-3b", text: "الهكسان الحلقي (C6H12)" },
      { id: "opt-3c", text: "الإيثانول (C2H5OH)" },
      { id: "opt-3d", text: "الميثان (CH4)" },
    ],
    correctOptionId: "opt-3a",
    marks: 5,
    explanation: "البنزين العطري (C6H6) هو أشهر نموذج للهيدروكربونات الأروماتية غير المشبعة المحتوية على روابط باي متبادلة.",
  },
  {
    id: "q4",
    orderNumber: 4,
    text: "قانون فاراداي الأول ينص على أن كمية المادة المتكونة عند القطب تتناسب طردياً مع كمية الكهربية.",
    questionType: "true_false",
    options: [
      { id: "opt-4t", text: "صح" },
      { id: "opt-4f", text: "خطأ" },
    ],
    correctOptionId: "opt-4t",
    marks: 5,
    explanation: "صحيح، تتناسب كتلة المادة المترسبة أو المستهلكة طردياً مع كمية الكهربية المارة في الإلكتروليت (m = Z * Q).",
  },
  {
    id: "q5",
    orderNumber: 5,
    text: "عند أكسدة الكحولات الأولية أكسدة تامة ينتج:",
    questionType: "mcq",
    options: [
      { id: "opt-5a", text: "حمض كاربوكسيلي" },
      { id: "opt-5b", text: "كيتون" },
      { id: "opt-5c", text: "إيثر" },
      { id: "opt-5d", text: "ألكان مشبع" },
    ],
    correctOptionId: "opt-5a",
    marks: 5,
    explanation: "الأكسدة التامة للكحول الأولي تمر بمرحلة الألدهيد ثم تنتج الحمض الكاربوكسيلي المناظر.",
  },
  {
    id: "q6",
    orderNumber: 6,
    text: "ما الصيغة العامة للألكانات غير الحلقية المشبعة؟",
    questionType: "mcq",
    options: [
      { id: "opt-6a", text: "C n H 2n+2" },
      { id: "opt-6b", text: "C n H 2n" },
      { id: "opt-6c", text: "C n H 2n-2" },
      { id: "opt-6d", text: "C n H n" },
    ],
    correctOptionId: "opt-6a",
    marks: 5,
    explanation: "الألكانات السلسليّة المشبعة تخضع للصيغة العامة C n H 2n+2 حيث تكون جميع الروابط أحادية من نوع سيجما القوية.",
  },
  {
    id: "q7",
    orderNumber: 7,
    text: "تعتبر الخلية التحليلية خلية مفرغة تحول الطاقة الكيميائية إلى طاقة كهربية.",
    questionType: "true_false",
    options: [
      { id: "opt-7t", text: "صح" },
      { id: "opt-7f", text: "خطأ" },
    ],
    correctOptionId: "opt-7f",
    marks: 5,
    explanation: "خطأ، الخلية التحليلية تحول الطاقة الكهربية إلى طاقة كيميائية (تفاعل غير تلقائي)، بينما الجلفانية هي التي تحول الكيميائية لكهربية.",
  },
  {
    id: "q8",
    orderNumber: 8,
    text: "ما هو الغاز الناتج عند تفاعل الصوديوم مع الكحولات؟",
    questionType: "mcq",
    options: [
      { id: "opt-8a", text: "غاز الهيدروجين (H2)" },
      { id: "opt-8b", text: "غاز ثاني أكسيد الكربون (CO2)" },
      { id: "opt-8c", text: "غاز الأوكسجين (O2)" },
      { id: "opt-8d", text: "غاز النيتروجين (N2)" },
    ],
    correctOptionId: "opt-8a",
    marks: 5,
    explanation: "يتفاعل فلز الصوديوم النشط مع الكحولات بحلوله محل هيدروجين مجموعة الهيدروكسيل الحامضية ويتصاعد غاز الهيدروجين المشتعل.",
  },
];

export function ExamRunner({
  title = "امتحان الشامل على الباب الرابع (الكيمياء الكهربية والعضوية)",
  durationMinutes = 15,
  attemptsRemaining = 2,
  courseId = "chemistry-organic",
}: ExamRunnerProps) {
  const [screen, setScreen] = useState<"intro" | "taking" | "results">("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [secondsRemaining, setSecondsRemaining] = useState(durationMinutes * 60);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const totalQuestions = sampleQuestions.length;
  const totalMarks = sampleQuestions.reduce((acc, q) => acc + q.marks, 0);

  // Submit Logic
  const handleSubmitExam = useCallback(() => {
    setIsConfirmModalOpen(false);
    setScreen("results");
  }, []);

  // Timer Interval Effect (Runs only when in taking screen)
  useEffect(() => {
    if (screen !== "taking") return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam(); // Auto-submit when timer reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screen, handleSubmitExam]);

  const handleStartExam = () => {
    setScreen("taking");
    setSecondsRemaining(durationMinutes * 60);
    setCurrentIndex(0);
    setAnswers({});
  };

  const handleSelectAnswer = (optionId: string) => {
    const currentQ = sampleQuestions[currentIndex];
    if (!currentQ) return;
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Check for unanswered questions
      const unansweredCount = sampleQuestions.filter((q) => !answers[q.id]).length;
      if (unansweredCount > 0) {
        setIsConfirmModalOpen(true);
      } else {
        handleSubmitExam();
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Compute calculated score for Results screen
  const computedScore = sampleQuestions.reduce((acc, q) => {
    if (answers[q.id] === q.correctOptionId) {
      return acc + q.marks;
    }
    return acc;
  }, 0);

  // Map result questions for Results component
  const resultQuestions: ExamResultQuestionItem[] = sampleQuestions.map((q) => ({
    id: q.id,
    orderNumber: q.orderNumber,
    text: q.text,
    options: q.options,
    correctOptionId: q.correctOptionId,
    selectedOptionId: answers[q.id],
    explanation: q.explanation,
  }));

  const activeQuestion = sampleQuestions[currentIndex] ?? sampleQuestions[0];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const unansweredCount = sampleQuestions.filter((q) => !answers[q.id]).length;

  return (
    <div className="min-h-screen bg-bg-base text-ink">
      {/* 1. INTRO SCREEN */}
      {screen === "intro" && (
        <div className="py-16 px-6 lg:px-8 max-w-[1280px] mx-auto">
          <ExamIntro
            title={title}
            totalQuestions={totalQuestions}
            durationMinutes={durationMinutes}
            totalMarks={totalMarks}
            attemptsRemaining={attemptsRemaining}
            onStartExam={handleStartExam}
          />
        </div>
      )}

      {/* 2. TAKING SCREEN (Fixed Full-Screen Overlay Focus Mode hiding Header/Footer) */}
      {screen === "taking" && activeQuestion && (
        <div className="fixed inset-0 z-50 bg-bg-base overflow-y-auto flex flex-col justify-between p-6 sm:p-8 select-none">
          {/* Top Sticky Header with Progress Bar & Timer */}
          <div className="max-w-2xl mx-auto w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-ink">
                سؤال {currentIndex + 1} من {totalQuestions}
              </span>
              <ExamTimer secondsRemaining={secondsRemaining} />
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-bg-surface-2 rounded-full h-2 overflow-hidden">
              <div
                className="bg-accent-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>

            {/* Question Navigator Row */}
            <QuestionNavigator
              totalQuestions={totalQuestions}
              currentIndex={currentIndex}
              answers={answers}
              questionIds={sampleQuestions.map((q) => q.id)}
              onJumpToQuestion={(idx) => setCurrentIndex(idx)}
            />
          </div>

          {/* Center Question Card */}
          <main className="my-auto py-6 w-full">
            <QuestionCard
              questionNumber={activeQuestion.orderNumber}
              totalQuestions={totalQuestions}
              text={activeQuestion.text}
              options={activeQuestion.options}
              questionType={activeQuestion.questionType}
              selectedOptionId={answers[activeQuestion.id]}
              onSelectAnswer={handleSelectAnswer}
            />
          </main>

          {/* Bottom Navigation Buttons */}
          <div className="max-w-2xl mx-auto w-full flex items-center justify-between gap-4 pt-4 border-t border-border-theme">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={currentIndex === 0}
              onClick={handlePrevQuestion}
              className="gap-2"
            >
              <ArrowRight className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
              <span>السابق</span>
            </Button>

            {isLastQuestion ? (
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={handleNextQuestion}
                className="gap-2 font-bold shadow-md"
              >
                <span>إنهاء الامتحان</span>
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleNextQuestion}
                className="gap-2 font-bold"
              >
                <span>السؤال التالي</span>
                <ArrowLeft className="h-4 w-4 rtl:rotate-0 ltr:rotate-180" />
              </Button>
            )}
          </div>

          {/* Confirmation Modal */}
          <SubmitConfirmModal
            isOpen={isConfirmModalOpen}
            unansweredCount={unansweredCount}
            onCancel={() => setIsConfirmModalOpen(false)}
            onConfirm={handleSubmitExam}
          />
        </div>
      )}

      {/* 3. RESULTS SCREEN */}
      {screen === "results" && (
        <div className="py-12 px-6 lg:px-8 max-w-[1280px] mx-auto">
          <ExamResults
            examTitle={title}
            score={computedScore}
            totalMarks={totalMarks}
            questions={resultQuestions}
            courseId={courseId}
          />
        </div>
      )}
    </div>
  );
}
