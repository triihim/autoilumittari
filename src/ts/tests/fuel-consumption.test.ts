import { fuelConsumptionAtVelocity, fuelConsumptionForDistance } from "../fuel-consumption";
import { VehicleType } from "../types";

describe("Fuel consumption calculation tests", () => {

    test("Velocity of 0 kmh results in 0 consumption", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.A, 0)).resolves.toBe(0);
    });
    
    test("Velocity of 1 kmh results in base consumption for vehicle type A", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.A, 1)).resolves.toBe(3.0);
    });

    test("Velocity of 1 kmh results in base consumption for vehicle type B", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.B, 1)).resolves.toBe(3.5);
    });

    test("Velocity of 1 kmh results in base consumption for vehicle type C", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.C, 1)).resolves.toBe(4.0);
    });
    
    test("Negative velocity results in error", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.A, -1)).rejects.toBeInstanceOf(Error);
    });
    
    test("Too high velocity results in error", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.A, 301)).rejects.toBeInstanceOf(Error);
    });
    
    test("Fuel consumption is calculated correctly for vehicle type A", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.A, 50)).resolves.toBe(4.65);
    });

    test("Fuel consumption is calculated correctly for vehicle type B", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.B, 50)).resolves.toBe(5.43);
    });

    test("Fuel consumption is calculated correctly for vehicle type C", () => {
        return expect(fuelConsumptionAtVelocity(VehicleType.C, 50)).resolves.toBe(6.20);
    });

    test("Total fuel consumption for distance is calculated correctly", () => {
        return expect(fuelConsumptionForDistance(5.0, 150)).resolves.toBe(7.5);
    });

});