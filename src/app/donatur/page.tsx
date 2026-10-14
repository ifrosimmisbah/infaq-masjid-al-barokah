"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  Phone,
  Mail,
  Building,
  User,
  CheckCircle2,
  Eye,
} from "lucide-react";
import { MOCK_DONATUR, Donatur } from "@/data/mockData";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import { DemoBadge, DemoNoticeBanner } from "@/components/ui/DemoBadge";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function DonaturPage() {
  const [donaturList, setDonaturList] = useState<Donatur[]>(MOCK_DONATUR);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDonatur, setSelectedDonatur] = useState<Donatur | null>(null);

  // Simulation toggles for States requested in prompt
  const [simulatedState, setSimulatedState] = useState<"normal" | "loading" | "empty" | "error">("normal");

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    tipe: "Perorangan" as Donatur["tipe"],
    noHp: "",
    email: "",
    status: "Aktif" as Donatur["status"],
  });

  const filteredDonatur = donaturList.filter((d) => {
    const matchesSearch =
      d.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.noHp.includes(searchTerm) ||
      d.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "Semua" || d.tipe === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDonatur: Donatur = {
      id: `DON-${String(donaturList.length + 1).padStart(3, "0")}`,
      nama: formData.nama,
      tipe: formData.tipe,
      noHp: formData.noHp || "-",
      email: formData.email || "-",
      totalDonasi: 0,
      frekuensi: 0,
      terakhirDonasi: new Date().toISOString().split("T")[0],
      status: formData.status,
    };
    setDonaturList([newDonatur, ...donaturList]);
    setIsAddModalOpen(false);
    setFormData({
      nama: "",
      tipe: "Perorangan",
      noHp: "",
      email: "",
      status: "Aktif",
    });
  };

  return (
    <div className="space-y-6">
      <DemoNoticeBanner />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-serif">
            Data Donatur (Muhsinin)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Kelola data muzakki, donatur perorangan, lembaga mitra, dan hamba Allah.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick State Preview Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-[11px]">
            <span className="text-stone-400 px-2 font-medium">Uji Tampilan:</span>
            <button
              onClick={() => setSimulatedState("normal")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "normal"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSimulatedState("loading")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "loading"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Loading
            </button>
            <button
              onClick={() => setSimulatedState("empty")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "empty"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Empty
            </button>
            <button
              onClick={() => setSimulatedState("error")}
              className={`px-2 py-1 rounded-lg font-semibold ${
                simulatedState === "error"
                  ? "bg-white text-rose-800 shadow-2xs"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              Error
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all"
          >
            <UserPlus className="w-4 h-4 text-amber-300" />
            + Tambah Donatur
          </button>
        </div>
      </div>

      {/* State Renderings */}
      {simulatedState === "loading" && (
        <LoadingState message="Memuat basis data donatur Al Barokah..." rows={6} />
      )}

      {simulatedState === "error" && (
        <ErrorState
          title="Gagal Memuat Data Donatur"
          message="Terjadi kesalahan jaringan simulasi saat menghubungkan ke database donatur."
          onRetry={() => setSimulatedState("normal")}
        />
      )}

      {simulatedState === "empty" && (
        <EmptyState
          title="Belum Ada Data Donatur"
          description="Basis data donatur masih kosong. Silakan tambahkan donatur pertama Anda untuk mulai mencatat kontribusi infaq."
          icon={Users}
          actionText="Tambah Donatur Sekarang"
          onAction={() => {
            setSimulatedState("normal");
            setIsAddModalOpen(true);
          }}
        />
      )}

      {simulatedState === "normal" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari nama, nomor HP, email..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-colors"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs text-stone-500 font-medium">Tipe:</span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
              >
                <option value="Semua">Semua Tipe Donatur</option>
                <option value="Perorangan">Perorangan</option>
                <option value="Lembaga">Lembaga / Perusahaan</option>
                <option value="Hamba Allah">Hamba Allah (Anonim)</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-stone-200">
                    <th className="py-3.5 px-4 md:px-6">Donatur</th>
                    <th className="py-3.5 px-4">Kontak</th>
                    <th className="py-3.5 px-4">Total Donasi</th>
                    <th className="py-3.5 px-4">Frekuensi</th>
                    <th className="py-3.5 px-4">Terakhir Infaq</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredDonatur.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        Tidak ada donatur yang sesuai dengan pencarian &ldquo;{searchTerm}&rdquo;
                      </td>
                    </tr>
                  ) : (
                    filteredDonatur.map((donatur) => (
                      <tr
                        key={donatur.id}
                        className="hover:bg-amber-50/20 transition-colors"
                      >
                        {/* Name and Type */}
                        <td className="py-3.5 px-4 md:px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center font-bold text-xs">
                              {donatur.tipe === "Lembaga" ? (
                                <Building className="w-4 h-4 text-emerald-700" />
                              ) : (
                                <User className="w-4 h-4 text-emerald-700" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-slate-800">
                                  {donatur.nama}
                                </span>
                                <DemoBadge size="sm" />
                              </div>
                              <span className="text-[11px] text-stone-400 font-medium">
                                {donatur.tipe} • ID: {donatur.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Contacts */}
                        <td className="py-3.5 px-4">
                          <div className="space-y-0.5 text-[11px]">
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Phone className="w-3 h-3 text-stone-400" />
                              <span>{donatur.noHp}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-stone-400">
                              <Mail className="w-3 h-3" />
                              <span>{donatur.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* Total Donasi */}
                        <td className="py-3.5 px-4 font-bold text-emerald-800">
                          {formatRupiah(donatur.totalDonasi)}
                        </td>

                        {/* Frekuensi */}
                        <td className="py-3.5 px-4 text-slate-600">
                          <span className="font-semibold text-slate-800">
                            {donatur.frekuensi} kali
                          </span>
                        </td>

                        {/* Terakhir Donasi */}
                        <td className="py-3.5 px-4 text-stone-500">
                          {formatTanggal(donatur.terakhirDonasi)}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {donatur.status}
                          </span>
                        </td>

                        {/* Aksi */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setSelectedDonatur(donatur)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
                              title="Lihat Detail Donatur"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50/70 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Menampilkan {filteredDonatur.length} donatur</span>
              <span className="text-[11px] text-stone-400">
                Paginasi CRUD terintegrasi siap dihubungkan
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Donatur */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Tambah Donatur Baru"
        description="Daftarkan profil muhsinin/donatur baru ke dalam database infaq"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Donatur / Instansi *
            </label>
            <input
              type="text"
              required
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Contoh: H. Ahmad Subarjo / PT Sumber Makmur"
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tipe Donatur
              </label>
              <select
                value={formData.tipe}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipe: e.target.value as Donatur["tipe"],
                  })
                }
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Perorangan">Perorangan</option>
                <option value="Lembaga">Lembaga / Perusahaan</option>
                <option value="Hamba Allah">Hamba Allah (Anonim)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as Donatur["status"],
                  })
                }
                className="w-full text-xs px-3 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nomor Handphone / WhatsApp
              </label>
              <input
                type="text"
                value={formData.noHp}
                onChange={(e) =>
                  setFormData({ ...formData, noHp: e.target.value })
                }
                placeholder="0812-xxxx-xxxx"
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="donatur@example.com"
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-stone-100 rounded-xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Simpan Donatur
            </button>
          </div>
        </form>
      </Modal>

      {/* Detail Donatur Modal */}
      {selectedDonatur && (
        <Modal
          isOpen={!!selectedDonatur}
          onClose={() => setSelectedDonatur(null)}
          title={`Detail Donatur: ${selectedDonatur.nama}`}
          description={`ID: ${selectedDonatur.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-emerald-800 text-[11px] font-semibold uppercase">
                  Akumulasi Infaq
                </span>
                <p className="text-xl font-bold text-emerald-950">
                  {formatRupiah(selectedDonatur.totalDonasi)}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 font-bold text-xs">
                {selectedDonatur.frekuensi}x Donasi
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-1">Tipe</span>
                <span className="font-semibold text-slate-800">
                  {selectedDonatur.tipe}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-1">Status</span>
                <span className="font-semibold text-emerald-700">
                  {selectedDonatur.status}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-1">Nomor Kontak</span>
                <span className="font-semibold text-slate-800">
                  {selectedDonatur.noHp}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-1">Email</span>
                <span className="font-semibold text-slate-800">
                  {selectedDonatur.email}
                </span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-stone-400 block mb-1">
                Terakhir Melakukan Infaq
              </span>
              <span className="font-semibold text-slate-800">
                {formatTanggal(selectedDonatur.terakhirDonasi)}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
