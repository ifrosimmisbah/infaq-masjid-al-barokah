"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  HandHeart,
  Send,
  FileBarChart,
  UserCheck,
  User,
  LogOut,
  X,
  Sparkles,
  Building2,
} from "lucide-react";
import { DemoBadge } from "@/components/ui/DemoBadge";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogout: () => void;
}

export const MENU_ITEMS = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Data Donatur",
    href: "/donatur",
    icon: Users,
  },
  {
    name: "Penerimaan Infaq",
    href: "/penerimaan",
    icon: HandHeart,
  },
  {
    name: "Penyaluran Infaq",
    href: "/penyaluran",
    icon: Send,
  },
  {
    name: "Laporan Keuangan",
    href: "/laporan",
    icon: FileBarChart,
  },
  {
    name: "Pengguna",
    href: "/pengguna",
    icon: UserCheck,
  },
  {
    name: "Profil",
    href: "/profil",
    icon: User,
  },
];

export function Sidebar({ isOpen, onClose, onOpenLogout }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-gradient-to-b from-[#032e23] via-[#043e30] to-[#02241b] text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-emerald-800/40 shadow-2xl md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-emerald-800/60 bg-emerald-950/40">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 group text-left"
          >
            {/* Mosque Logo Icon */}
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-md flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#043e30] rounded-[14px] flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-wide text-white font-serif">
                  Infaq Al Barokah
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-medium">
                Sistem Manajemen Infaq
              </p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-300 hover:text-white hover:bg-emerald-800/60 md:hidden transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Indicator Bar */}
        <div className="mx-4 mt-3 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-[11px] text-amber-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Mode Simulasi Frontend
          </span>
          <DemoBadge size="sm" />
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
            Menu Utama
          </p>

          {MENU_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? "bg-emerald-700/60 text-white font-semibold shadow-inner border border-emerald-500/30"
                    : "text-emerald-100/80 hover:bg-emerald-800/40 hover:text-white"
                }`}
              >
                {/* Active Gold Indicator Bar */}
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-amber-300 to-amber-500 rounded-r-full shadow-sm" />
                )}

                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive
                      ? "text-amber-400"
                      : "text-emerald-300/70 group-hover:text-amber-300"
                  }`}
                />
                <span className="flex-1">{item.name}</span>

                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                )}
              </Link>
            );
          })}

          <div className="pt-4">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-emerald-400/80">
              Sesi Akun
            </p>
            {/* Logout Button */}
            <button
              onClick={() => {
                onClose();
                onOpenLogout();
              }}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-300/90 hover:bg-rose-950/40 hover:text-rose-200 border border-transparent hover:border-rose-800/30 transition-all text-left group"
            >
              <LogOut className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer: Mosque Info */}
        <div className="p-4 mx-3 mb-3 rounded-2xl bg-emerald-950/70 border border-emerald-800/50">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-800/80 flex items-center justify-center text-amber-400 text-xs font-bold border border-emerald-700">
              AB
            </div>
            <div className="overflow-hidden">
              <h5 className="text-xs font-bold text-white truncate">
                Masjid Al Barokah
              </h5>
              <p className="text-[10px] text-emerald-300/80 truncate">
                Kas Terverifikasi Dewan DKM
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-emerald-900 text-[10px] text-emerald-400">
            <span>Status Sistem</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Aktif (Online)
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
