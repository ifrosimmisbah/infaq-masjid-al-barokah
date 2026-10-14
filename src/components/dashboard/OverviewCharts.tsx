"use client";

import React, { useState } from "react";
import { TrendingUp, BarChart3, PieChart, Info } from "lucide-react";
import { GRAFIK_BULANAN, DISTRIBUSI_KATEGORI } from "@/data/mockData";
import { formatRupiah } from "@/lib/utils";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function OverviewCharts() {
  const [activeTab, setActiveTab] = useState<"bar" | "distribution">("bar");
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  // Find max value to scale chart
  const maxValue = Math.max(
    ...GRAFIK_BULANAN.flatMap((g) => [g.penerimaan, g.penyaluran])
  );

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 md:p-6 shadow-xs space-y-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-800 font-serif">
              Grafik Arus Kas Infaq
            </h3>
            <DemoBadge size="sm" />
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Perbandingan total penerimaan dan penyaluran dana infaq 6 bulan terakhir
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-stone-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab("bar")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "bar"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Tren Bulanan
          </button>
          <button
            onClick={() => setActiveTab("distribution")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "distribution"
                ? "bg-white text-emerald-900 shadow-xs"
                : "text-stone-500 hover:text-stone-800"
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            Distribusi Kategori
          </button>
        </div>
      </div>

      {activeTab === "bar" ? (
        <div className="space-y-4">
          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-emerald-700 inline-block" />
                <span className="font-medium text-slate-700">Penerimaan Infaq</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" />
                <span className="font-medium text-slate-700">Penyaluran Infaq</span>
              </div>
            </div>

            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Arahkan kursor pada batang untuk nominal
            </span>
          </div>

          {/* Bar Chart Graphics */}
          <div className="h-64 pt-6 pb-2 flex items-end justify-between gap-2 sm:gap-4 border-b border-stone-200">
            {GRAFIK_BULANAN.map((item) => {
              const heightPenerimaan = Math.round((item.penerimaan / maxValue) * 100);
              const heightPenyaluran = Math.round((item.penyaluran / maxValue) * 100);
              const isHovered = hoveredMonth === item.bulan;

              return (
                <div
                  key={item.bulan}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setHoveredMonth(item.bulan)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  {/* Tooltip on Hover */}
                  <div
                    className={`text-[10px] bg-slate-900 text-white px-2 py-1 rounded-md mb-2 whitespace-nowrap shadow-md transition-opacity duration-150 ${
                      isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div>Masuk: {formatRupiah(item.penerimaan)}</div>
                    <div>Keluar: {formatRupiah(item.penyaluran)}</div>
                  </div>

                  {/* Dual Bars */}
                  <div className="w-full flex items-end justify-center gap-1.5 sm:gap-2 h-44">
                    {/* Penerimaan Bar */}
                    <div
                      className="w-full max-w-[20px] bg-gradient-to-t from-emerald-800 to-emerald-600 rounded-t-md transition-all duration-300 group-hover:brightness-110 shadow-xs"
                      style={{ height: `${heightPenerimaan}%` }}
                    />
                    {/* Penyaluran Bar */}
                    <div
                      className="w-full max-w-[20px] bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md transition-all duration-300 group-hover:brightness-110 shadow-xs"
                      style={{ height: `${heightPenyaluran}%` }}
                    />
                  </div>

                  {/* X Axis Label */}
                  <span className="text-[11px] font-medium text-slate-500 mt-2 truncate w-full text-center">
                    {item.bulan}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  Rata-rata Penerimaan Bulanan
                </p>
                <p className="text-sm font-bold text-emerald-950">
                  {formatRupiah(21400000)}
                </p>
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-amber-800 font-medium">
                  Rata-rata Penyaluran Bulanan
                </p>
                <p className="text-sm font-bold text-amber-950">
                  {formatRupiah(14390000)}
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                67.2% Terserap
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* Distribution View */
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Visual Progress Bars */}
            <div className="space-y-3">
              {DISTRIBUSI_KATEGORI.map((kat) => (
                <div key={kat.nama} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-700">{kat.nama}</span>
                    <span className="font-bold text-emerald-900">{kat.persentase}%</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${kat.persentase}%`,
                        backgroundColor: kat.warna,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Explanatory Box */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Alokasi Paling Dominan
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Penerimaan infaq didominasi oleh program <strong>Infaq Pembangunan (35%)</strong> dan <strong>Santunan Anak Yatim & Dhuafa (30%)</strong>.
              </p>
              <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs">
                <span className="text-stone-500">Akuntabilitas:</span>
                <span className="font-bold text-emerald-700">Audit Berkala DKM</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
