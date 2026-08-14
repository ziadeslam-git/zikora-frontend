"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Student {
  id: string;
  name: string;
  grade: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

const initialMockStudents: Student[] = Array.from({ length: 50 }, (_, i) => ({
  id: `STU-${2000 + i}`,
  name: `Student ${i + 1}`,
  grade: `Grade ${Math.floor(Math.random() * 12) + 1}`,
  status: i % 5 === 0 ? 'Inactive' : 'Active',
  joinedDate: new Date(2023, 8, Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
}));

export default function StudentsPage() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>(initialMockStudents);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    return students.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  }, [students, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleStatus = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStudents(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === 'Active' ? 'Inactive' : 'Active' } : t
    ));
  };

  const deleteStudent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(prev => prev.filter(t => t.id !== id));
      if (paginated.length === 1 && page > 1) {
        setPage(p => p - 1);
      }
    }
  };

  const handleRowClick = (id: string) => {
    router.push(`/admin/students/${id}`);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Students</h1>
      </div>

      <div className="bg-white dark:bg-bg-base rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-theme p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search students..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-bg-surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 text-gray-900 dark:text-white"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">ID</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Name</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Grade</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Joined Date</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((student) => (
                <tr 
                  key={student.id} 
                  onClick={() => handleRowClick(student.id)}
                  className="group hover:bg-gray-50/50 dark:hover:bg-bg-surface-2/30 transition-colors rounded-xl cursor-pointer"
                >
                  <td className="py-4 px-4 text-sm text-gray-500 font-medium rounded-l-2xl">{student.id}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-bg-surface-2 flex items-center justify-center font-bold text-gray-400">
                      {student.name.charAt(0)}
                    </div>
                    {student.name}
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">{student.grade}</td>
                  <td className="py-4 px-4">
                    <button 
                      onClick={(e) => toggleStatus(e, student.id)}
                      className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-bg-surface-2 transition-colors"
                      title="Click to toggle status"
                    >
                      <span className={`w-2 h-2 rounded-full ${student.status === 'Active' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{student.status}</span>
                    </button>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 font-medium">{student.joinedDate}</td>
                  <td className="py-4 px-4 text-right rounded-r-2xl">
                    <button 
                      onClick={(e) => deleteStudent(e, student.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
                      title="Delete Student"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 font-medium">No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pt-6 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900 dark:text-white">{(page - 1) * pageSize + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min(page * pageSize, filtered.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> results
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
