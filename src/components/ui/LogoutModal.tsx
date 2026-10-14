"use client";

import React, { useState } from "react";
import { LogOut, AlertCircle, CheckCircle2 } from "lucide-react";
import { Modal } from "./Modal";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    setIsLoggedOut(true);
    setTimeout(() => {
      setIsLoggedOut(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Konfirmasi Keluar Sistem"
      maxWidth="md"
    >
      {isLoggedOut ? (
        <div className="py-6 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-800 text-base">Berhasil Keluar</h4>
          <p className="text-xs text-slate-500">
            Jazakumullah Khairan atas dedikasi pengelolaan infaq hari ini.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Perhatian</p>
              <p className="text-amber-700 mt-0.5">
                Pastikan seluruh pencatatan transaksi infaq dan penyaluran telah tersimpan sebelum keluar.
              </p>
            </div>
          </div>

          <p className="text-sm text-slate-600">
            Apakah Anda yakin ingin mengakhiri sesi kerja amil saat ini?
          </p>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Ya, Keluar Akun
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
