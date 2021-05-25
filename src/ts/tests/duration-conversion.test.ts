import { convertSecondsToHMS } from "../common";

describe("Seconds to hms conversion tests", () => {

    test("seconds mapped to hms correctly", () => {
        expect(convertSecondsToHMS(55)).toMatchObject({ hours: 0, minutes: 0, seconds: 55 });
    });

    test("minutes mapped to hms correctly", () => {
        expect(convertSecondsToHMS(120)).toMatchObject({ hours: 0, minutes: 2, seconds: 0 });
    });

    test("hours mapped to hms correctly", () => {
        expect(convertSecondsToHMS(7200)).toMatchObject({ hours: 2, minutes: 0, seconds: 0 });
    });

    test("combination of hours, minutes and seconds mapped to hms correctly", () => {
        expect(convertSecondsToHMS(51168)).toMatchObject({ hours: 14, minutes: 12, seconds: 48 });
    });

    test("seconds extending beyond 24h mapped correctly", () => {
        expect(convertSecondsToHMS(101168)).toMatchObject({ hours: 28, minutes: 6, seconds: 8 });
    });

});