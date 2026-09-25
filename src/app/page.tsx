"use client";

import React from "react";
import { usePetro } from "@/context/PetroContext";
import { PipelineCanvas } from "@/components/PipelineCanvas";
import { formatNumber } from "@/lib/utils";
import {
  Gauge,
  Sliders,
  AlertTriangle,
  Flame,
  Activity,
  Droplets,
  Wind,
  ShieldAlert,
  Power,
} from "lucide-react";

export default function GatheringScadaPage() {
  const { wellheads, kpis, esdStatus, updateChokeOpening, toggleWellStatus } = usePetro();

  return (
    <div className="space-y-6">
      {/* Top Banner & Alert Banner */}
      {esdStatus === "ESD_TRIPPED" && (
        <div className="p-4 rounded-xl bg-rose-950/80 border-2 border-rose-600 text-rose-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
            <div>
              <h2 className="text-base font-bold font-mono uppercase tracking-wide">
                EMERGENCY SHUTDOWN LEVEL 1 ACTIVE (ESD-001)
              </h2>
              <p className="text-xs text-rose-300">
                Semua choke valve otomatis ditutup. Aliran pipa utama diputus demi keselamatan aset offshore.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-rose-900 font-mono text-xs font-bold uppercase">
            FAIL-SAFE CLOSED
          </span>
        </div>
      )}

      {/* Field KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Oil Production</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-amber-400">
              {formatNumber(kpis.totalGrossOilBopd, 0)}
            </span>
            <span className="text-xs font-mono text-slate-400">BOPD</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Mahakam Light Crude (36.2° API)</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sales Gas Delivery</span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-cyan-400">
              {kpis.totalSalesGasMmscfd}
            </span>
            <span className="text-xs font-mono text-slate-400">MMSCFD</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">To Bontang LNG Terminal Train G</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Produced Water</span>
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-blue-400">
              {formatNumber(kpis.totalProducedWaterBpd, 0)}
            </span>
            <span className="text-xs font-mono text-slate-400">BWPD ({kpis.fieldWaterCutAvgPct}%)</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">Reinjected to disposal well D-01</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Export Trunk Pressure</span>
            <Gauge className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400">
              {kpis.pipelineExportPressurePsi}
            </span>
            <span className="text-xs font-mono text-slate-400">PSI GAUGE</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            {kpis.operatingWellsCount} of 6 Wells Online
          </p>
        </div>
      </div>

      {/* 60 FPS Real-time Pipeline Waveform Canvas */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-mono">
              24" Subsea Trunkline Transient Slug Waveform (60 FPS Telemetry)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Sensor Tag: PT-501A / PT-501B</span>
        </div>
        <PipelineCanvas
          exportPressurePsi={kpis.pipelineExportPressurePsi}
          isEsdTripped={esdStatus === "ESD_TRIPPED"}
          activeWellsCount={kpis.operatingWellsCount}
        />
      </div>

      {/* 6 Wellheads Matrix */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-200">Offshore Wellhead Christmas Tree Matrix</h3>
            <p className="text-xs text-slate-400">
              Pengaturan bukaan choke valve, tekanan kepala sumur (THP/CHP), dan laju produksi per sumur
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-slate-900 border border-sky-900/40 rounded text-sky-400">
            CHOKE INCREMENT: 1/64" CALIBRATED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wellheads.map((well) => {
            const isOff = well.status === "MAINTENANCE_BLOWDOWN";
            return (
              <div
                key={well.id}
                className={`p-4 rounded-xl border transition-all ${
                  isOff
                    ? "bg-slate-950/60 border-slate-800 opacity-60"
                    : well.status === "WATER_CONING_ALERT"
                    ? "bg-amber-950/20 border-amber-500/50"
                    : "bg-slate-900/80 border-sky-900/40 hover:border-sky-500/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-200">{well.id}</span>
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          isOff
                            ? "bg-slate-800 text-slate-400"
                            : well.status === "WATER_CONING_ALERT"
                            ? "bg-amber-950 text-amber-300 border border-amber-700/50"
                            : "bg-emerald-950 text-emerald-300 border border-emerald-700/40"
                        }`}
                      >
                        {well.status.replace(/_/g, " ")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{well.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{well.formation}</p>
                  </div>

                  <button
                    onClick={() => toggleWellStatus(well.id)}
                    title={isOff ? "Open Well Master Valve" : "Shut-In Well"}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      isOff
                        ? "bg-slate-800 border-slate-700 text-slate-400 hover:text-emerald-400 hover:bg-slate-700"
                        : "bg-emerald-950/80 border-emerald-600/40 text-emerald-400 hover:bg-rose-950 hover:text-rose-400 hover:border-rose-600/40"
                    }`}
                  >
                    <Power className="w-4 h-4" />
                  </button>
                </div>

                {/* Pressures Grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">TUBING PRESS (THP)</span>
                    <p className="font-bold text-sky-400 text-sm">{well.thpPsi} PSI</p>
                  </div>
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">CASING PRESS (CHP)</span>
                    <p className="font-bold text-amber-400 text-sm">{well.chpPsi} PSI</p>
                  </div>
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">FLOWLINE TEMP</span>
                    <p className="font-bold text-slate-200">{well.flowlineTempC} °C</p>
                  </div>
                  <div className="p-2 rounded bg-slate-950/70 border border-slate-800">
                    <span className="text-[10px] text-slate-500">WATER CUT BS&W</span>
                    <p className="font-bold text-orange-400">{well.waterCutPct}%</p>
                  </div>
                </div>

                {/* Flow Output */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono py-1.5 border-t border-slate-800/80">
                  <span className="text-slate-400">Oil Rate:</span>
                  <span className="font-bold text-amber-400">{formatNumber(well.oilFlowBopd, 0)} BOPD</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono pb-2">
                  <span className="text-slate-400">Gas Rate:</span>
                  <span className="font-bold text-cyan-400">{well.gasFlowMmscfd} MMSCFD</span>
                </div>

                {/* Choke Valve Slider */}
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-sky-400" /> Choke Opening:
                    </span>
                    <span className="font-bold text-sky-300">{well.chokeOpeningPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    disabled={isOff || esdStatus === "ESD_TRIPPED"}
                    value={well.chokeOpeningPct}
                    onChange={(e) => updateChokeOpening(well.id, parseInt(e.target.value))}
                    className="w-full accent-sky-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer disabled:opacity-30"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
