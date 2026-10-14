"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { LogoutModal } from "@/components/ui/LogoutModal";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex text-slate-800 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenLogout={() => setLogoutModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:pl-72 min-w-0 transition-all">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenLogout={() => setLogoutModalOpen(true)}
        />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-4 md:px-8 py-5 border-t border-stone-200 bg-white/60 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© 2026 DKM Masjid & Yayasan Infaq Al Barokah. Amanah & Transparan.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-medium text-emerald-800">
              Sistem Manajemen Infaq v1.0
            </span>
          </div>
        </footer>
      </div>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
      />
    </div>
  );
}
