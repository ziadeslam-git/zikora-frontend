import { Badge } from "@/components/ui/Badge";

interface AboutTabProps {
  bio: string;
  subjects: string[];
}

export function AboutTab({ bio, subjects }: AboutTabProps) {
  return (
    <div className="space-y-8 max-w-3xl">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-ink">نبذة تعريفية</h3>
        <p className="text-ink leading-relaxed whitespace-pre-wrap">{bio}</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-ink">المواد التي يدرسها</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <Badge key={subject} variant="default" className="text-sm bg-bg-surface-2 border-border-theme text-ink font-medium px-4 py-1.5 rounded-full">
              {subject}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
