"use client";

import React, { useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Wallet,
  Receipt,
  Plus,
  HeartHandshake,
  Filter,
} from "lucide-react";
import { RINGKASAN_KAS } from "@/data/mockData";
import { formatRupiah } from "@/lib/utils";
import { StatCard } from "@/components/ui/StatCard";
import { OverviewCharts } from "@/components/dashboard/OverviewCharts";
import { RecentTransactionsTable } from "@/components/dashboard/RecentTransactionsTable";
import { DemoNoticeBanner } from "@/components/ui/DemoBadge";
import Link from "next/link";

type PeriodeOption = "bulan_ini" | "pekan_ini" | "hari_ini" | "tahun_ini";

export default function DashboardPage() {
  const [periode, setPeriode] = useState<PeriodeOption>("bulan_ini");

  return (
    <div className="space-y-6">
      {/* Demo Notice Banner */}
      <DemoNoticeBanner />

      {/* Top Welcome & Period Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
        {/* Subtle Islamic Geometric / Ambient Backing */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-400/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 space-y-1">
          <span className="text-amber-300 font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4" />
            Assalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-serif tracking-tight text-white">
            Ikhtisar Dana Infaq & Sedekah
          </h2>
          <p className="text-xs text-emerald-200/90 max-w-lg">
            Pantau arus penerimaan muhsinin dan penyaluran mustahik secara transparan, amanah, dan terperinci.
          </p>
        </div>

        {/* Action Buttons & Period Filter */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 sm:self-center">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-xs p-1 rounded-2xl border border-white/20 text-xs">
            <Filter className="w-3.5 h-3.5 text-amber-300 ml-2 mr-1" />
            <select
              value={periode}
              onChange={(e) => setPeriode(e.target.value as PeriodeOption)}
              className="bg-transparent text-white font-medium text-xs focus:outline-hidden cursor-pointer pr-3"
            >
              <option value="hari_ini" className="text-slate-800">Hari Ini</option>
              <option value="pekan_ini" className="text-slate-800">Pekan Ini</option>
              <option value="bulan_ini" className="text-slate-800">Bulan Ini (Okt 2026)</option>
              <option value="tahun_ini" className="text-slate-800">Tahun 2026</option>
            </select>
          </div>

          <Link
            href="/penerimaan"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
          >
            <Plus className="w-3.5 h-3.5" />
            Catat Infaq
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Penerimaan */}
        <StatCard
          title="Total Penerimaan"
          value={formatRupiah(RINGKASAN_KAS.totalPenerimaan)}
          subtitle="Akumulasi kas masuk infaq"
          icon={ArrowDownLeft}
          trend={{
            value: RINGKASAN_KAS.persentasePenerimaanBulanLalu,
            isPositive: true,
          }}
          variant="emerald"
        />

        {/* Total Penyaluran */}
        <StatCard
          title="Total Penyaluran"
          value={formatRupiah(RINGKASAN_KAS.totalPenyaluran)}
          subtitle="Tersalurkan ke 5 program"
          icon={ArrowUpRight}
          trend={{
            value: RINGKASAN_KAS.persentasePenyaluranBulanLalu,
            isPositive: true,
          }}
          variant="gold"
        />

        {/* Saldo Infaq */}
        <StatCard
          title="Saldo Kas Infaq"
          value={formatRupiah(RINGKASAN_KAS.saldoInfaq)}
          subtitle="Saldo siap dialokasikan"
          icon={Wallet}
          variant="teal"
        />

        {/* Jumlah Transaksi */}
        <StatCard
          title="Jumlah Transaksi"
          value={`${RINGKASAN_KAS.jumlahTransaksi} Trx`}
          subtitle="87 Donatur & 524 Mustahik"
          icon={Receipt}
          variant="white"
        />
      </div>

      {/* Overview Charts (Monthly Trend & Distribution) */}
      <OverviewCharts />

      {/* Recent Transactions Table */}
      <RecentTransactionsTable />
    </div>
  );
}
