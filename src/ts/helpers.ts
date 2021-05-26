import { VehicleType, DistanceKM, DurationHMS, Seconds, VelocityKMH } from "./types";
import { VELOCITY_KMH_MIN, VELOCITY_KMH_MAX, DEFAULT_DECIMAL_PRECISION, DISTANCE_KM_MIN, DISTANCE_KM_MAX } from "./constants";

export const handleError = (e: Error): void => console.error(e);

export const assertNever = (x: never): never => { throw new Error("This should not happen") };

export const isValidVehicleType = (vehicleType: VehicleType): boolean => Object.values(VehicleType).includes(vehicleType);

export const isVelocityWithinRange = (velocity: VelocityKMH): boolean => velocity >= VELOCITY_KMH_MIN && velocity <= VELOCITY_KMH_MAX;

export const isValidDistance = (distance: DistanceKM): boolean => distance >= DISTANCE_KM_MIN && distance <= DISTANCE_KM_MAX;

export const roundToPrecision = (n: number, decimals: number = DEFAULT_DECIMAL_PRECISION) => parseFloat(n.toFixed(decimals));

export const convertSecondsToHMS = (seconds: Seconds): DurationHMS => {
    
    const f = (s: Seconds, hms: DurationHMS): DurationHMS => {
        const hours = Math.floor(s / 3600);
        const minutes = Math.floor(s / 60);
        if(s < 60) return { ...hms, seconds: Math.floor(s)};
        if(hours >= 1) return f(s - hours * 3600, { ...hms, hours: hours });
        if(minutes >= 1) return f(s - minutes * 60, { ...hms, minutes: minutes });
    }

    return f(seconds, { hours: 0, minutes: 0, seconds: 0 });
}

export const convertHMStoString = ({hours, minutes, seconds}: DurationHMS): string => {
    return [
        hours > 9 ? hours.toString() : "0" + hours, 
        minutes > 9 ? minutes.toString() : "0" + minutes,
        seconds > 9 ? seconds.toString() : "0" + seconds
    ].join(":");
}