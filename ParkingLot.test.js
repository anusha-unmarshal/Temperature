const {ParkingLot} = require("./ParkingLot")

describe("Parking lot", () => {
    test("Park a vehicle", () => {
        const parking = new ParkingLot();
        const vehicle = "KA01MD1234";

        expect(parking.park(vehicle)).toBeTruthy();
    });
});