"use client";

import { useEffect, useState } from "react";
import { X, CheckCircle2, Circle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useResolvedThemeColor } from "@/hooks/useResolvedThemeColor";

export interface StudentDetail {
  id: string;
  name: string;
  gradeLevel: string;
  avatarLetter: string;
  progress: number;
  averageGrade: number;
  lastActive: string;
  examHistory: { name: string; score: number }[];
  lectureChecklist: { id: string; title: string; isCompleted: boolean }[];
}

interface StudentDetailDrawerProps {
  student: StudentDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentDetailDrawer({ student, isOpen, onClose }: StudentDetailDrawerProps) {
  const accentColor = useResolvedThemeColor("--color-accent-500", "#5B4FE0");
  const secondaryColor = useResolvedThemeColor("--color-text-secondary", "#9ca3af");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && student && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 end-0 z-50 w-full max-w-md bg-bg-base border-s border-border-theme shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border-theme">
              <h2 className="text-xl font-bold text-ink">تفاصيل الطالب</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-bg-surface-2 transition-colors text-text-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
              {/* Basic Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent-blob/30 text-accent-text flex items-center justify-center text-2xl font-bold">
                  {student.avatarLetter}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-ink">{student.name}</h3>
                  <p className="text-sm text-text-secondary">{student.gradeLevel}</p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-bg-surface border border-border-theme rounded-xl p-4 text-center">
                  <div className="text-xs text-text-secondary mb-1">التقدم</div>
                  <div className="text-xl font-bold font-latin text-ink">{student.progress}%</div>
                </div>
                <div className="bg-bg-surface border border-border-theme rounded-xl p-4 text-center">
                  <div className="text-xs text-text-secondary mb-1">متوسط الدرجات</div>
                  <div className="text-xl font-bold font-latin text-ink">{student.averageGrade}%</div>
                </div>
              </div>

              {/* Chart */}
              <div className="space-y-4">
                <h4 className="font-bold text-ink text-sm">تاريخ الدرجات</h4>
                <div className="h-48 w-full bg-bg-surface border border-border-theme rounded-xl p-4" dir="ltr">
                  {isMounted && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={student.examHistory}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: secondaryColor }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: secondaryColor }} domain={[0, 100]} />
                        <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
                        <Line type="monotone" dataKey="score" stroke={accentColor} strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-4">
                <h4 className="font-bold text-ink text-sm">حالة المحاضرات (للقراءة فقط)</h4>
                <div className="bg-bg-surface border border-border-theme rounded-xl p-4 space-y-3">
                  {student.lectureChecklist.map((lecture) => (
                    <div key={lecture.id} className="flex items-start gap-3">
                      {lecture.isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-border-theme shrink-0" />
                      )}
                      <span className={`text-sm ${lecture.isCompleted ? 'text-text-secondary' : 'text-ink'}`}>
                        {lecture.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border-theme bg-bg-surface">
              <Button variant="outline" className="w-full text-ink">
                تواصل مع ولي الأمر
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
