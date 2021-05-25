import { driveDuration } from "./drive-duration";
import { fuelConsumptionAtVelocity, fuelConsumptionForDistance } from "./fuel-consumption";
import { ComparisonArgs, ComparisonResults } from "./types";

const comparisonReport = async (values: ComparisonArgs): Promise<ComparisonResults> => {
    
    const duration1 = await driveDuration(values.velocity1, values.distance);
    const duration2 = await driveDuration(values.velocity2, values.distance);
    const consumption1 = await fuelConsumptionAtVelocity(values.vehicleType, values.velocity1);
    const consumption2 = await fuelConsumptionAtVelocity(values.vehicleType, values.velocity2);
    const totalConsumption1 = await fuelConsumptionForDistance(consumption1, values.distance);
    const totalConsumption2 = await fuelConsumptionForDistance(consumption2, values.distance);
    
    return {
        duration1,
        duration2,
        consumption1,
        consumption2,
        totalConsumption1,
        totalConsumption2
    };

}

export default comparisonReport;