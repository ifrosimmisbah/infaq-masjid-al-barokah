import React from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "Terjadi Kendala Memuat Data",
  message = "Gagal menyinkronkan data dengan sistem. Silakan periksa koneksi atau coba beberapa saat lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-rose-50/50 rounded-2xl border border-rose-200">
      <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-bold text-rose-900 mb-1">{title}</h3>
      <p className="text-xs text-rose-700/80 max-w-sm mb-4 leading-relaxed">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Muat Ulang
        </button>
      )}
    </div>
  );
}
