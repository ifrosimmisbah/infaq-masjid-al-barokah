"use client";

import React, { useState } from "react";
import {
  HandHeart,
  Plus,
  Search,
  FileText,
  Printer,
  QrCode,
  CreditCard,
  Banknote,
} from "lucide-react";
import { MOCK_PENERIMAAN, TransaksiPenerimaan } from "@/data/mockData";
import { formatRupiah } from "@/lib/utils";
import { DemoBadge, DemoNoticeBanner } from "@/components/ui/DemoBadge";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorState } from "@/components/ui/ErrorState";

export default function PenerimaanPage() {
  const [transaksiList, setTransaksiList] = useState<TransaksiPenerimaan[]>(MOCK_PENERIMAAN);
  const [searchTerm, setSearchTerm] = useState("");
  const [kategoriFilter, setKategoriFilter] = useState("Semua");
  const [metodeFilter, setMetodeFilter] = useState("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<TransaksiPenerimaan | null>(null);

  // Simulation states
  const [simulatedState, setSimulatedState] = useState<"normal" | "loading" | "empty" | "error">("normal");

  // Form State
  const [formData, setFormData] = useState({
    namaDonatur: "",
    kategori: "Infaq Subuh" as TransaksiPenerimaan["kategori"],
    metodePembayaran: "QRIS" as TransaksiPenerimaan["metodePembayaran"],
    jumlah: "",
    keterangan: "",
    petugasAmil: "Ustadz H. Ahmad Dahlan",
  });

  const filteredTransaksi = transaksiList.filter((item) => {
    const matchesSearch =
      item.kodeTransaksi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.namaDonatur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keterangan.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKategori =
      kategoriFilter === "Semua" || item.kategori === kategoriFilter;
    const matchesMetode =
      metodeFilter === "Semua" || item.metodePembayaran === metodeFilter;
    return matchesSearch && matchesKategori && matchesMetode;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = parseInt(formData.jumlah.replace(/\D/g, ""), 10) || 0;
    const now = new Date();
    const newTrx: TransaksiPenerimaan = {
      id: `RCV-2026-${String(transaksiList.length + 1001)}`,
      kodeTransaksi: `INF-IN-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(transaksiList.length + 1).padStart(3, "0")}`,
      tanggal: `${now.toISOString().split("T")[0]} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
      namaDonatur: formData.namaDonatur || "Hamba Allah (Anonim)",
      kategori: formData.kategori,
      metodePembayaran: formData.metodePembayaran,
      jumlah: nominal,
      keterangan: formData.keterangan || "Infaq sedekah jamaah",
      petugasAmil: formData.petugasAmil,
      status: "Terkonfirmasi",
    };

    setTransaksiList([newTrx, ...transaksiList]);
    setIsAddModalOpen(false);
    setSelectedReceipt(newTrx); // automatically open receipt preview
    setFormData({
      namaDonatur: "",
      kategori: "Infaq Subuh",
      metodePembayaran: "QRIS",
      jumlah: "",
      keterangan: "",
      petugasAmil: "Ustadz H. Ahmad Dahlan",
    });
  };

  return (
    <div className="space-y-6">
      <DemoNoticeBanner />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-serif">
            Penerimaan Infaq & Sedekah
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Pencatatan kas masuk infaq subuh, jumat berkah, wakaf pembangunan, dan donasi QRIS.
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
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-[1.01]"
          >
            <Plus className="w-4 h-4 text-amber-300" />
            + Catat Penerimaan Infaq
          </button>
        </div>
      </div>

      {simulatedState === "loading" && (
        <LoadingState message="Memuat riwayat transaksi penerimaan infaq..." rows={6} />
      )}

      {simulatedState === "error" && (
        <ErrorState
          title="Gagal Memuat Transaksi Penerimaan"
          message="Server simulasi gagal mengambil pembukuan infaq."
          onRetry={() => setSimulatedState("normal")}
        />
      )}

      {simulatedState === "empty" && (
        <EmptyState
          title="Belum Ada Catatan Penerimaan"
          description="Belum ada transaksi infaq yang tercatat pada sistem saat ini. Klik tombol di bawah untuk mencatat penerimaan pertama."
          icon={HandHeart}
          actionText="Catat Infaq Pertama"
          onAction={() => {
            setSimulatedState("normal");
            setIsAddModalOpen(true);
          }}
        />
      )}

      {simulatedState === "normal" && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cari kode atau donatur..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              />
            </div>

            {/* Select Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {/* Kategori Filter */}
              <select
                value={kategoriFilter}
                onChange={(e) => setKategoriFilter(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Infaq Subuh">Infaq Subuh</option>
                <option value="Infaq Jumat">Infaq Jumat</option>
                <option value="Kotak Amal Masjid">Kotak Amal Masjid</option>
                <option value="Infaq Pembangunan">Infaq Pembangunan</option>
                <option value="Infaq Yatim & Dhuafa">Infaq Yatim & Dhuafa</option>
                <option value="Infaq Operasional">Infaq Operasional</option>
              </select>

              {/* Metode Filter */}
              <select
                value={metodeFilter}
                onChange={(e) => setMetodeFilter(e.target.value)}
                className="text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
              >
                <option value="Semua">Semua Metode</option>
                <option value="QRIS">QRIS</option>
                <option value="Transfer Bank">Transfer Bank</option>
                <option value="Tunai">Tunai</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-stone-200">
                    <th className="py-3.5 px-4 md:px-6">Kode & Waktu</th>
                    <th className="py-3.5 px-4">Nama Donatur</th>
                    <th className="py-3.5 px-4">Kategori Infaq</th>
                    <th className="py-3.5 px-4">Metode</th>
                    <th className="py-3.5 px-4">Jumlah (Rp)</th>
                    <th className="py-3.5 px-4">Amil Pencatat</th>
                    <th className="py-3.5 px-4 text-center">Kwitansi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {filteredTransaksi.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-stone-400">
                        Tidak ada transaksi yang cocok dengan filter
                      </td>
                    </tr>
                  ) : (
                    filteredTransaksi.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-amber-50/20 transition-colors"
                      >
                        {/* Kode & Waktu */}
                        <td className="py-3.5 px-4 md:px-6">
                          <span className="font-mono font-semibold text-slate-800">
                            {item.kodeTransaksi}
                          </span>
                          <p className="text-[11px] text-stone-400">
                            {item.tanggal}
                          </p>
                        </td>

                        {/* Nama Donatur */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-800">
                              {item.namaDonatur}
                            </span>
                            <DemoBadge size="sm" />
                          </div>
                          <p className="text-[11px] text-stone-500 truncate max-w-(180px)">
                            {item.keterangan}
                          </p>
                        </td>

                        {/* Kategori */}
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium text-[11px] border border-emerald-100">
                            {item.kategori}
                          </span>
                        </td>

                        {/* Metode */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                            {item.metodePembayaran === "QRIS" && (
                              <QrCode className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            {item.metodePembayaran === "Transfer Bank" && (
                              <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                            )}
                            {item.metodePembayaran === "Tunai" && (
                              <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                            )}
                            {item.metodePembayaran}
                          </span>
                        </td>

                        {/* Jumlah */}
                        <td className="py-3.5 px-4 font-bold text-emerald-800 text-sm">
                          {formatRupiah(item.jumlah)}
                        </td>

                        {/* Petugas */}
                        <td className="py-3.5 px-4 text-slate-600">
                          {item.petugasAmil}
                        </td>

                        {/* Kwitansi Button */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setSelectedReceipt(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-semibold transition-all"
                            title="Cetak / Pratinjau Kwitansi"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-700" />
                            Kwitansi
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50/70 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
              <span>Menampilkan {filteredTransaksi.length} transaksi penerimaan</span>
              <span className="text-emerald-800 font-semibold">
                Total Tertampil:{" "}
                {formatRupiah(
                  filteredTransaksi.reduce((acc, curr) => acc + curr.jumlah, 0)
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal Catat Penerimaan Infaq */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Catat Penerimaan Infaq Baru"
        description="Input rincian transaksi kas masuk infaq atau sedekah"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Donatur / Muhsinin
            </label>
            <input
              type="text"
              value={formData.namaDonatur}
              onChange={(e) =>
                setFormData({ ...formData, namaDonatur: e.target.value })
              }
              placeholder="Kosongkan jika donatur anonim (Hamba Allah)"
              className="w-full text-xs px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Infaq *
              </label>
              <select
                required
                value={formData.kategori}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    kategori: e.target.value as TransaksiPenerimaan["kategori"],
                  })
                }
                className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="Infaq Subuh">Infaq Subuh</option>
                <option value="Infaq Jumat">Infaq Jumat</option>
                <option value="Kotak Amal Masjid">Kotak Amal Masjid</option>
                <option value="Infaq Pembangunan">Infaq Pembangunan</option>
                <option value="Infaq Yatim & Dhuafa">Infaq Yatim & Dhuafa</option>
                <option value="Infaq Operasional">Infaq Operasional</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Metode Pembayaran *
              </label>
              <select
                required
                value={formData.metodePembayaran}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    metodePembayaran: e.target
                      .value as TransaksiPenerimaan["metodePembayaran"],
                  })
                }
                className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
              >
                <option value="QRIS">QRIS Dinamis / Statis</option>
                <option value="Transfer Bank">Transfer Bank Rekening Masjid</option>
                <option value="Tunai">Tunai / Langsung ke Amil</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nominal Infaq (Rp) *
            </label>
            <input
              type="number"
              required
              min="1000"
              value={formData.jumlah}
              onChange={(e) =>
                setFormData({ ...formData, jumlah: e.target.value })
              }
              placeholder="Contoh: 100000"
              className="w-full text-sm font-bold text-emerald-950 px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Keterangan / Akad Niat Donatur
            </label>
            <textarea
              rows={2}
              value={formData.keterangan}
              onChange={(e) =>
                setFormData({ ...formData, keterangan: e.target.value })
              }
              placeholder="Contoh: Niat infaq atas nama keluarga besar almarhum..."
              className="w-full text-xs px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-emerald-600"
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
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Simpan & Terbitkan Kwitansi
            </button>
          </div>
        </form>
      </Modal>

      {/* Kwitansi Digital Resmi Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Tanda Terima / Kwitansi Resmi Infaq"
          description={`Kode Bukti: ${selectedReceipt.kodeTransaksi}`}
          maxWidth="md"
        >
          <div className="p-6 bg-amber-50/40 rounded-2xl border border-amber-200/80 space-y-5 text-slate-800 relative">
            {/* Header Kwitansi */}
            <div className="text-center pb-4 border-b border-dashed border-amber-300">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-widest">
                DKM Masjid & Yayasan Infaq Al Barokah
              </span>
              <h3 className="text-base font-bold font-serif text-emerald-950 mt-0.5">
                BUKTI PENERIMAAN INFAQ & SEDEKAH
              </h3>
              <p className="text-[10px] text-stone-500">
                Jl. Al Barokah No. 12, Kel. Barokah, Kota Sejahtera
              </p>
              <div className="mt-2 flex justify-center">
                <DemoBadge size="sm" />
              </div>
            </div>

            {/* Isi Data */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">No. Registrasi:</span>
                <span className="font-mono font-bold text-slate-800">
                  {selectedReceipt.kodeTransaksi}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Tanggal & Waktu:</span>
                <span className="font-semibold text-slate-800">
                  {selectedReceipt.tanggal} WIB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Telah Terima Dari:</span>
                <span className="font-bold text-emerald-900">
                  {selectedReceipt.namaDonatur}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Kategori Peruntukan:</span>
                <span className="font-semibold text-slate-800">
                  {selectedReceipt.kategori}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Metode Pembayaran:</span>
                <span className="font-semibold text-slate-800">
                  {selectedReceipt.metodePembayaran}
                </span>
              </div>
            </div>

            {/* Total Box */}
            <div className="p-4 bg-emerald-900 text-white rounded-xl text-center shadow-inner">
              <span className="text-[10px] uppercase tracking-wider text-emerald-200">
                Jumlah Diterima
              </span>
              <p className="text-2xl font-bold font-serif text-amber-300 mt-0.5">
                {formatRupiah(selectedReceipt.jumlah)}
              </p>
            </div>

            {/* Doa & Footer */}
            <div className="text-center text-[11px] text-stone-600 italic bg-white p-3 rounded-xl border border-stone-200">
              &ldquo;Jazakumullah Khairan Katsiran. Semoga Allah Ta&apos;ala melipatgandakan pahala dan memberkahi harta yang tersisa.&rdquo;
            </div>

            <div className="flex items-center justify-between pt-2 text-[10px] text-stone-500">
              <span>Status: Terverifikasi Sistem</span>
              <span>Amil: {selectedReceipt.petugasAmil}</span>
            </div>

            {/* Print Action */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-black text-white text-xs font-semibold rounded-lg shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                Cetak Bukti PDF
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
