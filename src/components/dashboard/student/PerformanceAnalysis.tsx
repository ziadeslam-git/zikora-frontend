"use client";

import { useMemo, useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useResolvedThemeColor } from "@/hooks/useResolvedThemeColor";
import { cn } from "@/lib/utils";

interface ExamScoreData {
  name: string; // e.g. "امتحان 1"
  score: number;
  classAverage: number;
}

interface SubjectAccuracy {
  subject: string;
  accuracy: number;
}

interface PerformanceAnalysisProps {
  examScores: ExamScoreData[];
  subjectsAccuracy: SubjectAccuracy[];
}

export function PerformanceAnalysis({ examScores, subjectsAccuracy }: PerformanceAnalysisProps) {
  const accentColor = useResolvedThemeColor("--color-accent-500", "#5B4FE0");
  const secondaryColor = useResolvedThemeColor("--color-text-secondary", "#9ca3af");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Compute insight from exam scores (compare last 3 vs all previous)
  const insight = useMemo(() => {
    if (examScores.length < 4) return { text: "استمر في أداء الامتحانات لتقييم أدائك", type: "neutral" };
    
    const last3 = examScores.slice(-3);
    const previous = examScores.slice(0, -3);
    
    const last3Avg = last3.reduce((acc, curr) => acc + curr.score, 0) / last3.length;
    const prevAvg = previous.reduce((acc, curr) => acc + curr.score, 0) / previous.length;
    
    if (last3Avg > prevAvg + 2) {
      return { text: "أداؤك بيتحسن 📈", type: "up" };
    } else if (last3Avg < prevAvg - 2) {
      return { text: "محتاج تركّز أكتر 📉", type: "down" };
    } else {
      return { text: "أداؤك مستقر ➖", type: "neutral" };
    }
  }, [examScores]);

  // Sort subjects from weakest to strongest
  const sortedSubjects = [...subjectsAccuracy].sort((a, b) => a.accuracy - b.accuracy);

  return (
    <div className="bg-bg-surface border border-border-theme rounded-2xl p-6 space-y-8">
      {/* Chart Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-ink text-lg">تحليل الأداء العام</h3>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-bg-surface-2 text-sm font-bold">
            {insight.type === "up" && <TrendingUp className="w-4 h-4 text-success" />}
            {insight.type === "down" && <TrendingDown className="w-4 h-4 text-danger" />}
            {insight.type === "neutral" && <Minus className="w-4 h-4 text-text-secondary" />}
            <span className={cn(
              insight.type === "up" && "text-success",
              insight.type === "down" && "text-danger",
              insight.type === "neutral" && "text-text-secondary"
            )}>
              {insight.text}
            </span>
          </div>
        </div>

        <div className="h-64 w-full pt-4" dir="ltr">
          {/* We ensure it renders only on client to avoid hydration mismatch with recharts */}
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={examScores} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={secondaryColor} opacity={0.2} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: secondaryColor, fontSize: 12, fontFamily: 'var(--font-latin)' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: secondaryColor, fontSize: 12, fontFamily: 'var(--font-latin)' }} 
                  domain={[0, 100]}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-base)', borderColor: 'var(--border-theme)', borderRadius: '12px' }}
                  itemStyle={{ fontFamily: 'var(--font-latin)', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  name="درجتك" 
                  stroke={accentColor} 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg-base)' }}
                  activeDot={{ r: 6, fill: accentColor }}
                />
                <Line 
                  type="monotone" 
                  dataKey="classAverage" 
                  name="متوسط الفصل" 
                  stroke={secondaryColor} 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="flex items-center justify-center gap-6 text-xs text-text-secondary">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-accent-500" />
            <span>درجتك</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0 border-t-2 border-dashed border-text-secondary" />
            <span>متوسط الفصل</span>
          </div>
        </div>
      </div>

      <hr className="border-border-theme" />

      {/* Weaknesses Section */}
      <div className="space-y-4">
        <h3 className="font-bold text-ink text-sm">نقاط الضعف حسب المادة</h3>
        <div className="space-y-3">
          {sortedSubjects.map((sub, idx) => {
            const isWeakest = idx === 0;
            const isStrongest = idx === sortedSubjects.length - 1 && sortedSubjects.length > 1;
            
            return (
              <div key={sub.subject} className="flex items-center gap-3">
                <span className={cn(
                  "w-20 text-xs font-bold truncate",
                  isWeakest ? "text-danger" : isStrongest ? "text-success" : "text-text-secondary"
                )}>
                  {sub.subject}
                </span>
                <div className="flex-1 h-2 rounded-full bg-bg-surface-2 overflow-hidden" dir="ltr">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      isWeakest ? "bg-danger" : isStrongest ? "bg-success" : "bg-text-secondary opacity-50"
                    )}
                    style={{ width: `${sub.accuracy}%` }}
                  />
                </div>
                <span className={cn(
                  "w-8 text-end text-xs font-bold font-latin",
                  isWeakest ? "text-danger" : isStrongest ? "text-success" : "text-text-secondary"
                )}>
                  {sub.accuracy}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
