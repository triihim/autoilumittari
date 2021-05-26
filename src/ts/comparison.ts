import { convertSecondsToHMS, roundToPrecision } from "./helpers";
import { driveDuration } from "./drive-duration";
import { fuelConsumptionAtVelocity, fuelConsumptionForDistance } from "./fuel-consumption";
import { ComparisonArgs, ComparisonResults, DurationHMS, Percentage } from "./types";

const percentageDifference = (x: number, y: number): Percentage => {
    const z = Math.abs(x-y) / ((x+y) / 2) * 100;
    return roundToPrecision(z, 0);
}

const calculateDurationDifference = (d1: DurationHMS, d2: DurationHMS): DurationHMS => {
    return convertSecondsToHMS(Math.abs( (d1.hours * 3600 + d1.minutes * 60 + d1.seconds) - 
                                         (d2.hours * 3600 + d2.minutes * 60 + d2.seconds) ));
}

const calculateDurationDifferencePercentage = (d1: DurationHMS, d2: DurationHMS): Percentage => {
    const x = d1.hours * 3600 + d1.minutes * 60 + d1.seconds;
    const y = d2.hours * 3600 + d2.minutes * 60 + d2.seconds;
    return percentageDifference(x, y);
}

const comparisonReport = async (values: ComparisonArgs): Promise<ComparisonResults> => {
    
    const duration1 = await driveDuration(values.velocity1, values.distance);
    const duration2 = await driveDuration(values.velocity2, values.distance);
    const consumption1 = await fuelConsumptionAtVelocity(values.vehicleType, values.velocity1);
    const consumption2 = await fuelConsumptionAtVelocity(values.vehicleType, values.velocity2);
    const totalConsumption1 = await fuelConsumptionForDistance(consumption1, values.distance);
    const totalConsumption2 = await fuelConsumptionForDistance(consumption2, values.distance);
    const durationDifference = calculateDurationDifference(duration1, duration2);
    const durationDifferencePercentage = calculateDurationDifferencePercentage(duration1, duration2);
    const consumptionDifference = roundToPrecision(Math.abs(consumption1 - consumption2));
    const consumptionDifferencePercentage = percentageDifference(consumption1, consumption2);
    const totalConsumptionDifference = roundToPrecision(Math.abs(totalConsumption1 - totalConsumption2));
    const totalConsumptionDifferencePercentage = percentageDifference(totalConsumption1, totalConsumption2);

    return {
        duration1,
        duration2,
        consumption1,
        consumption2,
        totalConsumption1,
        totalConsumption2,
        durationDifference,
        durationDifferencePercentage,
        consumptionDifference,
        consumptionDifferencePercentage,
        totalConsumptionDifference,
        totalConsumptionDifferencePercentage
    };

}

export default comparisonReport;