"use client";

import React, { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  Tag,
  CheckCircle2,
} from "lucide-react";
import { MOCK_PENERIMAAN, MOCK_PENYALURAN } from "@/data/mockData";
import { formatRupiah, formatTanggal } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { Modal } from "@/components/ui/Modal";

type FilterType = "semua" | "penerimaan" | "penyaluran";

interface UnifiedTransaction {
  id: string;
  kode: string;
  tipe: "masuk" | "keluar";
  tanggal: string;
  nama: string;
  kategori: string;
  metodeOrBukti: string;
  jumlah: number;
  petugas: string;
  status: string;
  keterangan: string;
}

export function RecentTransactionsTable() {
  const [filter, setFilter] = useState<FilterType>("semua");
  const [selectedTx, setSelectedTx] = useState<UnifiedTransaction | null>(null);

  // Unify and sort mock transactions
  const combined: UnifiedTransaction[] = [
    ...MOCK_PENERIMAAN.map((p) => ({
      id: p.id,
      kode: p.kodeTransaksi,
      tipe: "masuk" as const,
      tanggal: p.tanggal,
      nama: p.namaDonatur,
      kategori: p.kategori,
      metodeOrBukti: p.metodePembayaran,
      jumlah: p.jumlah,
      petugas: p.petugasAmil,
      status: p.status,
      keterangan: p.keterangan,
    })),
    ...MOCK_PENYALURAN.map((d) => ({
      id: d.id,
      kode: d.kodePenyaluran,
      tipe: "keluar" as const,
      tanggal: d.tanggal,
      nama: d.penerimaManfaat,
      kategori: d.program,
      metodeOrBukti: d.buktiDokumentasi,
      jumlah: d.alokasiDana,
      petugas: d.penanggungJawab,
      status: d.status,
      keterangan: `${d.jumlahMustahik} mustahik terbantu`,
    })),
  ].sort((a, b) => (b.tanggal > a.tanggal ? 1 : -1));

  const filteredTransactions = combined.filter((tx) => {
    if (filter === "penerimaan") return tx.tipe === "masuk";
    if (filter === "penyaluran") return tx.tipe === "keluar";
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
      {/* Table Header & Tabs */}
      <div className="p-5 md:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-800 font-serif">
              Tabel Transaksi Terbaru
            </h3>
            <DemoBadge size="sm" />
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Riwayat keluar-masuk kas infaq yang tercatat di sistem
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter("semua")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "semua"
                ? "bg-white text-emerald-950 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter("penerimaan")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "penerimaan"
                ? "bg-white text-emerald-800 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Penerimaan
          </button>
          <button
            onClick={() => setFilter("penyaluran")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === "penyaluran"
                ? "bg-white text-amber-800 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            Penyaluran
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-stone-200">
              <th className="py-3.5 px-4 md:px-6">Transaksi</th>
              <th className="py-3.5 px-4">Pihak / Mustahik</th>
              <th className="py-3.5 px-4">Kategori / Program</th>
              <th className="py-3.5 px-4">Nominal</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-amber-50/20 transition-colors group"
              >
                {/* Kode & Tanggal */}
                <td className="py-3.5 px-4 md:px-6">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        tx.tipe === "masuk"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {tx.tipe === "masuk" ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <span className="font-mono font-medium text-slate-700">
                        {tx.kode}
                      </span>
                      <p className="text-[11px] text-stone-400">
                        {formatTanggal(tx.tanggal)}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Nama Donatur / Mustahik */}
                <td className="py-3.5 px-4 font-semibold text-slate-800">
                  {tx.nama}
                </td>

                {/* Kategori */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 text-slate-700 text-[11px] font-medium">
                    <Tag className="w-3 h-3 text-stone-400" />
                    {tx.kategori}
                  </span>
                </td>

                {/* Nominal */}
                <td className="py-3.5 px-4">
                  <span
                    className={`font-bold ${
                      tx.tipe === "masuk"
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
                    {tx.tipe === "masuk" ? "+" : "-"} {formatRupiah(tx.jumlah)}
                  </span>
                </td>

                {/* Status */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {tx.status}
                  </span>
                </td>

                {/* Aksi Button */}
                <td className="py-3.5 px-4 text-center">
                  <button
                    onClick={() => setSelectedTx(tx)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-800 hover:text-white text-slate-600 text-xs font-semibold transition-all shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Detail</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTx && (
        <Modal
          isOpen={!!selectedTx}
          onClose={() => setSelectedTx(null)}
          title={`Detail Transaksi (${selectedTx.tipe === "masuk" ? "Penerimaan" : "Penyaluran"})`}
          description={selectedTx.kode}
          maxWidth="md"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-emerald-800 font-semibold uppercase">
                  Nominal Transaksi
                </p>
                <p className="text-xl font-bold text-emerald-950">
                  {formatRupiah(selectedTx.jumlah)}
                </p>
              </div>
              <DemoBadge size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-400 block mb-1">
                  {selectedTx.tipe === "masuk" ? "Donatur / Muhsinin" : "Penerima Manfaat"}
                </span>
                <span className="font-semibold text-slate-800">
                  {selectedTx.nama}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-400 block mb-1">Kategori / Program</span>
                <span className="font-semibold text-slate-800">
                  {selectedTx.kategori}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-400 block mb-1">Tanggal & Waktu</span>
                <span className="font-semibold text-slate-800">
                  {selectedTx.tanggal}
                </span>
              </div>
              <div className="p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-400 block mb-1">Metode / Bukti</span>
                <span className="font-semibold text-slate-800">
                  {selectedTx.metodeOrBukti}
                </span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg text-xs">
              <span className="text-stone-400 block mb-1">Catatan / Keterangan</span>
              <p className="text-slate-700 italic">
                &ldquo;{selectedTx.keterangan}&rdquo;
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
              <span>Petugas Penanggung Jawab:</span>
              <span className="font-semibold text-slate-800">
                {selectedTx.petugas}
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
