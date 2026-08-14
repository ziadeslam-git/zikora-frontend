import React from "react";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[calc(100vh-2rem)] rounded-[2rem] bg-bg-surface-2 p-6 flex gap-8 shadow-sm">
      <AdminSidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <AdminNavbar />
        <main className="flex-1 mt-8">{children}</main>
      </div>
    </div>
  );
}
