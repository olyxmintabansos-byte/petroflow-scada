"use client";

import React from "react";
import { usePetro } from "@/context/PetroContext";
import { formatNumber } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Compass,
  Database,
  Flame,
  Layers,
  Play,
  RotateCcw,
  ShieldAlert,
  Wind,
} from "lucide-react";

export default function MudLoggingPage() {
  const {
    mudLog,
    bopTests,
    advanceDrillingStep,
    triggerGasKickSimulation,
    resolveGasKickAndKill,
  } = usePetro();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Drilling Mud Logging & Formation Gas Chromatography
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Rig Apex Pioneer-1 // Well BK-07 Development Drilling // Bit: PDC 8-1/2" Matrix Body
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={advanceDrillingStep}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-sky-950 border border-sky-600/50 text-sky-300 text-xs font-mono hover:bg-sky-900 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 text-sky-400" /> +4.2m ADVANCE BIT
          </button>

          {mudLog.isGasKickDetected ? (
            <button
              onClick={resolveGasKickAndKill}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> CIRCULATE & KILL KICK
            </button>
          ) : (
            <button
              onClick={triggerGasKickSimulation}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-rose-950/80 border border-rose-600 text-rose-300 text-xs font-mono font-bold hover:bg-rose-900 transition-all cursor-pointer animate-pulse"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> INJECT GAS KICK
            </button>
          )}
        </div>
      </div>

      {/* Gas Kick Emergency Alert Banner */}
      {mudLog.isGasKickDetected && (
        <div className="p-4 rounded-xl bg-rose-950/90 border-2 border-rose-600 text-rose-200 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-rose-400 flex-shrink-0" />
            <div>
              <h3 className="font-mono font-bold text-sm uppercase tracking-wider text-rose-100">
                CRITICAL INFLUX DETECTED: FORMATION GAS KICK (PIT GAIN +38 BBLS)
              </h3>
              <p className="text-xs text-rose-300 font-mono mt-0.5">
                Total gas melonjak drastis ke {mudLog.totalGasUnits} unit. Mud weight cut: {mudLog.mudWeightOutPpg} ppg.
                Tutup Annular Preventer dan siapkan Driller&apos;s Method kill mud (12.0 ppg).
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-rose-900 font-mono text-xs font-bold uppercase text-white">
            BOP SOFT SHUT-IN
          </span>
        </div>
      )}

      {/* Drilling Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <span className="text-xs text-slate-400 font-mono">MEASURED DEPTH (MD)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-cyan-400">
              {formatNumber(mudLog.depthMeasuredM, 1)}
            </span>
            <span className="text-xs font-mono text-slate-400">m MD</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            TVD: {formatNumber(mudLog.depthTrueVerticalM, 1)} m TVD
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <span className="text-xs text-slate-400 font-mono">RATE OF PENETRATION</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-amber-400">
              {mudLog.ropMetersPerHr}
            </span>
            <span className="text-xs font-mono text-slate-400">m / hr</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            WOB: {mudLog.weightOnBitKlbs} klbs // RPM: {mudLog.rotarySpeedRpm}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <span className="text-xs text-slate-400 font-mono">MUD WEIGHT (IN / OUT)</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-mono font-bold text-emerald-400">
              {mudLog.mudWeightInPpg} / {mudLog.mudWeightOutPpg}
            </span>
            <span className="text-xs font-mono text-slate-400">PPG</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            Delta Mud Density: {(mudLog.mudWeightOutPpg - mudLog.mudWeightInPpg).toFixed(2)} ppg
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
          <span className="text-xs text-slate-400 font-mono">TOTAL GAS SURGE</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span
              className={`text-2xl font-mono font-bold ${
                mudLog.isGasKickDetected ? "text-rose-400 animate-pulse" : "text-sky-400"
              }`}
            >
              {mudLog.totalGasUnits}
            </span>
            <span className="text-xs font-mono text-slate-400">UNITS</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-500 font-mono">
            Pit Active Volume: {mudLog.pitVolumeBbls} BBLS
          </p>
        </div>
      </div>

      {/* Main Grid: Chromatography + Lithology Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gas Chromatography Breakdown */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-mono font-bold text-sm text-slate-100">
                  Hydrocarbon Gas Chromatography (FID Detector)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Komposisi gas hidrokarbon formasi dari degasser mud logging
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950 border border-sky-700/50 text-sky-300 font-bold">
              C1 - C5 SPECTRUM
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* C1 Methane */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>C1 (Methane):</span>
                <span className="font-bold text-cyan-400">{mudLog.chromatography.c1MethanePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${mudLog.chromatography.c1MethanePct}%` }}
                  className="bg-cyan-500 h-full rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* C2 Ethane */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>C2 (Ethane):</span>
                <span className="font-bold text-sky-400">{mudLog.chromatography.c2EthanePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${mudLog.chromatography.c2EthanePct * 5}%` }}
                  className="bg-sky-400 h-full rounded-full transition_all duration-500"
                />
              </div>
            </div>

            {/* C3 Propane */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>C3 (Propane):</span>
                <span className="font-bold text-amber-400">{mudLog.chromatography.c3PropanePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${mudLog.chromatography.c3PropanePct * 10}%` }}
                  className="bg-amber-400 h-full rounded-full transition_all duration-500"
                />
              </div>
            </div>

            {/* iC4 Isobutane */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>iC4 (Isobutane):</span>
                <span className="font-bold text-orange-400">{mudLog.chromatography.ic4IsobutanePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${mudLog.chromatography.ic4IsobutanePct * 20}%` }}
                  className="bg-orange-400 h-full rounded-full transition_all duration-500"
                />
              </div>
            </div>

            {/* nC4 Normal Butane */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>nC4 (Normal Butane):</span>
                <span className="font-bold text-orange-300">{mudLog.chromatography.nc4NormalButanePct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${mudLog.chromatography.nc4NormalButanePct * 20}%` }}
                  className="bg-orange-500 h-full rounded-full transition_all duration-500"
                />
              </div>
            </div>

            {/* C5+ Pentanes */}
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>C5+ (Heavy Condensate):</span>
                <span className="font-bold text-rose-400">{mudLog.chromatography.c5PlusPentanesPct}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  style={{ width: `${mudLog.chromatography.c5PlusPentanesPct * 30}%` }}
                  className="bg-rose-500 h-full rounded-full transition_all duration-500"
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 text-[11px] font-mono text-slate-300">
            <strong>Gas Wetness Ratio (Wh):</strong> {((mudLog.chromatography.c2EthanePct + mudLog.chromatography.c3PropanePct) / mudLog.chromatography.c1MethanePct * 100).toFixed(1)}% (Karakteristik Light Oil & Condensate Cap).
          </div>
        </div>

        {/* Formation Lithology Strip & Hydraulics */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="font-mono font-bold text-sm text-slate-100">
                Current Formation Stratigraphy & Mud Hydraulics
              </h3>
              <p className="text-[11px] text-slate-400">
                Litologi cutting batuan dan sirkulasi hidrolika lubang sumur
              </p>
            </div>
          </div>

          {/* Lithology Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-sky-900/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500">CURRENT CUTTINGS BED</span>
              <p className="text-xl font-bold font-mono text-amber-400">{mudLog.lithology} INTERVAL</p>
              <p className="text-xs text-slate-400">Porosity 22.4% // Permeability 180 mD // Good Hydrocarbon Fluorescence</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Database className="w-6 h-6" />
            </div>
          </div>

          {/* Mud Hydraulics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Standpipe Pressure:</span>
              <p className="text-sm font-bold text-sky-400">{mudLog.standpipePressurePsi} PSI</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Pump Flow Rate:</span>
              <p className="text-sm font-bold text-emerald-400">{mudLog.flowInGpm} GPM (2x Triplex)</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Return Flow Sensor:</span>
              <p className="text-sm font-bold text-amber-400">{mudLog.flowOutPct}% Paddle Deflection</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Drill String Torque:</span>
              <p className="text-sm font-bold text-slate-200">{mudLog.torqueKftLb} kft-lb</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOP Stack Certification Checklist */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-mono font-bold text-sm text-slate-100">
              Blowout Preventer (BOP) Stack Pressure Test Certification (API RP 53)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">14-Day Regulatory Test Cycle</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {bopTests.map((bop, idx) => (
            <div key={idx} className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">{bop.component}</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-emerald-950 text-emerald-300 border border-emerald-700/40">
                  PASSED
                </span>
              </div>
              <p className="text-slate-500 text-[10px]">Rated: {bop.ratedWorkingPressurePsi} PSI</p>
              <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                <span className="text-slate-400">Low/High Test:</span>
                <span className="text-emerald-400 font-bold">{bop.lowTestPressurePsi}/{bop.highTestPressurePsi} PSI</span>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Hold Duration:</span>
                <span>{bop.durationMins} Mins (Zero Drift)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}