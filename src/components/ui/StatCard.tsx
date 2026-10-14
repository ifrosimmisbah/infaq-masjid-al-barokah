import React from "react";
import { LucideIcon } from "lucide-react";
import { DemoBadge } from "./DemoBadge";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  variant?: "emerald" | "gold" | "white" | "teal";
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "white",
}: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "emerald":
        return {
          wrapper: "bg-gradient-to-br from-emerald-900 to-emerald-800 text-white border-emerald-700/50 shadow-md",
          iconBg: "bg-emerald-700/60 text-amber-300 border border-emerald-600/40",
          titleColor: "text-emerald-100",
          valueColor: "text-white",
          subColor: "text-emerald-200/80",
          trendBg: "bg-emerald-950/60 text-emerald-200 border border-emerald-600/30",
        };
      case "gold":
        return {
          wrapper: "bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-400/50 shadow-md",
          iconBg: "bg-amber-700/40 text-amber-100 border border-amber-400/30",
          titleColor: "text-amber-100",
          valueColor: "text-white",
          subColor: "text-amber-100/90",
          trendBg: "bg-amber-800/50 text-amber-100 border border-amber-400/30",
        };
      case "teal":
        return {
          wrapper: "bg-white text-slate-800 border-emerald-100 shadow-sm hover:shadow-md transition-shadow",
          iconBg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
          titleColor: "text-slate-500",
          valueColor: "text-emerald-950",
          subColor: "text-slate-400",
          trendBg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        };
      default:
        return {
          wrapper: "bg-white text-slate-800 border-stone-200 shadow-sm hover:shadow-md transition-shadow",
          iconBg: "bg-amber-50 text-amber-700 border border-amber-200",
          titleColor: "text-slate-500",
          valueColor: "text-slate-900",
          subColor: "text-slate-400",
          trendBg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className={`relative p-5 rounded-2xl border transition-all duration-200 ${styles.wrapper}`}>
      {/* Top Gold Corner Accent Line */}
      <div className="absolute top-0 right-8 left-8 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

      <div className="flex items-start justify-between mb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold uppercase tracking-wider ${styles.titleColor}`}>
              {title}
            </span>
            <DemoBadge size="sm" />
          </div>
          <div className={`text-2xl font-bold tracking-tight ${styles.valueColor}`}>
            {value}
          </div>
        </div>
        <div className={`p-3 rounded-xl ${styles.iconBg} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center justify-between text-xs pt-2 border-t border-black/5 dark:border-white/5">
          {subtitle && <span className={styles.subColor}>{subtitle}</span>}
          {trend && (
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                trend.isPositive
                  ? styles.trendBg
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {trend.isPositive ? "▲" : "▼"} {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
