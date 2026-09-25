"use client";

import React, { useState } from "react";
import { usePetro } from "@/context/PetroContext";
import { formatNumber } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  FileText,
  Printer,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  Anchor,
  Flame,
  Building,
  QrCode,
} from "lucide-react";

export default function CustodyTransferPage() {
  const { custodyCert, updateCustodyParameters } = usePetro();

  const [grossInput, setGrossInput] = useState(custodyCert.grossObservedVolumeBbls);
  const [apiInput, setApiInput] = useState(custodyCert.observedApiGravity);
  const [tempInput, setTempInput] = useState(custodyCert.observedTempF);
  const [bswInput, setBswInput] = useState(custodyCert.basicSedimentWaterPct);

  const handleRecalculate = (
    newGross: number,
    newApi: number,
    newTemp: number,
    newBsw: number
  ) => {
    setGrossInput(newGross);
    setApiInput(newApi);
    setTempInput(newTemp);
    setBswInput(newBsw);
    updateCustodyParameters(newGross, newApi, newTemp, newBsw);
  };

  const handlePrint = () => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Bar for Action (Hidden on Print) */}
      <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 border border-sky-900/40">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-400" />
            SKK Migas Official Fiscal Custody Transfer & Crude Oil B/L Studio
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Berita Acara Serah Terima (BAST) & Bill of Lading Ekspor/Lifting Minyak Mentah (ASTM D1250)
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-sky-600/30 cursor-pointer"
        >
          <Printer className="w-4 h-4" /> CETAK DOKUMEN A4 (1-CLICK PRINT)
        </button>
      </div>

      {/* Fiscal Metering Adjustment Sliders (Hidden on Print) */}
      <div className="no-print p-5 rounded-xl bg-slate-900/80 border border-sky-900/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-400" />
            <h3 className="font-mono font-bold text-xs text-slate-200 uppercase tracking-wider">
              Fiscal Metering & Laboratory Calibration Sliders
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            API MPMS Chapter 11.1 / ASTM D1250 Table 5A &amp; 6A
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Gross Observed Bbls:</span>
              <span className="font-bold text-amber-400">{formatNumber(grossInput, 0)}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="300000"
              step="5000"
              value={grossInput}
              onChange={(e) => handleRecalculate(parseInt(e.target.value), apiInput, tempInput, bswInput)}
              className="w-full accent-amber-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Observed API @ Tank:</span>
              <span className="font-bold text-cyan-400">{apiInput}° API</span>
            </div>
            <input
              type="range"
              min="28.0"
              max="42.0"
              step="0.1"
              value={apiInput}
              onChange={(e) => handleRecalculate(grossInput, parseFloat(e.target.value), tempInput, bswInput)}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Observed Temp:</span>
              <span className="font-bold text-slate-200">{tempInput}° F</span>
            </div>
            <input
              type="range"
              min="60.0"
              max="110.0"
              step="0.5"
              value={tempInput}
              onChange={(e) => handleRecalculate(grossInput, apiInput, parseFloat(e.target.value), bswInput)}
              className="w-full accent-slate-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>BS&amp;W Sediment:</span>
              <span className="font-bold text-orange-400">{bswInput}%</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.50"
              step="0.01"
              value={bswInput}
              onChange={(e) => handleRecalculate(grossInput, apiInput, tempInput, parseFloat(e.target.value))}
              className="w-full accent-orange-400 bg-slate-800 h-1.5 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Official A4 Document Container */}
      <div className="max-w-[850px] mx-auto bg-white text-slate-900 shadow-2xl rounded-xl p-8 sm:p-12 border border-slate-300 font-sans print:border-none print:shadow-none print:p-0">
        {/* SKK Migas & KKKS Official Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded bg-slate-900 text-amber-400 flex items-center justify-center font-black text-xl">
              SKK
            </div>
            <div>
              <h1 className="text-base font-black tracking-wide text-slate-900 uppercase">
                SATUAN KERJA KHUSUS PELAKSANA KEGIATAN USAHA HULU MINYAK DAN GAS BUMI
              </h1>
              <h2 className="text-xs font-bold text-slate-600 tracking-wider">
                REPUBLIC OF INDONESIA // FISCAL CRUDE OIL LIFTING &amp; CUSTODY TRANSFER
              </h2>
            </div>
          </div>

          <div className="text-right font-mono text-[10px] text-slate-600">
            <p><strong>FORM:</strong> SKK-FISC-BL-09</p>
            <p><strong>REVISION:</strong> 2026.04</p>
            <p><strong>DISTRIBUTION:</strong> SKK, KKKS, MASTER</p>
          </div>
        </div>

        {/* Certificate Title Banner */}
        <div className="mt-4 text-center space-y-1">
          <h2 className="text-lg font-black tracking-wider uppercase underline underline-offset-4">
            CERTIFICATE OF FISCAL CUSTODY TRANSFER &amp; BILL OF LADING
          </h2>
          <p className="text-xs font-mono text-slate-600">
            BERITA ACARA SERAH TERIMA PENGAPALAN MINYAK MENTAH MAHAKAM LIGHT
          </p>
          <div className="inline-block px-3 py-0.5 rounded bg-slate-100 border border-slate-300 text-xs font-mono font-bold mt-1">
            B/L NO: {custodyCert.billOfLadingNo}
          </div>
        </div>

        {/* Operations Details Table */}
        <div className="mt-6 border border-slate-300 rounded-lg overflow-hidden text-xs">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700">KKKS OPERATOR:</td>
                <td className="w-1/4 p-2.5 font-mono">{custodyCert.operatorKkks}</td>
                <td className="w-1/4 p-2.5 bg-slate-50 font-bold text-slate-700">SKK PERMIT NO:</td>
                <td className="w-1/4 p-2.5 font-mono">{custodyCert.skkMigasPermitNo}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">OFFSHORE FIELD:</td>
                <td className="p-2.5 font-mono">{custodyCert.offshoreField}</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">LOADING TERMINAL:</td>
                <td className="p-2.5 font-mono">{custodyCert.loadingTerminal}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">VESSEL / TANKER:</td>
                <td className="p-2.5 font-mono font-bold">{custodyCert.tankerVesselName}</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">VESSEL FLAG:</td>
                <td className="p-2.5 font-mono">{custodyCert.vesselFlag}</td>
              </tr>
              <tr>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">LOADING DATE:</td>
                <td className="p-2.5 font-mono font-bold text-sky-800">{custodyCert.loadingDate}</td>
                <td className="p-2.5 bg-slate-50 font-bold text-slate-700">DESTINATION:</td>
                <td className="p-2.5 font-mono">{custodyCert.destinationPort}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Petroleum Calculations & Lab Analysis (ASTM D1250) */}
        <div className="mt-6 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            FISCAL VOLUMETRIC RECONCILIATION (ASTM D1250 / API MPMS CHAPTER 11.1)
          </h3>

          <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 font-bold text-left text-slate-700">
                  <th className="p-2.5">PARAMETER / UOM</th>
                  <th className="p-2.5 text-right">OBSERVED VALUE</th>
                  <th className="p-2.5 text-right">STANDARD (60°F)</th>
                  <th className="p-2.5 text-right">ASTM FACTOR / BASIS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono">
                <tr>
                  <td className="p-2.5 font-sans font-medium">Observed API Gravity &amp; Temperature</td>
                  <td className="p-2.5 text-right font-bold">{custodyCert.observedApiGravity}° API</td>
                  <td className="p-2.5 text-right font-bold text-sky-800">{custodyCert.standardApi60F}° API</td>
                  <td className="p-2.5 text-right text-slate-500">ASTM D1250 Table 5A</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-medium">Volume Correction Factor (VCF)</td>
                  <td className="p-2.5 text-right">{custodyCert.observedTempF}° F Tank Temp</td>
                  <td className="p-2.5 text-right font-bold text-emerald-700">{custodyCert.volumeCorrectionFactor}</td>
                  <td className="p-2.5 text-right text-slate-500">ASTM D1250 Table 6A</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-medium">Gross Observed Volume (GOV)</td>
                  <td className="p-2.5 text-right font-bold">{formatNumber(custodyCert.grossObservedVolumeBbls, 0)} BBLS</td>
                  <td className="p-2.5 text-right text-slate-500">-</td>
                  <td className="p-2.5 text-right text-slate-500">Shore Tank Gauging</td>
                </tr>
                <tr className="bg-slate-50/60">
                  <td className="p-2.5 font-sans font-medium">Gross Standard Volume (GSV @ 60°F)</td>
                  <td className="p-2.5 text-right text-slate-500">-</td>
                  <td className="p-2.5 text-right font-bold text-slate-900">{formatNumber(custodyCert.grossStandardVolumeBbls, 0)} BBLS</td>
                  <td className="p-2.5 text-right text-slate-500">GOV × VCF</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-medium">BS&amp;W Sediment &amp; Water Deduction</td>
                  <td className="p-2.5 text-right text-orange-700 font-bold">{custodyCert.basicSedimentWaterPct}% BS&amp;W</td>
                  <td className="p-2.5 text-right font-bold text-orange-700">-{custodyCert.bswDeductionBbls} BBLS</td>
                  <td className="p-2.5 text-right text-slate-500">ASTM D4007 Centrifuge</td>
                </tr>
                <tr className="bg-amber-50/80 font-bold text-slate-900">
                  <td className="p-3 font-sans text-sm">NET STANDARD VOLUME (NSV)</td>
                  <td className="p-3 text-right text-slate-500">-</td>
                  <td className="p-3 text-right text-base text-amber-800">{formatNumber(custodyCert.netStandardVolumeBbls, 1)} BBLS</td>
                  <td className="p-3 text-right text-xs">OFFICIAL FISCAL LIFTING</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="p-2.5 font-sans font-medium">Net Metric Tons Equivalent (MT)</td>
                  <td className="p-2.5 text-right text-slate-500">-</td>
                  <td className="p-2.5 text-right font-bold text-emerald-800">{formatNumber(custodyCert.metricTonsEquivalent, 1)} MT</td>
                  <td className="p-2.5 text-right text-slate-500">In Air Conversion</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Legal Declaration & Quality Assurance */}
        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-600 leading-relaxed font-sans">
          <strong>LEGAL STATEMENT:</strong> Kami yang bertanda tangan di bawah ini menyatakan bahwa pengukuran volume, berat jenis, dan analisis kadar air minyak mentah dilakukan secara bersama (*Joint Gauging*) sesuai dengan regulasi SKK Migas No. PTK-029/SKKO0000/2015/S0 dan standar internasional API MPMS. Dokumen ini sah dan mengikat sebagai bukti kepemilikan dan penyerahan hak milik minyak bumi.
        </div>

        {/* 3-Party Signatures Block */}
        <div className="mt-8 pt-4 border-t border-slate-300 grid grid-cols-3 gap-6 text-center text-xs font-sans">
          {/* Signatory 1: SKK Migas */}
          <div className="space-y-2">
            <p className="font-bold text-slate-700">SKK MIGAS REPRESENTATIVE</p>
            <p className="text-[10px] text-slate-500 font-mono">Senior Fiscal Gauger</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-sky-900 border-b border-dotted border-slate-400 px-4">
                H. Wicaksono
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{custodyCert.chiefGaugerName}</p>
            <p className="text-[9px] text-slate-400 font-mono">NIP: 19780412 200212 1 003</p>
          </div>

          {/* Signatory 2: KKKS OIM */}
          <div className="space-y-2">
            <p className="font-bold text-slate-700">OPERATOR KKKS OIM</p>
            <p className="text-[10px] text-slate-500 font-mono">Offshore Installation Mgr</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-amber-900 border-b border-dotted border-slate-400 px-4">
                Budi Prasetyo
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{custodyCert.oimName}</p>
            <p className="text-[9px] text-slate-400 font-mono">ID: PHM-OIM-8842</p>
          </div>

          {/* Signatory 3: Tanker Master */}
          <div className="space-y-2">
            <p className="font-bold text-slate-700">MASTER OF VESSEL</p>
            <p className="text-[10px] text-slate-500 font-mono">Tanker MT Mahakam Pioneer</p>
            <div className="h-16 flex items-center justify-center">
              <span className="font-serif italic text-base text-slate-800 border-b border-dotted border-slate-400 px-4">
                D. Arisandi
              </span>
            </div>
            <p className="font-bold text-slate-900 font-mono text-[11px]">{custodyCert.tankerMasterName}</p>
            <p className="text-[9px] text-slate-400 font-mono">IMO: 9482103</p>
          </div>
        </div>

        {/* Security QR Seal Footer */}
        <div className="mt-8 pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>AUTHENTICATED BY SKK MIGAS DIGITAL LEDGER // VERIF ID: {custodyCert.fiscalVerificationCode}</span>
          </div>
          <span>TIMESTAMP: 25-SEP-2026 11:15 UTC+8</span>
        </div>
      </div>
    </div>
  );
}