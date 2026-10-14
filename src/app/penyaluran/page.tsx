"use client";

import React, { useState } from "react";
import {
  Send,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  FileCheck,
  Users,
  Eye,
} from "lucide-react";
import { MOCK_PENYALURAN, TransaksiPenyaluran } from "@/data/mockData";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import { DemoBadge, DemoNoticeBanner } from "@/components/ui/DemoBadge";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function PenyaluranPage() {
  const [penyaluranList, setPenyaluranList] = useState<TransaksiPenyaluran[]>(MOCK_PENYALURAN);
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TransaksiPenyaluran | null>(null);

  // Simulation states
  const [simulatedState, setSimulatedState] = useState<"normal" | "loading" | "empty" | "error">("normal");

  // Form State
  const [formData, setFormData] = useState({
    program: "Santunan Yatim & Dhuafa" as TransaksiPenyaluran["program"],
    penerimaManfaat: "",
    jumlahMustahik: 1,
    alokasiDana: "",
    penanggungJawab: "Ustadz H. Ahmad Dahlan",
    buktiDokumentasi: "Kwitansi Penyerahan & Foto Dokumentasi",
  });

  const filteredPenyaluran = penyaluranList.filter((item) => {
    const matchesSearch =
      item.kodePenyaluran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.penerimaManfaat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.penanggungJawab.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProgram =
      programFilter === "Semua" || item.program === programFilter;
    return matchesSearch && matchesProgram;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dana = parseInt(formData.alokasiDana.replace(/\D/g, ""), 10) || 0;
    const now = new Date();
    const newTrx: TransaksiPenyaluran = {
      id: `DIS-2026-${String(penyaluranList.length + 1001)}`,
      kodePenyaluran: `INF-OUT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(penyaluranList.length + 1).padStart(3, "0")}`,
      tanggal: now.toISOString().split("T")[0],
      program: formData.program,
      penerimaManfaat: formData.penerimaManfaat,
      jumlahMustahik: Number(formData.jumlahMustahik) || 1,
      alokasiDana: dana,
      penanggungJawab: formData.penanggungJawab,
      buktiDokumentasi: formData.buktiDokumentasi,
      status: "Selesai",
    };

    setPenyaluranList([newTrx, ...penyaluranList]);
    setIsAddModalOpen(false);
    setFormData({
      program: "Santunan Yatim & Dhuafa",
      penerimaManfaat: "",
      jumlahMustahik: 1,
      alokasiDana: "",
      penanggungJawab: "Ustadz H. Ahmad Dahlan",
      buktiDokumentasi: "Kwitansi Penyerahan & Foto Dokumentasi",
    });
  };

  return (
    <div className="space-y-6">
      <DemoNoticeBanner />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-serif">
            Penyaluran Infaq & Manfaat Umat
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Pertanggungjawaban distribusi dana infaq untuk mustahik, program dakwah, dan renovasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* State Switcher */}
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
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4 text-white" />
            + Catat Penyaluran
          </button>
        </div>
      </div>

      {simulatedState === "loading" && (
        <LoadingState message="Memuat riwayat penyaluran infaq masjid..." rows={6} />
      )}

      {simulatedState === "error" && (
        <ErrorState
          title="Gagal Memuat Data Penyaluran"
          message="Server simulasi tidak dapat memproses daftar mustahik."
          onRetry={() => setSimulatedState("normal")}
        />
      )}

      {simulatedState === "empty" && (
        <EmptyState
          title="Belum Ada Penyaluran Infaq"
          description="Seluruh dana masih tersimpan di kas. Catat alokasi penyaluran pertama untuk mustahik atau program masjid."
          icon={Send}
          actionText="Buat Alokasi Penyaluran"
          onAction={() => {
            setSimulatedState("normal");
            setIsAddModalOpen(true);
          }}
        />
      )}

      {simulatedState === "normal" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari kode, mustahik, penanggung jawab..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            {/* Program Filter */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:border-amber-600 cursor-pointer"
              >
                <option value="Semua">Semua Program Bantuan</option>
                <option value="Santunan Yatim & Dhuafa">Santunan Yatim & Dhuafa</option>
                <option value="Renovasi Kubah & Tempat Wudhu">Renovasi Kubah & Wudhu</option>
                <option value="Kajian & Operasional Dakwah">Kajian & Dakwah</option>
                <option value="Bantuan Kesehatan Umat">Bantuan Kesehatan</option>
                <option value="Honor Pengajar Al-Qur'an">Honor Guru TPQ</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-stone-200">
                    <th className="py-3.5 px-4 md:px-6">Kode & Tanggal</th>
                    <th className="py-3.5 px-4">Program Penyaluran</th>
                    <th className="py-3.5 px-4">Penerima Manfaat</th>
                    <th className="py-3.5 px-4">Mustahik</th>
                    <th className="py-3.5 px-4">Alokasi Dana (Rp)</th>
                    <th className="py-3.5 px-4">Penanggung Jawab</th>
                    <th className="py-3.5 px-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredPenyaluran.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        Tidak ada riwayat penyaluran yang sesuai dengan pencarian
                      </td>
                    </tr>
                  ) : (
                    filteredPenyaluran.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-amber-50/20 transition-colors"
                      >
                        {/* Kode & Tanggal */}
                        <td className="py-3.5 px-4 md:px-6">
                          <span className="font-mono font-semibold text-slate-800">
                            {item.kodePenyaluran}
                          </span>
                          <p className="text-[11px] text-stone-400">
                            {formatTanggal(item.tanggal)}
                          </p>
                        </td>

                        {/* Program */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 font-medium text-[11px] border border-amber-200">
                            {item.program}
                          </span>
                        </td>

                        {/* Penerima Manfaat */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">
                              {item.penerimaManfaat}
                            </span>
                            <DemoBadge size="sm" />
                          </div>
                          <p className="text-[11px] text-stone-400 truncate max-w-[200px]">
                            {item.buktiDokumentasi}
                          </p>
                        </td>

                        {/* Mustahik Count */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-stone-100 text-slate-700 font-semibold text-[11px]">
                            <Users className="w-3 h-3 text-stone-500" />
                            {item.jumlahMustahik} Jiwa
                          </span>
                        </td>

                        {/* Alokasi Dana */}
                        <td className="py-3.5 px-4 font-bold text-amber-700 text-sm">
                          {formatRupiah(item.alokasiDana)}
                        </td>

                        {/* Penanggung Jawab */}
                        <td className="py-3.5 px-4 text-slate-600">
                          {item.penanggungJawab}
                        </td>

                        {/* Aksi Button */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedItem(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-amber-600 hover:text-white text-slate-600 text-xs font-semibold transition-all shadow-2xs"
                            title="Lihat Rincian Penyaluran"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50/70 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Menampilkan {filteredPenyaluran.length} penyaluran dana</span>
              <span className="text-amber-800 font-semibold">
                Total Tersalurkan:{" "}
                {formatRupiah(
                  filteredPenyaluran.reduce((acc, curr) => acc + curr.alokasiDana, 0)
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Penyaluran */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Catat Penyaluran Infaq Baru"
        description="Dokumentasikan pengeluaran kas infaq untuk kegiatan dan mustahik"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Program Penyaluran *
            </label>
            <select
              required
              value={formData.program}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  program: e.target.value as TransaksiPenyaluran["program"],
                })
              }
              className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
            >
              <option value="Santunan Yatim & Dhuafa">Santunan Yatim & Dhuafa</option>
              <option value="Renovasi Kubah & Tempat Wudhu">Renovasi Kubah & Tempat Wudhu</option>
              <option value="Kajian & Operasional Dakwah">Kajian & Operasional Dakwah</option>
              <option value="Bantuan Kesehatan Umat">Bantuan Kesehatan Umat</option>
              <option value="Honor Pengajar Al-Qur'an">Honor Pengajar TPQ</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Penerima Manfaat (Mustahik / Nama Kegiatan) *
            </label>
            <input
              type="text"
              required
              value={formData.penerimaManfaat}
              onChange={(e) =>
                setFormData({ ...formData, penerimaManfaat: e.target.value })
              }
              placeholder="Contoh: 30 Anak Yatim RW 05 / Ibu Fatimah (Dhuafa Lansia)"
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Alokasi Dana (Rp) *
              </label>
              <input
                type="number"
                required
                min="1000"
                value={formData.alokasiDana}
                onChange={(e) =>
                  setFormData({ ...formData, alokasiDana: e.target.value })
                }
                placeholder="Contoh: 5000000"
                className="w-full text-sm font-bold text-amber-950 px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Jumlah Jiwa Mustahik
              </label>
              <input
                type="number"
                min="1"
                value={formData.jumlahMustahik}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    jumlahMustahik: parseInt(e.target.value, 10) || 1,
                  })
                }
                placeholder="1"
                className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Penanggung Jawab Penyaluran
            </label>
            <input
              type="text"
              value={formData.penanggungJawab}
              onChange={(e) =>
                setFormData({ ...formData, penanggungJawab: e.target.value })
              }
              className="w-full text-xs px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Bukti Dokumentasi / Nota
            </label>
            <input
              type="text"
              value={formData.buktiDokumentasi}
              onChange={(e) =>
                setFormData({ ...formData, buktiDokumentasi: e.target.value })
              }
              placeholder="Contoh: Kwitansi Bermaterai & Foto Penyerahan"
              className="w-full text-xs px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-amber-600"
            />
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
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Simpan Penyaluran
            </button>
          </div>
        </form>
      </Modal>

      {/* Detail Penyaluran Modal */}
      {selectedItem && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={`Detail Penyaluran: ${selectedItem.kodePenyaluran}`}
          description={`Program: ${selectedItem.program}`}
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-amber-800 text-[11px] font-semibold uppercase">
                  Dana Disalurkan
                </span>
                <p className="text-2xl font-bold font-serif text-amber-950">
                  {formatRupiah(selectedItem.alokasiDana)}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 font-bold text-xs">
                {selectedItem.jumlahMustahik} Jiwa Mustahik
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-1">Tanggal Alokasi</span>
                <span className="font-semibold text-slate-800">
                  {formatTanggal(selectedItem.tanggal)}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl">
                <span className="text-stone-400 block mb-1">Status Audit</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {selectedItem.status}
                </span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-stone-400 block mb-1">Penerima Manfaat</span>
              <span className="font-bold text-slate-800 text-sm">
                {selectedItem.penerimaManfaat}
              </span>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl">
              <span className="text-stone-400 block mb-1">Bukti Fisik & Dokumentasi</span>
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>{selectedItem.buktiDokumentasi}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 text-stone-500 border-t border-stone-100">
              <span>Penanggung Jawab:</span>
              <span className="font-semibold text-slate-800">
                {selectedItem.penanggungJawab}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
