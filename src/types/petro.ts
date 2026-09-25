export type WellStatus =
  | "FLOWING_OPTIMAL"
  | "CHOKED_BACK"
  | "SHUT_IN_HIGH_PRESSURE"
  | "WATER_CONING_ALERT"
  | "MAINTENANCE_BLOWDOWN";

export type EsdStatus = "NORMAL_ARMED" | "STAGE_1_ALARM" | "ESD_TRIPPED";

export interface Wellhead {
  id: string;
  name: string;
  formation: string;
  thpPsi: number;
  chpPsi: number;
  chokeOpeningPct: number;
  flowlineTempC: number;
  oilFlowBopd: number;
  gasFlowMmscfd: number;
  waterCutPct: number;
  status: WellStatus;
  gorScfBbl: number;
}

export interface ThreePhaseSeparator {
  tag: string;
  pressurePsi: number;
  temperatureC: number;
  oilLevelPct: number;
  waterLevelPct: number;
  gasPressureDropPsi: number;
  demisterPadDpMbar: number;
  oilOutflowBpd: number;
  gasOutflowMmscfd: number;
  waterOutflowBpd: number;
  reliefValveArmed: boolean;
}

export interface CompressorTrain {
  tag: string;
  stage1SuctionPsi: number;
  stage1DischargePsi: number;
  stage2DischargePsi: number;
  rpm: number;
  turbineTempC: number;
  vibrationMmSec: number;
  antiSurgeValvePct: number;
  isRunning: boolean;
}

export interface FlareStack {
  tag: string;
  purgeGasFlowScfm: number;
  pilotStatus: "ALL_IGNITED" | "PILOT_FAIL_WARN" | "OFFLINE";
  tipTempC: number;
  hydrocarbonLossKgHr: number;
}

export interface PetroProductionKPIs {
  totalGrossOilBopd: number;
  totalSalesGasMmscfd: number;
  totalProducedWaterBpd: number;
  fieldWaterCutAvgPct: number;
  flaredGasScfd: number;
  pipelineExportPressurePsi: number;
  operatingWellsCount: number;
  shutInWellsCount: number;
}

// Sprint 3 & 4 Types
export interface GasChromatography {
  c1MethanePct: number;
  c2EthanePct: number;
  c3PropanePct: number;
  ic4IsobutanePct: number;
  nc4NormalButanePct: number;
  c5PlusPentanesPct: number;
}

export interface MudLogRecord {
  depthMeasuredM: number;
  depthTrueVerticalM: number;
  ropMetersPerHr: number;
  weightOnBitKlbs: number;
  rotarySpeedRpm: number;
  torqueKftLb: number;
  standpipePressurePsi: number;
  mudWeightInPpg: number;
  mudWeightOutPpg: number;
  flowInGpm: number;
  flowOutPct: number;
  pitVolumeBbls: number;
  totalGasUnits: number;
  chromatography: GasChromatography;
  lithology: "SANDSTONE" | "SHALE" | "LIMESTONE" | "COAL" | "DOLOMITE";
  isGasKickDetected: boolean;
}

export interface BopTestRecord {
  component: string;
  ratedWorkingPressurePsi: number;
  lowTestPressurePsi: number;
  highTestPressurePsi: number;
  durationMins: number;
  status: "PASS_VERIFIED" | "FAIL_LEAK" | "PENDING_CYCLE";
  inspectionDate: string;
}

export interface CustodyTransferCertificate {
  billOfLadingNo: string;
  skkMigasPermitNo: string;
  operatorKkks: string;
  offshoreField: string;
  loadingTerminal: string;
  tankerVesselName: string;
  vesselFlag: string;
  destinationPort: string;
  loadingDate: string;
  observedApiGravity: number;
  observedTempF: number;
  standardApi60F: number;
  volumeCorrectionFactor: number;
  grossObservedVolumeBbls: number;
  grossStandardVolumeBbls: number;
  basicSedimentWaterPct: number;
  bswDeductionBbls: number;
  netStandardVolumeBbls: number;
  metricTonsEquivalent: number;
  chiefGaugerName: string;
  oimName: string;
  tankerMasterName: string;
  fiscalVerificationCode: string;
}