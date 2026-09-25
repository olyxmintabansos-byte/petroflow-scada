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
  thpPsi: number;           // Tubing Head Pressure (psi)
  chpPsi: number;           // Casing Head Pressure (psi)
  chokeOpeningPct: number;  // Choke valve (0 - 100%)
  flowlineTempC: number;    // Flowline temp (Celsius)
  oilFlowBopd: number;      // Barrels of Oil Per Day
  gasFlowMmscfd: number;    // Million Standard Cubic Feet/Day
  waterCutPct: number;      // BS&W (%)
  status: WellStatus;
  gorScfBbl: number;        // Gas-Oil Ratio
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
