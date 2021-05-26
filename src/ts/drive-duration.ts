import { convertSecondsToHMS, handleError, isValidDistance } from "./helpers";
import { VelocityKMH, DistanceKM, Seconds, DurationHMS, DriveDurationCalculationArgs } from "./types";

const validate = ({velocity, distance}: DriveDurationCalculationArgs): Promise<DriveDurationCalculationArgs> => {
    return new Promise((resolve, reject) => {
        if(false === isValidDistance(distance)) reject(new Error("Invalid distance. Distance must be positive"));
        if(velocity < 1) reject(new Error("Invalid velocity. Velocity must be positive to calculate duration"));
        resolve({velocity, distance});
    });
}

const calculateDriveDuration = ({velocity, distance}: DriveDurationCalculationArgs): Seconds => {
    return (distance / velocity) * 3600;
}

export const driveDuration = (velocity: VelocityKMH, distance: DistanceKM): Promise<DurationHMS> => {
    return Promise.resolve({velocity, distance})
        .then(validate)
        .catch(handleError)
        .then(calculateDriveDuration)
        .then(convertSecondsToHMS);
}