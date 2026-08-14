import { AlertCircle, HelpCircle } from "lucide-react";

interface LectureStats {
  id: string;
  title: string;
  completionRate: number;
}

interface QuestionStats {
  id: string;
  text: string;
  wrongAnswerRate: number;
}

interface ContentPerformanceWidgetProps {
  lectures: LectureStats[];
  questions: QuestionStats[];
}

export function ContentPerformanceWidget({ lectures, questions }: ContentPerformanceWidgetProps) {
  // Filter questions with > 70% wrong answer rate
  const hardQuestions = questions.filter(q => q.wrongAnswerRate > 70).sort((a, b) => b.wrongAnswerRate - a.wrongAnswerRate).slice(0, 4);
  
  // Sort lectures by lowest completion rate and take bottom 4
  const weakLectures = [...lectures].sort((a, b) => a.completionRate - b.completionRate).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Weak Lectures */}
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-ink text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-warning" />
          محاضرات محتاجة مراجعة
        </h3>
        
        {weakLectures.length === 0 ? (
          <p className="text-xs text-text-secondary text-center py-2">لا توجد محاضرات ذات تفاعل ضعيف</p>
        ) : (
          <div className="space-y-3">
            {weakLectures.map(lecture => (
              <div key={lecture.id} className="flex items-start justify-between gap-3 text-xs">
                <span className={`font-bold truncate ${lecture.completionRate < 50 ? 'text-danger' : 'text-ink'}`}>
                  {lecture.title}
                </span>
                <span className="font-latin text-text-secondary shrink-0">{lecture.completionRate}% فقط خلّصوها</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hard Questions */}
      <div className="bg-bg-surface border border-border-theme rounded-2xl p-5 space-y-4">
        <h3 className="font-bold text-ink text-sm flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-danger" />
          أسئلة صعبة بشكل غير متوقع
        </h3>
        
        {hardQuestions.length === 0 ? (
          <p className="text-xs text-text-secondary text-center py-2">لا توجد أسئلة بمعدل خطأ يتجاوز 70%</p>
        ) : (
          <div className="space-y-3">
            {hardQuestions.map(q => (
              <div key={q.id} className="space-y-1">
                <p className="text-xs text-ink line-clamp-2 leading-relaxed">
                  "{q.text}"
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-danger font-bold">نسبة الخطأ عالية جداً</span>
                  <span className="font-latin font-bold text-danger">{q.wrongAnswerRate}%</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
