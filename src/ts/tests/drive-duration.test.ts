import { driveDuration } from "../drive-duration";

describe("Drive duration tests", () => {

    test("0 velocity results in error", () => {
        return expect(driveDuration(0, 100)).rejects.toBeInstanceOf(Error);
    });

    test("duration is calculated correctly", () => {
        return expect(driveDuration(80, 270)).resolves.toMatchObject({hours: 3, minutes: 22, seconds: 30});
    });

});