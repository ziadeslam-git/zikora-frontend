import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasEnoughContrast } from "@/lib/contrast";
import { ProfileHero } from "@/components/teacher-profile/ProfileHero";
import { StatsBar } from "@/components/teacher-profile/StatsBar";
import { ProfileTabs } from "@/components/teacher-profile/ProfileTabs";
import { AboutTab } from "@/components/teacher-profile/AboutTab";
import { TeacherCoursesTab } from "@/components/teacher-profile/TeacherCoursesTab";
import { ReviewsTab } from "@/components/teacher-profile/ReviewsTab";
import { allCourses } from "@/lib/data/courses";

// ----------------------------------------------------------------------
// Mock Data (To be replaced by real API calls in backend integration)
// ----------------------------------------------------------------------

interface TeacherProfile {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  bio: string;
  brandColor: string;
  isVerified: boolean;
  whatsappNumber?: string;
  telegramLink?: string;
  stats: {
    studentsCount: number;
    experienceYears: number;
    averageRating: number;
  };
  subjects: string[];
}

const mockTeachers: Record<string, TeacherProfile> = {
  "sameh-ibrahim": {
    id: "t1",
    slug: "sameh-ibrahim",
    name: "أ. سامح إبراهيم",
    specialty: "أستاذ الكيمياء للثانوية العامة",
    bio: "خبرة أكثر من 15 عاماً في تدريس مادة الكيمياء للثانوية العامة. متخصص في تبسيط الكيمياء العضوية والتحليلية بطرق مبتكرة تضمن الفهم العميق والاستيعاب الكامل للمنهج بعيداً عن الحفظ التلقيني.",
    // A distinct brand color to test the dynamic override (e.g., Teal)
    brandColor: "#0D9488", 
    isVerified: true,
    whatsappNumber: "201000000000",
    telegramLink: "https://t.me/sameh_chemistry",
    stats: {
      studentsCount: 15420,
      experienceYears: 15,
      averageRating: 4.8,
    },
    subjects: ["الكيمياء العضوية", "الكيمياء التحليلية", "أساسيات الكيمياء"],
  },
  "mohamed-abdelmaaboud": {
    id: "t2",
    slug: "mohamed-abdelmaaboud",
    name: "أ. محمد عبدالمعبود",
    specialty: "أستاذ الفيزياء",
    bio: "شرح مبسط وعميق لمادة الفيزياء، تدريب مستمر على أنماط أسئلة النظام الجديد.",
    // Deliberately poor contrast color (very light yellow) to test the fallback mechanism
    brandColor: "#FEF08A",
    isVerified: true,
    stats: {
      studentsCount: 8900,
      experienceYears: 12,
      averageRating: 4.9,
    },
    subjects: ["الفيزياء الكلاسيكية", "الفيزياء الحديثة"],
  },
};

interface TeacherPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TeacherPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const teacher = mockTeachers[resolvedParams.slug];
  
  if (!teacher) {
    return { title: "المدرس غير موجود — Zikora" };
  }

  return {
    title: `${teacher.name} — Zikora`,
    description: teacher.bio.substring(0, 160),
  };
}

export default async function TeacherProfilePage({ params }: TeacherPageProps) {
  const resolvedParams = await params;
  const teacher = mockTeachers[resolvedParams.slug];

  if (!teacher) {
    notFound();
  }

  // Filter existing courses array to only show courses belonging to this teacher
  // In a real app, this would be an API call by teacher ID
  const teacherCourses = allCourses.filter((c) => c.teacherName === teacher.name);

  // Safely evaluate contrast against both Light and Dark backgrounds.
  // If the brand color doesn't have sufficient contrast on BOTH modes, we fall back to the default accent.
  const hasGoodContrastOnLight = hasEnoughContrast(teacher.brandColor, "#FFFFFF");
  const hasGoodContrastOnDark = hasEnoughContrast(teacher.brandColor, "#0A0A0A");
  
  // Only apply the custom brand color if it's accessible on both themes.
  const applyCustomColor = hasGoodContrastOnLight && hasGoodContrastOnDark;
  
  const customStyles = applyCustomColor
    ? { 
        "--color-accent-500": teacher.brandColor,
        "--color-accent-text": teacher.brandColor, 
      } as React.CSSProperties
    : {};

  return (
    <div style={customStyles}>
      <ProfileHero
        name={teacher.name}
        specialty={teacher.specialty}
        avatarLetter={teacher.name.substring(0, 1)}
        isVerified={teacher.isVerified}
        whatsappNumber={teacher.whatsappNumber}
        telegramLink={teacher.telegramLink}
      />

      <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-12 space-y-12">
        <StatsBar
          coursesCount={teacherCourses.length}
          studentsCount={teacher.stats.studentsCount}
          experienceYears={teacher.stats.experienceYears}
          averageRating={teacher.stats.averageRating}
        />

        <ProfileTabs
          aboutTabContent={<AboutTab bio={teacher.bio} subjects={teacher.subjects} />}
          coursesTabContent={<TeacherCoursesTab courses={teacherCourses} />}
          reviewsTabContent={<ReviewsTab />}
        />
      </div>
    </div>
  );
}
