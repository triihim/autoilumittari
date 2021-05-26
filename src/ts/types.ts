export type FuelConsumption100 = number;

export type FuelConsumptionTotal = number;

export type FuelConsumptionMultiplier = number;

export type VelocityKMH = number;

export enum VehicleType { A, B, C };

export interface FuelConsumption100CalculationArgs {
    vehicleType: VehicleType,
    velocity: VelocityKMH
}

export interface FuelConstumptionTotalCalculationArgs {
    consumption: FuelConsumption100,
    distance: DistanceKM
}

export type DistanceKM = number;

export interface DriveDurationCalculationArgs {
    velocity: VelocityKMH,
    distance: DistanceKM
}

export type Seconds = number;

export type Minutes = number;

export type Hours = number;

export type Percentage = number;

export interface DurationHMS {
    hours: Hours,
    minutes: Minutes,
    seconds: Seconds
}

export interface ComparisonArgs {
    vehicleType: VehicleType,
    distance: DistanceKM,
    velocity1: VelocityKMH,
    velocity2: VelocityKMH
}

export interface ComparisonResults {
    duration1: DurationHMS,
    duration2: DurationHMS,
    consumption1: FuelConsumption100,
    consumption2: FuelConsumption100,
    totalConsumption1: FuelConsumptionTotal,
    totalConsumption2: FuelConsumptionTotal,
    durationDifference: DurationHMS,
    durationDifferencePercentage: Percentage
    consumptionDifference: FuelConsumption100,
    consumptionDifferencePercentage: Percentage,
    totalConsumptionDifference: FuelConsumptionTotal,
    totalConsumptionDifferencePercentage: Percentage
}