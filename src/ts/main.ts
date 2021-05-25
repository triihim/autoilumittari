import { ComparisonArgs, VehicleType, DistanceKM, VelocityKMH } from "./types";
import { isValidDistance, isValidVehicleType, isVelocityWithinRange } from "./common";
import comparisonReport from "./comparison";

const vtypeButtons = document.querySelectorAll("#vehicle-type-controls button");
const distanceInput = document.querySelector("#distance");
const velocityInput1 = document.querySelector("#velocity-1");
const velocityInput2 = document.querySelector("#velocity-2");

const selections: ComparisonArgs = {
    vehicleType: undefined,
    distance: undefined,
    velocity1: undefined,
    velocity2: undefined
}

const validSelections = (): boolean => {
    return isValidVehicleType(selections.vehicleType) &&
           isValidDistance(selections.distance) &&
           isVelocityWithinRange(selections.velocity1) &&
           isVelocityWithinRange(selections.velocity2);
}

const updateResults = async (): Promise<void> => {
    if(validSelections()) {
        console.log(await comparisonReport(selections));
    }
}

const toggleVehicleTypeButtonActive = (active: HTMLButtonElement): void => {
    vtypeButtons.forEach(b => {
        b === active ? b.classList.add("active") : b.classList.remove("active");
    })
}

vtypeButtons.forEach(b => {
    b.addEventListener("click", (e: Event): void => {
        const clickedButton = (e.target as HTMLButtonElement);
        const type = clickedButton.value as keyof typeof VehicleType;
        selections.vehicleType = VehicleType[type];
        toggleVehicleTypeButtonActive(clickedButton);
        updateResults();
    });
});

distanceInput.addEventListener("keyup", (e: Event) => {
    selections.distance = parseInt((e.target as HTMLInputElement).value) as DistanceKM;
    updateResults();
});

velocityInput1.addEventListener("keyup", (e: Event) => {
    selections.velocity1 = parseInt((e.target as HTMLInputElement).value) as VelocityKMH;
    updateResults();
});

velocityInput2.addEventListener("keyup", (e: Event) => {
    selections.velocity2 = parseInt((e.target as HTMLInputElement).value) as VelocityKMH;
    updateResults();
});

