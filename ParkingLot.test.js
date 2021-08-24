const {Vehicle, ParkingLot, Owner} = require("./ParkingLot")

describe("Parking lot", () => {
    const owner = new Owner();
    const parkingLot = new ParkingLot(1, owner);
    test("Park a vehicle", () => {
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(parkingLot.isParked(vehicle)).toBe(true);
    });

    test("Un-park a vehicle should not work without parking it first", () => {
        const vehicle = new Vehicle();

        const unparked = parkingLot.unpark(vehicle);

        expect(unparked).toBeFalsy();
    });

    test("Park and un-park a vehicle", () => {
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);
        const unparked = parkingLot.unpark(vehicle);

        expect(unparked).toBeTruthy();
    });

    test("Cannot park when lot is full", () => {
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(parkingLot.isParked(vehicle)).toBeFalsy();
    })

    test("Check if parking lot is full", () => {
        const isFull = parkingLot.isFull();

        expect(isFull).toBeTruthy();
    });

    test("Notify the owner when lot is full", () => {
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(owner.isLotFull).toBeTruthy();
    });

    test("Notify owner when parking slot is available", () => {
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);
        parkingLot.unpark(vehicle);

        expect(owner.isLotFull).toBeFalsy();
    })
});