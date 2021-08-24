const {Vehicle, ParkingLot, Owner, TrafficCop, Attendant} = require("./ParkingLot")

describe("Parking lot", () => {

    test("Park a vehicle", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(parkingLot.isParked(vehicle)).toBe(true);
    });

    test("Un-park a vehicle should not work without parking it first", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        const unparked = parkingLot.unpark(vehicle);

        expect(unparked).toBeFalsy();
    });

    test("Park and un-park a vehicle", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);
        const unparked = parkingLot.unpark(vehicle);

        expect(unparked).toBeTruthy();
    });

    test("Cannot park when lot is full", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(0, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(parkingLot.isParked(vehicle)).toBeFalsy();
    })

    test("Check if parking lot is full", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(0, [owner, trafficCop]);
        const isFull = parkingLot.isFull();

        expect(isFull).toBeTruthy();
    });

    test("Notify the owner when lot is full", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(owner.isLotFull).toBeTruthy();
    });

    test("Notify owner when parking slot is available", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);
        parkingLot.unpark(vehicle);

        expect(owner.isLotFull).toBeFalsy();
    });

    test("Notify traffic cop when parking lot is full", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(trafficCop.isLotFull).toBeTruthy();
    });

    test("Notify traffic cop when parking slot is available", () => {
        const owner = new Owner();
        const trafficCop = new TrafficCop();
        const parkingLot = new ParkingLot(1, [owner, trafficCop]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);
        parkingLot.unpark(vehicle);

        expect(owner.isLotFull).toBeFalsy();
    });

    test("Expect car to be parked by attendant", () => {
        const attendant = new Attendant();
        const owner = new Owner(attendant);
        const parkingLot = new ParkingLot(1, [owner]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(parkingLot.isParked(vehicle)).toBeTruthy();
    });
});