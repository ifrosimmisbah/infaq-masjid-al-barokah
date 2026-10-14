import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  rows?: number;
}

export function LoadingState({
  message = "Memuat data infaq...",
  rows = 5,
}: LoadingStateProps) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-xs">
      <div className="flex items-center gap-3 text-emerald-800 text-xs font-semibold animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
        <span>{message}</span>
      </div>
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 py-3 border-b border-stone-100 last:border-0"
          >
            <div className="w-10 h-10 rounded-xl bg-stone-100 animate-pulse shrink-0" />
            <div className="flex-1 space-y-2">
              <div
                className="h-3.5 bg-stone-200 rounded animate-pulse"
                style={{ width: `${Math.max(35, (idx * 27) % 75 + 25)}%` }}
              />
              <div className="h-2.5 w-1/3 bg-stone-100 rounded animate-pulse" />
            </div>
            <div className="w-24 h-4 bg-stone-100 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
