import { FuelConsumption100CalculationArgs, VehicleType, FuelConsumption100, VelocityKMH, DistanceKM, FuelConstumptionTotalCalculationArgs, FuelConsumptionTotal } from "./types";
import { handleError, assertNever, isValidVehicleType, isVelocityWithinRange, roundToPrecision, isValidDistance } from "./common";
import { FUEL_CONSUMPTION_MULTIPLIER } from "./constants";

const validateForConsumptionAtVelocity = ({ vehicleType, velocity }: FuelConsumption100CalculationArgs): Promise<FuelConsumption100CalculationArgs> => {
    return new Promise((resolve, reject) => {
        if(false === isValidVehicleType(vehicleType)) reject(new Error("Invalid vehicle type"));
        if(false === isVelocityWithinRange(velocity)) reject(new Error("Invalid velocity. Valid range [0..300]"));
        resolve({vehicleType, velocity});
    });
}

const validateForTotalConsumption = ({consumption, distance}: FuelConstumptionTotalCalculationArgs): Promise<FuelConstumptionTotalCalculationArgs> => {
    return new Promise((resolve, reject) => {
        if(consumption < 0) reject(new Error("Invalid consumption. Consumption cannot be negative"));
        if(false === isValidDistance(distance)) reject(new Error("Invalid distance"));
        resolve({consumption, distance});
    });
}

const baseConsumption = (vehicleType: VehicleType): FuelConsumption100 => {
    switch(vehicleType) {
        case VehicleType.A: return 3.0;
        case VehicleType.B: return 3.5;
        case VehicleType.C: return 4.0;
        default: assertNever(vehicleType);
    }
}

const calculateConsumption100 = ({ vehicleType, velocity }: FuelConsumption100CalculationArgs): FuelConsumption100 => {
    // According to the spec, the consumption is multiplied by 1.009 per kmh increment.
    // consumption = baseConsumption * multiplier ^ (velocityInteger - 1)
    return velocity === 0 ? 0 : baseConsumption(vehicleType) * Math.pow(FUEL_CONSUMPTION_MULTIPLIER, Math.ceil(velocity) - 1);
}

const calculateTotalConsumption = ({ consumption, distance }: FuelConstumptionTotalCalculationArgs): FuelConsumptionTotal => {
    return consumption * distance / 100;
}

export const fuelConsumptionAtVelocity = (vehicleType: VehicleType, velocity: VelocityKMH): Promise<FuelConsumption100> => {
    return Promise.resolve({vehicleType, velocity})
        .then(validateForConsumptionAtVelocity)
        .catch(handleError)
        .then(calculateConsumption100)
        .then(roundToPrecision);
}

export const fuelConsumptionForDistance = (consumption: FuelConsumption100, distance: DistanceKM): Promise<FuelConsumptionTotal> => {
    return Promise.resolve({consumption, distance})
        .then(validateForTotalConsumption)
        .catch(handleError)
        .then(calculateTotalConsumption)
        .then(roundToPrecision);
}