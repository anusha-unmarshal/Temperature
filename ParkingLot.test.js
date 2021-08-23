const {ParkingLot} = require("./ParkingLot")

describe("Parking lot", () => {
    const parking = new ParkingLot();
    test("Park a vehicle", () => {
        const vehicle = "KA01MD1234";

        expect(parking.park(vehicle)).toBeTruthy();
    });

    test("Unpark a vehicle", () => {
        const vehicle = parking.unpark();

        expect(vehicle).not.toBe(null);
    })
});