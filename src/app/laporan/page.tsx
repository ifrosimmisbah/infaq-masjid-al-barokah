"use client";

import React, { useState } from "react";
import {
  FileBarChart,
  Printer,
  FileSpreadsheet,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import { DemoBadge, DemoNoticeBanner } from "@/components/ui/DemoBadge";
import { Modal } from "@/components/ui/Modal";
import { LoadingState } from "@/components/ui/LoadingState";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";

interface LedgerEntry {
  id: string;
  tanggal: string;
  keterangan: string;
  kode: string;
  debet: number;
  kredit: number;
  saldo: number;
}

export default function LaporanPage() {
  const [selectedBulan, setSelectedBulan] = useState("10");
  const [selectedTahun, setSelectedTahun] = useState("2026");
  const [isExportSuccessModal, setIsExportSuccessModal] = useState(false);
  const [exportType, setExportType] = useState<"PDF" | "Excel">("PDF");

  // State simulator
  const [simulatedState, setSimulatedState] = useState<"normal" | "loading" | "empty" | "error">("normal");

  // Simulated cash book ledger entries
  const ledgerData: LedgerEntry[] = [
    {
      id: "L-1",
      tanggal: "2026-10-01",
      keterangan: "Saldo Awal Kas Infaq Bulan Oktober 2026",
      kode: "SALDO-AWAL",
      debet: 41250000,
      kredit: 0,
      saldo: 41250000,
    },
    {
      id: "L-2",
      tanggal: "2026-10-02",
      keterangan: "Penyaluran: Konsumsi & Dakwah Ahad Pagi",
      kode: "INF-OUT-20261002-001",
      debet: 0,
      kredit: 1850000,
      saldo: 39400000,
    },
    {
      id: "L-3",
      tanggal: "2026-10-05",
      keterangan: "Penerimaan: Infaq Operasional Majelis Taklim Khadijah",
      kode: "INF-IN-20261005-002",
      debet: 3200000,
      kredit: 0,
      saldo: 42600000,
    },
    {
      id: "L-4",
      tanggal: "2026-10-05",
      keterangan: "Penyaluran: Bisyarah Honor Guru TPQ",
      kode: "INF-OUT-20261005-003",
      debet: 0,
      kredit: 4800000,
      saldo: 37800000,
    },
    {
      id: "L-5",
      tanggal: "2026-10-08",
      keterangan: "Penerimaan: Sedekah Subuh QRIS",
      kode: "INF-IN-20261008-003",
      debet: 500000,
      kredit: 0,
      saldo: 38300000,
    },
    {
      id: "L-6",
      tanggal: "2026-10-09",
      keterangan: "Penyaluran: Bantuan Medis Operasi Lansia Dhuafa",
      kode: "INF-OUT-20261009-001",
      debet: 0,
      kredit: 3200000,
      saldo: 35100000,
    },
    {
      id: "L-7",
      tanggal: "2026-10-10",
      keterangan: "Penerimaan: CSR Berkah Pendidikan PT Berkah Mandiri",
      kode: "INF-IN-20261010-001",
      debet: 15000000,
      kredit: 0,
      saldo: 50100000,
    },
    {
      id: "L-8",
      tanggal: "2026-10-11",
      keterangan: "Penerimaan: Perhitungan Kotak Amal Salat Jumat",
      kode: "INF-IN-20261011-008",
      debet: 4850000,
      kredit: 0,
      saldo: 54950000,
    },
    {
      id: "L-9",
      tanggal: "2026-10-11",
      keterangan: "Penyaluran: Material Kubah & Tempat Wudhu",
      kode: "INF-OUT-20261011-002",
      debet: 0,
      kredit: 6500000,
      saldo: 48450000,
    },
    {
      id: "L-10",
      tanggal: "2026-10-13",
      keterangan: "Penerimaan: Infaq Pembangunan H. Bambang Sugianto",
      kode: "INF-IN-20261013-004",
      debet: 5000000,
      kredit: 0,
      saldo: 53450000,
    },
    {
      id: "L-11",
      tanggal: "2026-10-13",
      keterangan: "Penyaluran: Santunan 45 Anak Yatim & Dhuafa",
      kode: "INF-OUT-20261013-001",
      debet: 0,
      kredit: 9000000,
      saldo: 44450000,
    },
    {
      id: "L-12",
      tanggal: "2026-10-14",
      keterangan: "Penerimaan: Infaq Subuh QRIS Berjamaah",
      kode: "INF-IN-20261014-001",
      debet: 250000,
      kredit: 0,
      saldo: 44700000,
    },
  ];

  const handleExport = (type: "PDF" | "Excel") => {
    setExportType(type);
    setIsExportSuccessModal(true);
  };

  return (
    <div className="space-y-6">
      <DemoNoticeBanner />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 font-serif">
            Laporan Keuangan & Mutasi Kas
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Buku kas umum, rekapitulasi penerimaan, dan pengeluaran per periode.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulator switcher */}
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport("PDF")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              Ekspor PDF
            </button>
            <button
              onClick={() => handleExport("Excel")}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-200" />
              Excel (CSV)
            </button>
          </div>
        </div>
      </div>

      {simulatedState === "loading" && (
        <LoadingState message="Menghitung neraca mutasi kas infaq..." rows={6} />
      )}

      {simulatedState === "error" && (
        <ErrorState
          title="Gagal Mengompilasi Pembukuan Kas"
          message="Terjadi kesalahan kalkulasi saat memproses rekapitulasi debit-kredit."
          onRetry={() => setSimulatedState("normal")}
        />
      )}

      {simulatedState === "empty" && (
        <EmptyState
          title="Tidak Ada Mutasi Kas Pada Periode Ini"
          description="Buku kas untuk periode yang dipilih belum memiliki catatan transaksi penerimaan maupun penyaluran."
          icon={FileBarChart}
          actionText="Ubah Periode Laporan"
          onAction={() => setSimulatedState("normal")}
        />
      )}

      {simulatedState === "normal" && (
        <div className="space-y-6">
          {/* Filter Periode & Ringkasan Cepat */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase">
                Filter Bulan & Tahun
              </span>
              <div className="flex items-center gap-2 mt-2">
                <select
                  value={selectedBulan}
                  onChange={(e) => setSelectedBulan(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2 font-medium"
                >
                  <option value="10">Oktober</option>
                  <option value="09">September</option>
                  <option value="08">Agustus</option>
                </select>
                <select
                  value={selectedTahun}
                  onChange={(e) => setSelectedTahun(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-2 font-medium"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>Penerimaan Kas (Debit)</span>
                <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-lg font-bold text-emerald-700">
                {formatRupiah(28800000)}
              </p>
              <p className="text-[11px] text-stone-400 mt-1">7 transaksi masuk</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                <span>Penyaluran Kas (Kredit)</span>
                <ArrowUpRight className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-lg font-bold text-amber-700">
                {formatRupiah(25350000)}
              </p>
              <p className="text-[11px] text-stone-400 mt-1">5 program disalurkan</p>
            </div>

            <div className="p-4 bg-gradient-to-br from-emerald-900 to-emerald-800 text-white rounded-2xl shadow-xs">
              <div className="flex items-center justify-between text-xs text-emerald-200 mb-1">
                <span>Saldo Kas Akhir</span>
                <Wallet className="w-4 h-4 text-amber-300" />
              </div>
              <p className="text-lg font-bold text-white">
                {formatRupiah(44700000)}
              </p>
              <p className="text-[11px] text-emerald-300/80 mt-1">
                Kas siap dialokasikan
              </p>
            </div>
          </div>

          {/* Buku Kas Umum Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-5 border-b border-stone-100 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-800 font-serif">
                    Buku Kas Umum (Mutasi Infaq)
                  </h3>
                  <DemoBadge size="sm" />
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Laporan pembukuan debit, kredit, dan saldo kumulatif periodik
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Status: Seimbang (Balance)</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-stone-200">
                    <th className="py-3.5 px-4 md:px-6">Tanggal</th>
                    <th className="py-3.5 px-4">Keterangan / Transaksi</th>
                    <th className="py-3.5 px-4">Kode Referensi</th>
                    <th className="py-3.5 px-4 text-right">Debit (Masuk)</th>
                    <th className="py-3.5 px-4 text-right">Kredit (Keluar)</th>
                    <th className="py-3.5 px-4 text-right">Saldo Kas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-xs">
                  {ledgerData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-amber-50/20 transition-colors"
                    >
                      <td className="py-3 px-4 md:px-6 font-medium text-slate-600 whitespace-nowrap">
                        {formatTanggal(row.tanggal)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {row.keterangan}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-stone-500">
                        {row.kode}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-emerald-700 whitespace-nowrap">
                        {row.debet > 0 ? formatRupiah(row.debet) : "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-amber-700 whitespace-nowrap">
                        {row.kredit > 0 ? formatRupiah(row.kredit) : "-"}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 whitespace-nowrap">
                        {formatRupiah(row.saldo)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-stone-50/70 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
              <span>Dicetak dan disetujui oleh Pengurus DKM Masjid Al Barokah</span>
              <span className="font-semibold text-slate-800">
                Pemeriksaan Kas: 14 Oktober 2026
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Export Confirmation Modal */}
      <Modal
        isOpen={isExportSuccessModal}
        onClose={() => setIsExportSuccessModal(false)}
        title={`Ekspor Laporan ${exportType} Berhasil Disiapkan`}
        description="Dokumen laporan kas infaq siap diunduh atau dicetak"
        maxWidth="sm"
      >
        <div className="text-center py-4 space-y-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6 text-emerald-700" />
          </div>
          <p className="text-xs text-slate-600">
            Berkas <strong>Laporan_Infaq_Al_Barokah_Oktober_2026.{exportType.toLowerCase()}</strong> telah berhasil dibuat dalam format siap cetak.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setIsExportSuccessModal(false);
                if (exportType === "PDF") window.print();
              }}
              className="w-full py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
            >
              Unduh Berkas Sekarang
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
