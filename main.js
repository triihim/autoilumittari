function Car(type, baseConsumption) {
    if(baseConsumption < 1 || baseConsumption > 50) throw new RangeError("Invalid base consumption. Valid range: 1..50");
    this.type = type;
    this.baseConsumption = baseConsumption;
}

Car.prototype.consumptionMultiplierPerKmh = 1.009;

Car.prototype.getConsumptionAtSpeed = function(kmh) {
    if (kmh === 0) return 0;
    if(kmh < 0 || kmh > 300) throw new RangeError("Invalid kmh. Valid range: 0..300");
    return this.baseConsumption * Math.pow(this.consumptionMultiplierPerKmh, kmh-1);
}

function calculateDriveDurationInHours(distanceKm, speedKmh) {
    if(speedKmh <= 0) throw new RangeError("Invalid kmh. Speed cannot be negative or zero");
    return (distanceKm / speedKmh);
}

const carA = new Car("A", 3.0);
const carB = new Car("B", 3.5);
const carC = new Car("C", 4.0);

console.log(carB.getConsumptionAtSpeed(50));
console.log(calculateDriveDurationInHours(50, 100));