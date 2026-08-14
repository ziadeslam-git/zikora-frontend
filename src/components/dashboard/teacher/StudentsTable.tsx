"use client";

import { useState, useMemo } from "react";
import { Search, ChevronUp, ChevronDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { StudentDetailDrawer, StudentDetail } from "./StudentDetailDrawer";

export interface StudentRow extends StudentDetail {
  courseName: string;
}

interface StudentsTableProps {
  students: StudentRow[];
  hasMultipleCourses: boolean;
}

type SortField = "progress" | "averageGrade" | "lastActive";
type SortDirection = "asc" | "desc";

function parseLastActiveDays(lastActive: string): number {
  if (lastActive.includes("يومين")) return 2;
  if (lastActive.includes("أسبوعين")) return 14;
  if (lastActive.includes("شهر")) return 30;
  return parseInt(lastActive.replace(/\D/g, "")) || 0; // fallback
}

function computeStatus(student: StudentRow): "completed" | "at-risk" | "active" {
  const daysInactive = parseLastActiveDays(student.lastActive);
  if (student.progress >= 100) return "completed";
  if (student.averageGrade < 60 || daysInactive > 14) return "at-risk";
  return "active";
}

export function StudentsTable({ students, hasMultipleCourses }: StudentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "at-risk" | "completed">("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [sortField, setSortField] = useState<SortField>("averageGrade");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const [selectedStudent, setSelectedStudent] = useState<StudentDetail | null>(null);

  // Compute unique courses for filter
  const uniqueCourses = useMemo(() => Array.from(new Set(students.map(s => s.courseName))), [students]);

  // Filter & Sort
  const filteredAndSorted = useMemo(() => {
    let result = students;

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(q));
    }

    // Status Filter
    if (statusFilter !== "all") {
      result = result.filter(s => {
        const st = computeStatus(s);
        return (statusFilter === "active" && st === "active") ||
               (statusFilter === "at-risk" && st === "at-risk") ||
               (statusFilter === "completed" && st === "completed");
      });
    }

    // Course Filter
    if (hasMultipleCourses && courseFilter !== "all") {
      result = result.filter(s => s.courseName === courseFilter);
    }

    // Sort
    result = [...result].sort((a, b) => {
      let aVal = 0;
      let bVal = 0;

      if (sortField === "progress") {
        aVal = a.progress;
        bVal = b.progress;
      } else if (sortField === "averageGrade") {
        aVal = a.averageGrade;
        bVal = b.averageGrade;
      } else if (sortField === "lastActive") {
        aVal = parseLastActiveDays(a.lastActive);
        bVal = parseLastActiveDays(b.lastActive);
      }

      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

    return result;
  }, [students, searchQuery, statusFilter, courseFilter, sortField, sortDirection, hasMultipleCourses]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc"); // Default to desc for new sorts (highest grade first, etc.)
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronDown className="w-3 h-3 opacity-20" />;
    return sortDirection === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  return (
    <>
      <div className="bg-bg-surface border border-border-theme rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
        {/* Controls Row */}
        <div className="p-4 border-b border-border-theme flex flex-col sm:flex-row gap-4 items-center bg-bg-surface-2/50">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-text-secondary" />
            <input 
              type="text" 
              placeholder="ابحث عن طالب..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-surface border border-border-theme rounded-lg ps-9 pe-4 py-2 text-sm focus:outline-none focus:border-accent-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-text-secondary hidden sm:block" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-bg-surface border border-border-theme rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-500 w-full sm:w-auto"
            >
              <option value="all">كل الحالات</option>
              <option value="active">نشط</option>
              <option value="at-risk">محتاج متابعة</option>
              <option value="completed">مكتمل</option>
            </select>
            
            {hasMultipleCourses && (
              <select 
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="bg-bg-surface border border-border-theme rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-500 w-full sm:w-auto"
              >
                <option value="all">كل الكورسات</option>
                {uniqueCourses.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-start border-collapse">
            <thead>
              <tr className="bg-bg-surface-2/30 border-b border-border-theme text-xs text-text-secondary">
                <th className="py-3 px-4 font-bold text-start">الطالب</th>
                {hasMultipleCourses && <th className="py-3 px-4 font-bold text-start">الكورس</th>}
                <th 
                  className="py-3 px-4 font-bold text-start cursor-pointer hover:text-ink transition-colors select-none"
                  onClick={() => handleSort("progress")}
                >
                  <div className="flex items-center gap-1">نسبة التقدم {renderSortIcon("progress")}</div>
                </th>
                <th 
                  className="py-3 px-4 font-bold text-start cursor-pointer hover:text-ink transition-colors select-none"
                  onClick={() => handleSort("averageGrade")}
                >
                  <div className="flex items-center gap-1">متوسط الدرجات {renderSortIcon("averageGrade")}</div>
                </th>
                <th 
                  className="py-3 px-4 font-bold text-start cursor-pointer hover:text-ink transition-colors select-none"
                  onClick={() => handleSort("lastActive")}
                >
                  <div className="flex items-center gap-1">آخر نشاط {renderSortIcon("lastActive")}</div>
                </th>
                <th className="py-3 px-4 font-bold text-start">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-theme text-sm">
              {filteredAndSorted.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-secondary">لا يوجد طلاب يطابقون الفلتر</td>
                </tr>
              ) : (
                filteredAndSorted.map(student => {
                  const status = computeStatus(student);
                  const daysInactive = parseLastActiveDays(student.lastActive);
                  
                  return (
                    <tr 
                      key={student.id} 
                      onClick={() => setSelectedStudent(student)}
                      className="hover:bg-bg-surface-2/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent-blob/30 text-accent-text flex items-center justify-center font-bold text-xs">
                            {student.avatarLetter}
                          </div>
                          <div>
                            <div className="font-bold text-ink truncate">{student.name}</div>
                            <div className="text-[10px] text-text-secondary">{student.gradeLevel}</div>
                          </div>
                        </div>
                      </td>
                      {hasMultipleCourses && (
                        <td className="py-3 px-4 text-text-secondary truncate max-w-[120px]">{student.courseName}</td>
                      )}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-border-theme rounded-full overflow-hidden" dir="ltr">
                            <div className="h-full bg-accent-500 rounded-full" style={{ width: `${student.progress}%` }} />
                          </div>
                          <span className="text-xs font-bold font-latin text-text-secondary">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant="default" 
                          className={`font-latin font-bold px-2 py-0.5 border-transparent ${
                            student.averageGrade >= 85 ? "bg-success/10 text-success" :
                            student.averageGrade >= 60 ? "bg-warning/10 text-warning" :
                            "bg-danger/10 text-danger"
                          }`}
                        >
                          {student.averageGrade}%
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs ${daysInactive > 14 ? "text-danger font-bold" : "text-text-secondary"}`}>
                          {student.lastActive}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {status === "completed" && <span className="text-xs font-bold text-success flex items-center gap-1">مكتمل ✓</span>}
                        {status === "active" && <span className="text-xs font-bold text-text-secondary">نشط</span>}
                        {status === "at-risk" && <span className="text-xs font-bold text-danger flex items-center gap-1">محتاج متابعة ⚠️</span>}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <StudentDetailDrawer 
        student={selectedStudent}
        isOpen={!!selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </>
  );
}
