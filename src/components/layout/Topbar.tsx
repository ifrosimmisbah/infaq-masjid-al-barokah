"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Bell,
  CheckCircle,
  Clock,
  ChevronDown,
  User,
  Shield,
} from "lucide-react";
import { MOCK_NOTIFIKASI } from "@/data/mockData";
import { DemoBadge } from "@/components/ui/DemoBadge";

interface TopbarProps {
  onToggleSidebar: () => void;
  onOpenLogout: () => void;
}

const PAGE_TITLES: Record<string, { title: string; subtitle: string }> = {
  "/": {
    title: "Dashboard Utama",
    subtitle: "Ringkasan ikhtisar penerimaan, penyaluran, dan kas infaq",
  },
  "/donatur": {
    title: "Data Donatur",
    subtitle: "Daftar muhsinin dan muzakki yang berkontribusi",
  },
  "/penerimaan": {
    title: "Penerimaan Infaq",
    subtitle: "Pencatatan dan verifikasi kas masuk infaq & sedekah",
  },
  "/penyaluran": {
    title: "Penyaluran Infaq",
    subtitle: "Alokasi dana untuk program mustahik, dakwah, dan pembangunan",
  },
  "/laporan": {
    title: "Laporan Keuangan",
    subtitle: "Transparansi dan pembukuan arus kas periodik masjid",
  },
  "/pengguna": {
    title: "Manajemen Pengguna",
    subtitle: "Pengaturan hak akses pengurus DKM dan staf amil",
  },
  "/profil": {
    title: "Profil Pengguna & Lembaga",
    subtitle: "Informasi akun amil dan identitas resmi yayasan masjid",
  },
};

export function Topbar({ onToggleSidebar, onOpenLogout }: TopbarProps) {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFIKASI);

  const currentPage = PAGE_TITLES[pathname] || {
    title: "Sistem Manajemen Infaq",
    subtitle: "Masjid & Yayasan Al Barokah",
  };

  const unreadCount = notifications.filter((n) => !n.dibaca).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, dibaca: true })));
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-stone-200 px-4 md:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 text-slate-700 hover:text-emerald-900 rounded-xl hover:bg-stone-200/60 md:hidden transition-colors"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold text-emerald-950 font-serif">
                {currentPage.title}
              </h1>
              <span className="hidden sm:inline-block">
                <DemoBadge size="sm" />
              </span>
            </div>
            <p className="hidden sm:block text-xs text-stone-500">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Notifications, User Profile */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Notification Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              className="relative p-2.5 text-slate-600 hover:text-emerald-900 rounded-xl hover:bg-emerald-50/80 transition-colors border border-stone-200 bg-white shadow-xs"
              aria-label="Lihat Notifikasi"
            >
              <Bell className="w-4 h-4 text-emerald-800" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white shadow-xs ring-2 ring-white animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-stone-200 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between px-4 py-3 bg-emerald-900 text-white">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-300" />
                      <span className="text-xs font-bold">Pemberitahuan Sistem</span>
                      <DemoBadge size="sm" />
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] text-amber-200 hover:text-white underline"
                      >
                        Tandai semua dibaca
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-stone-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-stone-400">
                        Tidak ada pemberitahuan baru
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3.5 hover:bg-stone-50 transition-colors ${
                            !notif.dibaca ? "bg-amber-50/30" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-bold text-slate-800">
                              {notif.judul}
                            </h4>
                            <span className="text-[10px] text-stone-400 shrink-0 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {notif.waktu}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {notif.pesan}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 bg-stone-50 border-t border-stone-100 text-center">
                    <p className="text-[10px] text-stone-500">
                      Notifikasi diperbarui secara otomatis
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/40 shadow-xs transition-all text-left"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-amber-300 font-bold text-xs shadow-xs border border-amber-400/30">
                AD
              </div>

              <div className="hidden sm:block">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800">
                    Ustadz H. Ahmad
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
                  <Shield className="w-3 h-3 text-amber-500" />
                  <span>Ketua DKM</span>
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-stone-400 hidden sm:block" />
            </button>

            {/* Profile Menu Dropdown */}
            {showProfileMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowProfileMenu(false)}
                />
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-stone-200 z-20 py-1.5 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2.5 border-b border-stone-100">
                    <p className="text-xs font-bold text-slate-800">
                      Ustadz H. Ahmad Dahlan
                    </p>
                    <p className="text-[11px] text-stone-500">
                      ahmad.dahlan@albarokah.id
                    </p>
                    <div className="mt-1.5">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Amil Terverifikasi
                      </span>
                    </div>
                  </div>

                  <a
                    href="/profil"
                    className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-900 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4 text-emerald-700" />
                    Profil Amil
                  </a>

                  <div className="border-t border-stone-100 my-1" />

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onOpenLogout();
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <span className="w-4 h-4 flex items-center justify-center">
                      🚪
                    </span>
                    Keluar Sesi
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
