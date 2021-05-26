import { ComparisonArgs, VehicleType, DistanceKM, VelocityKMH } from "./types";
import { convertHMStoString, isValidDistance, isValidVehicleType, isVelocityWithinRange } from "./helpers";
import comparisonReport from "./comparison";
import { DISTANCE_KM_MAX, DISTANCE_KM_MIN, VELOCITY_KMH_MAX, VELOCITY_KMH_MIN } from "./constants";

const initialise = () => {

    const vehicleTypeButtons = document.querySelectorAll("#vehicle-type-controls button");
    const distanceInput = document.querySelector("#distance");
    const velocityInput1 = document.querySelector("#velocity-1");
    const velocityInput2 = document.querySelector("#velocity-2");
    const resultVelocity1 = document.querySelector("#result-velocity-1");
    const resultVelocity2 = document.querySelector("#result-velocity-2");
    const resultDuration1 = document.querySelector("#result-duration-1");
    const resultDuration2 = document.querySelector("#result-duration-2");
    const resultDurationDiff = document.querySelector("#result-duration-diff");
    const resultDurationDiffPercentage = document.querySelector("#result-duration-diff-percentage");
    const resultConsumption1 = document.querySelector("#result-consumption-1");
    const resultConsumption2 = document.querySelector("#result-consumption-2");
    const resultConsumptionDiff = document.querySelector("#result-consumption-diff");
    const resultConsumptionDiffPercentage = document.querySelector("#result-consumption-diff-percentage");
    const resultTotalConsumption1 = document.querySelector("#result-tot-consumption-1");
    const resultTotalConsumption2 = document.querySelector("#result-tot-consumption-2");
    const resultTotalConsumptionDiff = document.querySelector("#result-tot-consumption-diff");
    const resultTotalConsumptionDiffPercentage = document.querySelector("#result-tot-consumption-diff-percentage");

    const selections: ComparisonArgs = {
        vehicleType: undefined,
        distance: undefined,
        velocity1: undefined,
        velocity2: undefined
    }

    const isValidDigitInput = (code: string): boolean => /Digit[\d]|Numpad[\d]|Backspace|Delete|Tab/.test(code);

    const clampNumberInput = (input: HTMLInputElement, min: number, max: number, value: number): void => {
        if(value < min) input.value = min.toString();
        if(value > max) input.value = max.toString();
    }

    const constraintNumberInput = (e: KeyboardEvent): void => {
        if(false === isValidDigitInput(e.code)) e.preventDefault();
    }

    const validSelections = (): boolean => {
        return !isNaN(selections.distance) &&
            !isNaN(selections.velocity1) &&
            !isNaN(selections.velocity2) &&
            isValidVehicleType(selections.vehicleType) &&
            isValidDistance(selections.distance) &&
            isVelocityWithinRange(selections.velocity1) &&
            isVelocityWithinRange(selections.velocity2);
    }

    const updateResults = async (): Promise<void> => {
        if(validSelections()) {
            const report = await comparisonReport(selections);
            resultVelocity1.innerHTML = selections.velocity1.toString();
            resultVelocity2.innerHTML = selections.velocity2.toString();
            resultDuration1.innerHTML = convertHMStoString(report.duration1);
            resultDuration2.innerHTML = convertHMStoString(report.duration2);
            resultDurationDiff.innerHTML = convertHMStoString(report.durationDifference);
            resultDurationDiffPercentage.innerHTML = report.durationDifferencePercentage.toString();
            resultConsumption1.innerHTML = report.consumption1.toString();
            resultConsumption2.innerHTML = report.consumption2.toString();
            resultConsumptionDiff.innerHTML = report.consumptionDifference.toString();
            resultConsumptionDiffPercentage.innerHTML = report.consumptionDifferencePercentage.toString();
            resultTotalConsumption1.innerHTML = report.totalConsumption1.toString();
            resultTotalConsumption2.innerHTML = report.totalConsumption2.toString();
            resultTotalConsumptionDiff.innerHTML = report.totalConsumptionDifference.toString();
            resultTotalConsumptionDiffPercentage.innerHTML = report.totalConsumptionDifferencePercentage.toString();
        }
    }

    const toggleVehicleTypeButtonActive = (active: HTMLButtonElement): void => {
        vehicleTypeButtons.forEach(b => {
            b === active ? b.classList.add("active") : b.classList.remove("active");
        })
    }

    vehicleTypeButtons.forEach(b => {
        b.addEventListener("click", (e: Event): void => {
            const clickedButton = (e.target as HTMLButtonElement);
            const type = clickedButton.value as keyof typeof VehicleType;
            selections.vehicleType = VehicleType[type];
            toggleVehicleTypeButtonActive(clickedButton);
            updateResults();
        });
    });

    distanceInput.addEventListener("keypress", constraintNumberInput);
    velocityInput1.addEventListener("keypress", constraintNumberInput);
    velocityInput2.addEventListener("keypress", constraintNumberInput);

    distanceInput.addEventListener("keyup", (e: KeyboardEvent) => {
        const input = e.target as HTMLInputElement;
        const newDistance = parseInt(input.value);
        clampNumberInput(input, DISTANCE_KM_MIN, DISTANCE_KM_MAX, newDistance);
        selections.distance = parseInt(input.value) as DistanceKM;
        updateResults();
    });

    velocityInput1.addEventListener("keyup", (e: Event) => {
        const input = e.target as HTMLInputElement;
        const newVelocity = parseInt(input.value);
        clampNumberInput(input, VELOCITY_KMH_MIN, VELOCITY_KMH_MAX, newVelocity);
        selections.velocity1 = parseInt(input.value) as VelocityKMH;
        updateResults();
    });

    velocityInput2.addEventListener("keyup", (e: Event) => {
        const input = e.target as HTMLInputElement;
        const newVelocity = parseInt(input.value);
        clampNumberInput(input, VELOCITY_KMH_MIN, VELOCITY_KMH_MAX, newVelocity);
        selections.velocity2 = parseInt(input.value) as VelocityKMH;
        updateResults();
    });

}

export default initialise;