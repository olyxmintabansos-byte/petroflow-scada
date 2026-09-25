"use client";

import React from "react";
import { usePetro } from "@/context/PetroContext";
import { formatNumber } from "@/lib/utils";
import {
  Layers,
  Gauge,
  Flame,
  Wind,
  Droplets,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
} from "lucide-react";

export default function SeparatorPage() {
  const {
    separator,
    compressor,
    flare,
    adjustSeparatorPressure,
    toggleCompressorState,
  } = usePetro();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            3-Phase High Pressure Separator & Compressor Train
          </h2>
          <p className="text-xs text-slate-400">
            Pemisahan gravitasi fasa minyak, air terproduksi, gas asosiasi, serta kompresi gas ke pipa ekspor
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => adjustSeparatorPressure(25)}
            className="px-3 py-1.5 rounded bg-sky-950 border border-sky-700/50 text-sky-300 text-xs font-mono hover:bg-sky-900 transition-all cursor-pointer"
          >
            +25 PSI PRESS
          </button>
          <button
            onClick={() => adjustSeparatorPressure(-25)}
            className="px-3 py-1.5 rounded bg-sky-950 border border-sky-700/50 text-sky-300 text-xs font-mono hover:bg-sky-900 transition-all cursor-pointer"
          >
            -25 PSI PRESS
          </button>
        </div>
      </div>

      {/* 3-Phase Vessel Synoptic Cross-Section */}
      <div className="p-6 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-sky-400">{separator.tag}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600/40 text-emerald-300 font-bold">
              ASME SEC VIII DIV 1 COMPLIANT
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-400">
              VESSEL PRESSURE: <strong className="text-sky-300">{separator.pressurePsi} PSI</strong>
            </span>
            <span className="text-slate-400">
              VESSEL TEMP: <strong className="text-amber-300">{separator.temperatureC} °C</strong>
            </span>
          </div>
        </div>

        {/* Vessel Tank Schematic Graphic */}
        <div className="relative w-full h-48 rounded-xl bg-slate-950 border-2 border-sky-800/80 overflow-hidden p-3 flex flex-col justify-end">
          {/* Demister Pad Gas Phase (Top Layer) */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-cyan-950/40 to-transparent flex items-center justify-between px-6 border-b border-sky-800/30">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono font-bold text-cyan-300">
                ASSOCIATED GAS DOME ({separator.gasOutflowMmscfd} MMSCFD)
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              Demister DP: {separator.demisterPadDpMbar} mbar
            </span>
          </div>

          {/* Oil Layer (Middle) */}
          <div
            style={{ height: `${separator.oilLevelPct}%` }}
            className="w-full bg-gradient-to-b from-amber-600/80 to-amber-700/90 border-t border-amber-400/60 relative transition-all duration-500 flex items-center justify-between px-6"
          >
            <div className="flex items-center gap-2 text-slate-900 font-bold font-mono text-xs">
              <Flame className="w-4 h-4 text-amber-200" />
              <span>CRUDE OIL PHASE ({separator.oilLevelPct.toFixed(1)}% LEVEL)</span>
            </div>
            <span className="font-mono text-xs font-bold text-slate-950">
              OUTFLOW: {formatNumber(separator.oilOutflowBpd, 0)} BPD
            </span>
          </div>

          {/* Water Layer (Bottom) */}
          <div
            style={{ height: `${separator.waterLevelPct}%` }}
            className="w-full bg-gradient-to-b from-blue-700/80 to-blue-900 border-t border-blue-400/60 transition-all duration-500 flex items-center justify-between px-6"
          >
            <div className="flex items-center gap-2 text-slate-100 font-bold font-mono text-xs">
              <Droplets className="w-4 h-4 text-blue-300" />
              <span>PRODUCED WATER BOOT ({separator.waterLevelPct.toFixed(1)}% LEVEL)</span>
            </div>
            <span className="font-mono text-xs font-bold text-blue-200">
              DRAIN: {formatNumber(separator.waterOutflowBpd, 0)} BPD
            </span>
          </div>
        </div>

        {/* Separator Instrumentation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500">Gas DP Orifice:</span>
            <p className="text-sm font-bold text-cyan-400">{separator.gasPressureDropPsi} PSI</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500">Oil-Water Interface:</span>
            <p className="text-sm font-bold text-amber-400">NORMAL SHARP</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500">PSV Relief Valve:</span>
            <p className="text-sm font-bold text-emerald-400">
              {separator.reliefValveArmed ? "ARMED (750 PSI)" : "BLOWDOWN"}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <span className="text-slate-500">Retention Residence:</span>
            <p className="text-sm font-bold text-slate-200">4.8 MINS</p>
          </div>
        </div>
      </div>

      {/* Gas Compressor Train & Flare Stack Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Centrifugal Compressor */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-mono font-bold text-sm text-slate-100">{compressor.tag}</h3>
                <p className="text-[11px] text-slate-400">Gas Turbine Driven Two-Stage Barrel</p>
              </div>
            </div>

            <button
              onClick={toggleCompressorState}
              className={`px-3 py-1 rounded text-xs font-mono font-bold cursor-pointer transition-all ${
                compressor.isRunning
                  ? "bg-rose-950 border border-rose-600 text-rose-300 hover:bg-rose-900"
                  : "bg-emerald-950 border border-emerald-600 text-emerald-300 hover:bg-emerald-900"
              }`}
            >
              {compressor.isRunning ? "STOP TRAIN" : "START TRAIN"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Turbine Speed:</span>
              <p className="text-lg font-bold text-cyan-400">{compressor.rpm} RPM</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Exhaust Temp:</span>
              <p className="text-lg font-bold text-amber-400">{compressor.turbineTempC} °C</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Stage 1 Suction / Disch:</span>
              <p className="font-bold text-slate-200">
                {compressor.stage1SuctionPsi} / {compressor.stage1DischargePsi} PSI
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Discharge to Pipeline:</span>
              <p className="font-bold text-emerald-400">{compressor.stage2DischargePsi} PSI</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Shaft Vibration:</span>
              <p className="font-bold text-emerald-300">{compressor.vibrationMmSec} mm/s (ISO 10816)</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Anti-Surge Bypass:</span>
              <p className="font-bold text-sky-400">{compressor.antiSurgeValvePct}% CLOSED</p>
            </div>
          </div>
        </div>

        {/* Flare Stack Telemetry */}
        <div className="p-5 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-4">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            <div>
              <h3 className="font-mono font-bold text-sm text-slate-100">{flare.tag}</h3>
              <p className="text-[11px] text-slate-400">Emission Monitoring & Smokeless Purge</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Tip Temperature:</span>
              <p className="text-lg font-bold text-rose-400">{flare.tipTempC} °C</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Hydrocarbon Loss:</span>
              <p className="text-lg font-bold text-orange-400">{flare.hydrocarbonLossKgHr} kg/hr</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Purge Gas Flow:</span>
              <p className="font-bold text-slate-200">{flare.purgeGasFlowScfm} SCFM N2/Fuel</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-slate-500">Pilot Ignition Status:</span>
              <p className="font-bold text-emerald-400">{flare.pilotStatus}</p>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-[11px] text-slate-300">
              KLHK Permen LHK No. 13/2009 Flare Gas Compliance: Flaring berada di bawah ambang batas emisi 2.0% dari total gas asosiasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
