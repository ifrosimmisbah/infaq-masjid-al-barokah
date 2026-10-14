"use client";

import React, { useState } from "react";
import {
  User,
  Key,
  Building2,
  QrCode,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Save,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { DemoBadge, DemoNoticeBanner } from "@/components/ui/DemoBadge";

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<"profil" | "keamanan" | "lembaga">("profil");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    nama: "Ustadz H. Ahmad Dahlan",
    email: "ahmad.dahlan@albarokah.id",
    noHp: "0812-8899-1122",
    jabatan: "Ketua DKM & Penanggung Jawab Infaq",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      <DemoNoticeBanner />

      {/* Header */}
      <div className="pb-2 border-b border-stone-200">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-serif">
          Profil Pengurus & Lembaga
        </h2>
        <p className="text-xs text-stone-500 mt-0.5">
          Kelola profil identitas amil, keamanan kredensial, dan data legalitas Masjid Al Barokah.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>Perubahan profil berhasil disimpan ke sistem! (Simulasi DEMO)</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 shrink-0 shadow-lg">
            <div className="w-full h-full bg-[#043e30] rounded-[12px] flex items-center justify-center text-amber-300 text-2xl font-bold font-serif">
              AD
            </div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-lg md:text-xl font-bold text-white">
                {profileData.nama}
              </h3>
              <DemoBadge size="sm" />
            </div>
            <p className="text-xs text-emerald-200/90 font-medium">
              {profileData.jabatan}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2 text-xs text-emerald-300/80">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                {profileData.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                {profileData.noHp}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab("profil")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "profil"
              ? "bg-emerald-800 text-white shadow-xs"
              : "text-slate-600 hover:bg-stone-100"
          }`}
        >
          <User className="w-4 h-4" />
          Biodata Amil
        </button>
        <button
          onClick={() => setActiveTab("keamanan")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "keamanan"
              ? "bg-emerald-800 text-white shadow-xs"
              : "text-slate-600 hover:bg-stone-100"
          }`}
        >
          <Key className="w-4 h-4" />
          Kata Sandi & Keamanan
        </button>
        <button
          onClick={() => setActiveTab("lembaga")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "lembaga"
              ? "bg-emerald-800 text-white shadow-xs"
              : "text-slate-600 hover:bg-stone-100"
          }`}
        >
          <Building2 className="w-4 h-4" />
          Identitas Masjid & Rekening
        </button>
      </div>

      {/* Tab 1: Biodata Amil */}
      {activeTab === "profil" && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
            <h4 className="text-sm font-bold text-slate-800 pb-2 border-b border-stone-100">
              Ubah Data Pribadi
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Lengkap & Gelar
              </label>
              <input
                type="text"
                value={profileData.nama}
                onChange={(e) =>
                  setProfileData({ ...profileData, nama: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Email Login
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  value={profileData.noHp}
                  onChange={(e) =>
                    setProfileData({ ...profileData, noHp: e.target.value })
                  }
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jabatan DKM
                </label>
                <input
                  type="text"
                  disabled
                  value={profileData.jabatan}
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-100 border border-stone-200 rounded-xl text-stone-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Save className="w-4 h-4 text-amber-300" />
                Simpan Profil
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Keamanan */}
      {activeTab === "keamanan" && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
            <h4 className="text-sm font-bold text-slate-800 pb-2 border-b border-stone-100 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-700" />
              Perbarui Kata Sandi
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kata Sandi Lama
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.oldPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value,
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Kata Sandi Baru
                </label>
                <input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ulangi Kata Sandi Baru
                </label>
                <input
                  type="password"
                  placeholder="Ulangi kata sandi"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Key className="w-4 h-4 text-amber-300" />
                Perbarui Kata Sandi
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Identitas Masjid & Rekening */}
      {activeTab === "lembaga" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detail Masjid Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-800 pb-2 border-b border-stone-100 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-700" />
              Identitas Legal Lembaga
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-0.5">Nama Resmi</span>
                <span className="font-bold text-slate-800 text-sm">
                  Masjid & Yayasan Infaq Al Barokah
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-0.5">
                  Izin Operasional Lembaga Amil
                </span>
                <span className="font-mono font-semibold text-slate-700">
                  SK KEMENAG NO: 421/BAZNAS/X/2024
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  Alamat Sekretariat
                </span>
                <span className="text-slate-700">
                  Jl. Al Barokah No. 12, Kel. Barokah, Kec. Mulia, Kota Sejahtera 40123
                </span>
              </div>
            </div>
          </div>

          {/* Rekening & QRIS Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-800 pb-2 border-b border-stone-100 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-amber-600" />
              Kanal Penerimaan Resmi Infaq
            </h4>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">
                    Bank Syariah Indonesia (BSI)
                  </span>
                  <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                    712-3456-789
                  </p>
                  <p className="text-[11px] text-stone-500">
                    a.n. Yayasan Infaq Al Barokah
                  </p>
                </div>
                <CreditCard className="w-6 h-6 text-emerald-700" />
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-800">
                    QRIS Dinamis / Statis Masjid
                  </span>
                  <p className="font-bold text-slate-800 text-xs mt-0.5">
                    NMID: ID1020261014001
                  </p>
                  <p className="text-[11px] text-stone-500">
                    Tersedia di kotak infaq & brosur
                  </p>
                </div>
                <QrCode className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
