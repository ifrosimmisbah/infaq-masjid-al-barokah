import React from "react";

interface DemoBadgeProps {
  className?: string;
  size?: "sm" | "md";
}

export function DemoBadge({ className = "", size = "sm" }: DemoBadgeProps) {
  const sizeClasses = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";
  return (
    <span
      className={`inline-flex items-center font-bold tracking-wider uppercase rounded-full bg-amber-100 text-amber-800 border border-amber-300 shadow-xs ${sizeClasses} ${className}`}
      title="Data ini merupakan contoh tampilan (DEMO) dan bukan transaksi riil"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1 animate-pulse" />
      DEMO
    </span>
  );
}

export function DemoNoticeBanner() {
  return (
    <div className="bg-amber-50/90 border-l-4 border-amber-500 p-3 rounded-r-lg shadow-xs flex items-center justify-between text-xs text-amber-900 mb-6">
      <div className="flex items-center gap-2">
        <span className="font-semibold px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded text-[10px] uppercase">
          Mode Pratinjau
        </span>
        <span>
          Data yang ditampilkan berlabel <strong>DEMO</strong> sebagai visualisasi tampilan. Tidak terhubung dengan transaksi riil masjid.
        </span>
      </div>
      <DemoBadge size="sm" />
    </div>
  );
}
