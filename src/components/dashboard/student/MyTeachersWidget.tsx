import Link from "next/link";
import { Users } from "lucide-react";

interface Teacher {
  id: string;
  slug: string;
  name: string;
  subject: string;
}

interface MyTeachersWidgetProps {
  teachers: Teacher[];
}

export function MyTeachersWidget({ teachers }: MyTeachersWidgetProps) {
  if (!teachers || teachers.length === 0) return null;

  return (
    <div className="bg-bg-surface border border-border-theme rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-ink flex items-center gap-2 text-sm">
          <Users className="w-4 h-4 text-accent-500" />
          مدرسيني
        </h3>
      </div>

      <div className="space-y-2">
        {teachers.map((teacher) => (
          <Link
            key={teacher.id}
            href={`/teachers/${teacher.slug}`}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-bg-surface-2 transition-colors border border-transparent hover:border-border-theme"
          >
            <div className="w-10 h-10 rounded-full bg-accent-blob/30 text-accent-text font-bold flex items-center justify-center shrink-0">
              {teacher.name.substring(0, 1)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-ink truncate">{teacher.name}</h4>
              <p className="text-xs text-text-secondary truncate">{teacher.subject}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
