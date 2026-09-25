"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePetro } from "@/context/PetroContext";
import { formatNumber } from "@/lib/utils";
import {
  Flame,
  Gauge,
  Layers,
  FileText,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { kpis, esdStatus, triggerEmergencyShutdown, resetEsdSystem } = usePetro();

  const navItems = [
    { label: "Gathering SCADA", href: "/", icon: Gauge },
    { label: "3-Phase Separator", href: "/separator/", icon: Layers },
    { label: "Drilling Mud Log", href: "/mudlog/", icon: AlertTriangle, badge: "Sprint 3" },
    { label: "Custody B/L A4", href: "/custody/", icon: FileText, badge: "Sprint 3" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-sky-900/40 text-slate-100">
      {/* Top Telemetry Strip */}
      <div className="hidden md:flex items-center justify-between px-6 py-1.5 bg-slate-900/80 border-b border-sky-950 text-xs font-mono">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">BEKAPAI FIELD SCADA:</span>
            <span className="text-sky-300 font-bold">BLOCK MAHAKAM OFFSHORE</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">GROSS OIL:</span>
            <span className="text-amber-400 font-bold">{formatNumber(kpis.totalGrossOilBopd, 0)} BOPD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">SALES GAS:</span>
            <span className="text-cyan-400 font-bold">{kpis.totalSalesGasMmscfd} MMSCFD</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">EXPORT PRESS:</span>
            <span className="text-emerald-400 font-bold">{kpis.pipelineExportPressurePsi} PSI</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">WATER CUT:</span>
            <span className="text-orange-400 font-bold">{kpis.fieldWaterCutAvgPct}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {esdStatus === "ESD_TRIPPED" ? (
            <button
              onClick={resetEsdSystem}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-[11px] font-bold uppercase hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> RESET ESD TRIP
            </button>
          ) : (
            <button
              onClick={triggerEmergencyShutdown}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-rose-950/80 border border-rose-600 text-rose-300 text-[11px] font-bold uppercase hover:bg-rose-900 transition-all cursor-pointer animate-pulse"
            >
              <ShieldAlert className="w-3 h-3 text-rose-400" /> TRIP ESD-001
            </button>
          )}

          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
              esdStatus === "ESD_TRIPPED"
                ? "bg-rose-900/60 text-rose-300 border border-rose-500"
                : "bg-emerald-950/60 text-emerald-300 border border-emerald-500/40"
            }`}
          >
            {esdStatus === "ESD_TRIPPED" ? (
              <>
                <ShieldAlert className="w-3.5 h-3.5" /> ESD TRIPPED
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" /> ESD ARMED
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-wider text-slate-100">PETROFLOW</span>
              <span className="px-1.5 py-0.2 text-[10px] font-mono bg-sky-950 text-sky-400 rounded border border-sky-800">
                SCADA OS
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">Offshore Wellhead & Multi-Phase Pipeline ERP</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-sky-500/20 text-sky-300 border border-sky-400/40 shadow-sm shadow-sky-500/10"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 font-mono bg-amber-950/80 text-amber-300 rounded border border-amber-800/40">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
