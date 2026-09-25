"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Wellhead,
  ThreePhaseSeparator,
  CompressorTrain,
  FlareStack,
  PetroProductionKPIs,
  EsdStatus,
  MudLogRecord,
  BopTestRecord,
  CustodyTransferCertificate,
} from "@/types/petro";

const INITIAL_WELLHEADS: Wellhead[] = [
  {
    id: "W-BK-01",
    name: "Bekapai Platform A-01",
    formation: "Mahakam Delta Upper Miocene",
    thpPsi: 1420,
    chpPsi: 410,
    chokeOpeningPct: 48,
    flowlineTempC: 68.4,
    oilFlowBopd: 3450,
    gasFlowMmscfd: 8.4,
    waterCutPct: 14.2,
    status: "FLOWING_OPTIMAL",
    gorScfBbl: 2434,
  },
  {
    id: "W-BK-02",
    name: "Bekapai Platform A-02",
    formation: "Mahakam Main Carbonate Sand",
    thpPsi: 1680,
    chpPsi: 490,
    chokeOpeningPct: 62,
    flowlineTempC: 72.1,
    oilFlowBopd: 4820,
    gasFlowMmscfd: 12.1,
    waterCutPct: 8.5,
    status: "FLOWING_OPTIMAL",
    gorScfBbl: 2510,
  },
  {
    id: "W-BK-03",
    name: "Bekapai Platform A-03",
    formation: "Deep Fluvial Channel-04",
    thpPsi: 1120,
    chpPsi: 580,
    chokeOpeningPct: 35,
    flowlineTempC: 61.5,
    oilFlowBopd: 1950,
    gasFlowMmscfd: 5.2,
    waterCutPct: 38.6,
    status: "WATER_CONING_ALERT",
    gorScfBbl: 2666,
  },
  {
    id: "W-BK-04",
    name: "Bekapai Platform A-04",
    formation: "Mahakam Delta Upper Miocene",
    thpPsi: 1530,
    chpPsi: 430,
    chokeOpeningPct: 54,
    flowlineTempC: 69.8,
    oilFlowBopd: 3890,
    gasFlowMmscfd: 9.3,
    waterCutPct: 11.2,
    status: "FLOWING_OPTIMAL",
    gorScfBbl: 2390,
  },
  {
    id: "W-BK-05",
    name: "Bekapai Platform A-05",
    formation: "Sub-Salt Transgressive Member",
    thpPsi: 1890,
    chpPsi: 640,
    chokeOpeningPct: 70,
    flowlineTempC: 76.2,
    oilFlowBopd: 5420,
    gasFlowMmscfd: 14.8,
    waterCutPct: 5.1,
    status: "FLOWING_OPTIMAL",
    gorScfBbl: 2730,
  },
  {
    id: "W-BK-06",
    name: "Bekapai Platform A-06",
    formation: "Lower Deltaic Sand Bar",
    thpPsi: 980,
    chpPsi: 610,
    chokeOpeningPct: 20,
    flowlineTempC: 58.0,
    oilFlowBopd: 1200,
    gasFlowMmscfd: 3.1,
    waterCutPct: 49.5,
    status: "CHOKED_BACK",
    gorScfBbl: 2583,
  },
];

const INITIAL_SEPARATOR: ThreePhaseSeparator = {
  tag: "V-101 HP 3-PHASE SEPARATOR",
  pressurePsi: 645,
  temperatureC: 64.2,
  oilLevelPct: 58.4,
  waterLevelPct: 24.6,
  gasPressureDropPsi: 4.2,
  demisterPadDpMbar: 18.5,
  oilOutflowBpd: 20730,
  gasOutflowMmscfd: 52.9,
  waterOutflowBpd: 3820,
  reliefValveArmed: true,
};

const INITIAL_COMPRESSOR: CompressorTrain = {
  tag: "K-101 CENTRIFUGAL SALES GAS TRAIN",
  stage1SuctionPsi: 630,
  stage1DischargePsi: 1180,
  stage2DischargePsi: 2150,
  rpm: 10420,
  turbineTempC: 512,
  vibrationMmSec: 1.84,
  antiSurgeValvePct: 0,
  isRunning: true,
};

const INITIAL_FLARE: FlareStack = {
  tag: "FL-01 HIGH-EFFICIENCY SMOKELESS FLARE",
  purgeGasFlowScfm: 82,
  pilotStatus: "ALL_IGNITED",
  tipTempC: 745,
  hydrocarbonLossKgHr: 12.4,
};

const INITIAL_MUD_LOG: MudLogRecord = {
  depthMeasuredM: 3450.5,
  depthTrueVerticalM: 3120.2,
  ropMetersPerHr: 16.4,
  weightOnBitKlbs: 22.5,
  rotarySpeedRpm: 115,
  torqueKftLb: 14.2,
  standpipePressurePsi: 3240,
  mudWeightInPpg: 11.4,
  mudWeightOutPpg: 11.6,
  flowInGpm: 480,
  flowOutPct: 51,
  pitVolumeBbls: 840,
  totalGasUnits: 460,
  chromatography: {
    c1MethanePct: 83.4,
    c2EthanePct: 8.8,
    c3PropanePct: 4.6,
    ic4IsobutanePct: 1.4,
    nc4NormalButanePct: 1.2,
    c5PlusPentanesPct: 0.6,
  },
  lithology: "SANDSTONE",
  isGasKickDetected: false,
};

const INITIAL_BOP_TESTS: BopTestRecord[] = [
  {
    component: "Annular Preventer (Hydril 11\" 5K)",
    ratedWorkingPressurePsi: 5000,
    lowTestPressurePsi: 250,
    highTestPressurePsi: 3500,
    durationMins: 10,
    status: "PASS_VERIFIED",
    inspectionDate: "2026-09-24",
  },
  {
    component: "Upper Pipe Rams (Cameron 11\" 10K)",
    ratedWorkingPressurePsi: 10000,
    lowTestPressurePsi: 250,
    highTestPressurePsi: 10000,
    durationMins: 10,
    status: "PASS_VERIFIED",
    inspectionDate: "2026-09-24",
  },
  {
    component: "Blind Shear Rams (Cameron 11\" 10K)",
    ratedWorkingPressurePsi: 10000,
    lowTestPressurePsi: 250,
    highTestPressurePsi: 10000,
    durationMins: 10,
    status: "PASS_VERIFIED",
    inspectionDate: "2026-09-24",
  },
  {
    component: "Choke & Kill Manifold Valves",
    ratedWorkingPressurePsi: 10000,
    lowTestPressurePsi: 250,
    highTestPressurePsi: 10000,
    durationMins: 10,
    status: "PASS_VERIFIED",
    inspectionDate: "2026-09-24",
  },
];

const INITIAL_CUSTODY_CERT: CustodyTransferCertificate = {
  billOfLadingNo: "BL/SKK-MIGAS/BKP/2026/09/014",
  skkMigasPermitNo: "SKK/PST/EXP-OFF/7892/IX/2026",
  operatorKkks: "PT ENI INDONESIA / PT PERTAMINA HULU MAHAKAM",
  offshoreField: "BEKAPAI FIELD, OFFSHORE EAST KALIMANTAN",
  loadingTerminal: "SENIPAH CRUDE & CONDENSATE TERMINAL SBM-02",
  tankerVesselName: "MT MAHAKAM PIONEER",
  vesselFlag: "INDONESIA (JAKARTA)",
  destinationPort: "RU V CILACAP REFINERY JETTY",
  loadingDate: "25 SEPTEMBER 2026",
  observedApiGravity: 36.4,
  observedTempF: 84.5,
  standardApi60F: 34.8,
  volumeCorrectionFactor: 0.9884,
  grossObservedVolumeBbls: 150000,
  grossStandardVolumeBbls: 148260,
  basicSedimentWaterPct: 0.16,
  bswDeductionBbls: 237.2,
  netStandardVolumeBbls: 148022.8,
  metricTonsEquivalent: 20184.4,
  chiefGaugerName: "Ir. Hendro Wicaksono, ST (SKK Migas)",
  oimName: "Capt. Budi Prasetyo, M.Mar (KKKS OIM)",
  tankerMasterName: "Capt. Donald Arisandi (Master MT Mahakam)",
  fiscalVerificationCode: "SKK-VERIF-BKP-9884-9A21",
};

interface PetroContextType {
  wellheads: Wellhead[];
  separator: ThreePhaseSeparator;
  compressor: CompressorTrain;
  flare: FlareStack;
  kpis: PetroProductionKPIs;
  esdStatus: EsdStatus;
  mudLog: MudLogRecord;
  bopTests: BopTestRecord[];
  custodyCert: CustodyTransferCertificate;
  updateChokeOpening: (id: string, newChokePct: number) => void;
  toggleWellStatus: (id: string) => void;
  triggerEmergencyShutdown: () => void;
  resetEsdSystem: () => void;
  toggleCompressorState: () => void;
  adjustSeparatorPressure: (deltaPsi: number) => void;
  advanceDrillingStep: () => void;
  triggerGasKickSimulation: () => void;
  resolveGasKickAndKill: () => void;
  updateCustodyParameters: (
    observedGrossBbls: number,
    apiObserved: number,
    tempF: number,
    bswPct: number
  ) => void;
  resetToDefaults: () => void;
}

const PetroContext = createContext<PetroContextType | undefined>(undefined);

export const PetroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wellheads, setWellheads] = useState<Wellhead[]>(INITIAL_WELLHEADS);
  const [separator, setSeparator] = useState<ThreePhaseSeparator>(INITIAL_SEPARATOR);
  const [compressor, setCompressor] = useState<CompressorTrain>(INITIAL_COMPRESSOR);
  const [flare, setFlare] = useState<FlareStack>(INITIAL_FLARE);
  const [esdStatus, setEsdStatus] = useState<EsdStatus>("NORMAL_ARMED");
  const [mudLog, setMudLog] = useState<MudLogRecord>(INITIAL_MUD_LOG);
  const [bopTests] = useState<BopTestRecord[]>(INITIAL_BOP_TESTS);
  const [custodyCert, setCustodyCert] = useState<CustodyTransferCertificate>(INITIAL_CUSTODY_CERT);

  // Sync from LocalStorage
  useEffect(() => {
    try {
      const savedWells = localStorage.getItem("petro_wellheads_v1");
      const savedSep = localStorage.getItem("petro_sep_v1");
      const savedEsd = localStorage.getItem("petro_esd_v1");
      const savedMud = localStorage.getItem("petro_mudlog_v1");
      const savedCustody = localStorage.getItem("petro_custody_v1");
      if (savedWells) setWellheads(JSON.parse(savedWells));
      if (savedSep) setSeparator(JSON.parse(savedSep));
      if (savedEsd) setEsdStatus(JSON.parse(savedEsd));
      if (savedMud) setMudLog(JSON.parse(savedMud));
      if (savedCustody) setCustodyCert(JSON.parse(savedCustody));
    } catch {
      console.warn("Storage sync fallback");
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem("petro_wellheads_v1", JSON.stringify(wellheads));
    localStorage.setItem("petro_sep_v1", JSON.stringify(separator));
    localStorage.setItem("petro_esd_v1", JSON.stringify(esdStatus));
    localStorage.setItem("petro_mudlog_v1", JSON.stringify(mudLog));
    localStorage.setItem("petro_custody_v1", JSON.stringify(custodyCert));
  }, [wellheads, separator, esdStatus, mudLog, custodyCert]);

  // Dynamic KPI Recalculation
  const isTripped = esdStatus === "ESD_TRIPPED";
  const activeWells = wellheads.filter((w) => w.status !== "MAINTENANCE_BLOWDOWN");

  const totalGrossOil = isTripped
    ? 0
    : activeWells.reduce((acc, w) => acc + w.oilFlowBopd, 0);

  const totalSalesGas = isTripped
    ? 0
    : activeWells.reduce((acc, w) => acc + w.gasFlowMmscfd, 0);

  const totalProducedWater = isTripped
    ? 0
    : activeWells.reduce((acc, w) => acc + (w.oilFlowBopd * (w.waterCutPct / 100)), 0);

  const avgWaterCut = totalGrossOil > 0
    ? (totalProducedWater / (totalGrossOil + totalProducedWater)) * 100
    : 0;

  const kpis: PetroProductionKPIs = {
    totalGrossOilBopd: Math.round(totalGrossOil),
    totalSalesGasMmscfd: parseFloat(totalSalesGas.toFixed(1)),
    totalProducedWaterBpd: Math.round(totalProducedWater),
    fieldWaterCutAvgPct: parseFloat(avgWaterCut.toFixed(1)),
    flaredGasScfd: isTripped ? 245000 : 18500,
    pipelineExportPressurePsi: isTripped ? 0 : 1380 + Math.round(totalGrossOil * 0.008),
    operatingWellsCount: isTripped ? 0 : activeWells.length,
    shutInWellsCount: isTripped ? wellheads.length : wellheads.length - activeWells.length,
  };

  const updateChokeOpening = (id: string, newChokePct: number) => {
    if (esdStatus === "ESD_TRIPPED") return;
    setWellheads((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const clamped = Math.max(0, Math.min(100, newChokePct));
          const factor = clamped / (w.chokeOpeningPct || 1);
          const newOil = Math.round(w.oilFlowBopd * (0.3 + 0.7 * factor));
          const newGas = parseFloat((w.gasFlowMmscfd * (0.3 + 0.7 * factor)).toFixed(1));
          return {
            ...w,
            chokeOpeningPct: clamped,
            oilFlowBopd: clamped === 0 ? 0 : newOil,
            gasFlowMmscfd: clamped === 0 ? 0 : newGas,
            status: clamped === 0 ? "MAINTENANCE_BLOWDOWN" : clamped < 30 ? "CHOKED_BACK" : "FLOWING_OPTIMAL",
          };
        }
        return w;
      })
    );
  };

  const toggleWellStatus = (id: string) => {
    if (esdStatus === "ESD_TRIPPED") return;
    setWellheads((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const isOff = w.status === "MAINTENANCE_BLOWDOWN";
          return {
            ...w,
            status: isOff ? "FLOWING_OPTIMAL" : "MAINTENANCE_BLOWDOWN",
            chokeOpeningPct: isOff ? 50 : 0,
            oilFlowBopd: isOff ? 3200 : 0,
            gasFlowMmscfd: isOff ? 7.5 : 0,
          };
        }
        return w;
      })
    );
  };

  const triggerEmergencyShutdown = () => {
    setEsdStatus("ESD_TRIPPED");
    setCompressor((prev) => ({ ...prev, isRunning: false, rpm: 0, antiSurgeValvePct: 100 }));
    setSeparator((prev) => ({ ...prev, reliefValveArmed: false, oilOutflowBpd: 0, gasOutflowMmscfd: 0 }));
  };

  const resetEsdSystem = () => {
    setEsdStatus("NORMAL_ARMED");
    setWellheads(INITIAL_WELLHEADS);
    setSeparator(INITIAL_SEPARATOR);
    setCompressor(INITIAL_COMPRESSOR);
    setFlare(INITIAL_FLARE);
  };

  const toggleCompressorState = () => {
    if (esdStatus === "ESD_TRIPPED") return;
    setCompressor((prev) => ({
      ...prev,
      isRunning: !prev.isRunning,
      rpm: !prev.isRunning ? 10420 : 0,
    }));
  };

  const adjustSeparatorPressure = (deltaPsi: number) => {
    setSeparator((prev) => ({
      ...prev,
      pressurePsi: Math.max(300, Math.min(1000, prev.pressurePsi + deltaPsi)),
    }));
  };

  // Sprint 3: Mud Logging Logic
  const advanceDrillingStep = () => {
    setMudLog((prev) => {
      const newMd = parseFloat((prev.depthMeasuredM + 4.2).toFixed(1));
      const newTvd = parseFloat((prev.depthTrueVerticalM + 3.8).toFixed(1));
      const lithoCycle: ("SANDSTONE" | "SHALE" | "LIMESTONE" | "COAL")[] = [
        "SANDSTONE",
        "SHALE",
        "LIMESTONE",
        "COAL",
      ];
      const nextLitho = lithoCycle[Math.floor((newMd / 20) % 4)];
      return {
        ...prev,
        depthMeasuredM: newMd,
        depthTrueVerticalM: newTvd,
        ropMetersPerHr: parseFloat((14 + Math.random() * 6).toFixed(1)),
        weightOnBitKlbs: parseFloat((21 + Math.random() * 3).toFixed(1)),
        standpipePressurePsi: Math.round(3200 + Math.random() * 80),
        lithology: nextLitho,
      };
    });
  };

  const triggerGasKickSimulation = () => {
    setMudLog((prev) => ({
      ...prev,
      isGasKickDetected: true,
      totalGasUnits: 2850, // Massive gas surge
      mudWeightOutPpg: 10.8, // Cut by gas
      flowOutPct: 74, // Flow out > Flow in (Pit Gain)
      pitVolumeBbls: prev.pitVolumeBbls + 38,
      chromatography: {
        c1MethanePct: 91.2,
        c2EthanePct: 5.4,
        c3PropanePct: 2.1,
        ic4IsobutanePct: 0.7,
        nc4NormalButanePct: 0.4,
        c5PlusPentanesPct: 0.2,
      },
    }));
  };

  const resolveGasKickAndKill = () => {
    setMudLog((prev) => ({
      ...prev,
      isGasKickDetected: false,
      totalGasUnits: 460,
      mudWeightInPpg: 12.0, // Weighted up kill mud
      mudWeightOutPpg: 12.0,
      flowOutPct: 51,
      chromatography: INITIAL_MUD_LOG.chromatography,
    }));
  };

  // Sprint 4: ASTM D1250 Fiscal Custody Calculation
  const updateCustodyParameters = (
    observedGrossBbls: number,
    apiObserved: number,
    tempF: number,
    bswPct: number
  ) => {
    // ASTM D1250 Table 5A: Standard API @ 60°F approximation
    const deltaT = tempF - 60;
    const stdApi = parseFloat((apiObserved - 0.065 * deltaT).toFixed(1));
    // Table 6A Volume Correction Factor (VCF)
    const thermalExpansionAlpha = 0.00048;
    const vcf = parseFloat((1 - thermalExpansionAlpha * deltaT).toFixed(4));

    const gsv = Math.round(observedGrossBbls * vcf);
    const bswDeduction = parseFloat((gsv * (bswPct / 100)).toFixed(1));
    const nsv = parseFloat((gsv - bswDeduction).toFixed(1));
    const metricTons = parseFloat((nsv * 0.1363).toFixed(1));

    setCustodyCert((prev) => ({
      ...prev,
      grossObservedVolumeBbls: observedGrossBbls,
      observedApiGravity: apiObserved,
      observedTempF: tempF,
      standardApi60F: stdApi,
      volumeCorrectionFactor: vcf,
      grossStandardVolumeBbls: gsv,
      basicSedimentWaterPct: bswPct,
      bswDeductionBbls: bswDeduction,
      netStandardVolumeBbls: nsv,
      metricTonsEquivalent: metricTons,
    }));
  };

  const resetToDefaults = () => {
    setWellheads(INITIAL_WELLHEADS);
    setSeparator(INITIAL_SEPARATOR);
    setCompressor(INITIAL_COMPRESSOR);
    setFlare(INITIAL_FLARE);
    setEsdStatus("NORMAL_ARMED");
    setMudLog(INITIAL_MUD_LOG);
    setCustodyCert(INITIAL_CUSTODY_CERT);
    localStorage.clear();
  };

  return (
    <PetroContext.Provider
      value={
        {
          wellheads,
          separator,
          compressor,
          flare,
          kpis,
          esdStatus,
          mudLog,
          bopTests,
          custodyCert,
          updateChokeOpening,
          toggleWellStatus,
          triggerEmergencyShutdown,
          resetEsdSystem,
          toggleCompressorState,
          adjustSeparatorPressure,
          advanceDrillingStep,
          triggerGasKickSimulation,
          resolveGasKickAndKill,
          updateCustodyParameters,
          resetToDefaults,
        }
      }
    >
      {children}
    </PetroContext.Provider>
  );
};

export const usePetro = () => {
  const context = useContext(PetroContext);
  if (!context) throw new Error("usePetro must be used within PetroProvider");
  return context;
};