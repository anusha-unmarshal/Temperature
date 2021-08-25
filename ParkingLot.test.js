const {Vehicle, ParkingLot, Owner, TrafficCop, Attendant, Availability, Capacity} = require("./ParkingLot")

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
        const owner = new Owner();
        const parkingLot = new ParkingLot(1, [owner]);
        const vehicle = new Vehicle();
        const attendant = new Attendant([parkingLot]);

        attendant.park(vehicle);

        expect(parkingLot.isParked(vehicle)).toBeTruthy();
    });

    test("Expect car to be un-parked by attendant", () => {
        const owner = new Owner();
        const parkingLot = new ParkingLot(1, [owner]);
        const vehicle = new Vehicle();
        const attendant = new Attendant([parkingLot]);

        attendant.park(vehicle);
        attendant.unpark(vehicle);

        expect(parkingLot.isParked(vehicle)).toBeFalsy();
    });

    test("Notify the attendant when lot is full", () => {
        const parkingLot = new ParkingLot(1, []);
        const attendant = new Attendant([parkingLot]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);

        expect(attendant.isLotFull).toBeTruthy();
    });

    test("Notify attendant when parking slot is available", () => {
        const parkingLot = new ParkingLot(1, []);
        const attendant = new Attendant([parkingLot]);
        const vehicle = new Vehicle();

        parkingLot.park(vehicle);
        parkingLot.unpark(vehicle);

        expect(attendant.isLotFull).toBeFalsy();
    });

    test("Attendant with multiple parking lots parks in one of them", () => {
        const parkingLot1 = new ParkingLot(0, []);
        const parkingLot2 = new ParkingLot(1, []);
        const attendant = new Attendant([parkingLot1, parkingLot2]);

        const vehicle = new Vehicle();

        attendant.park(vehicle);

        expect(parkingLot2.isParked(vehicle)).toBeTruthy();
    });

    test("Park vehicle in lot with highest available space", () => {
        const parkingLot1 = new ParkingLot(0, []);
        const parkingLot2 = new ParkingLot(3, []);
        const attendant = new Attendant([parkingLot1, parkingLot2]);

        const vehicle = new Vehicle();

        attendant.park(vehicle);

        expect(parkingLot2.isParked(vehicle)).toBeTruthy();
    });

    test("Park vehicle in lot which has most capacity and is available", () => {
        const parkingLot1 = new ParkingLot(1, []);
        const parkingLot2 = new ParkingLot(2, []);
        const attendant = new Attendant([parkingLot1, parkingLot2]);

        const vehicle1 = new Vehicle();
        parkingLot2.park(vehicle1);
        const vehicle2 = new Vehicle();
        attendant.park(vehicle2);

        expect(parkingLot2.isParked(vehicle2)).toBeTruthy();
    });

    test("expect attendant to park based on availability scheme", () => {
        const parkingLot1 = new ParkingLot(1, []);
        const parkingLot2 = new ParkingLot(2, []);
        const scheme = new Availability();
        const attendant = new Attendant([parkingLot1, parkingLot2], scheme);

        const vehicle1 = new Vehicle();
        parkingLot2.park(vehicle1);
        const vehicle2 = new Vehicle();
        attendant.park(vehicle2);

        expect(parkingLot1.isParked(vehicle2)).toBeTruthy();
    });

    test("expect attendant to park based on capacity scheme", () => {
        const parkingLot1 = new ParkingLot(1, []);
        const parkingLot2 = new ParkingLot(2, []);
        const scheme = new Capacity();
        const attendant = new Attendant([parkingLot1, parkingLot2], scheme);

        const vehicle1 = new Vehicle();
        parkingLot2.park(vehicle1);
        const vehicle2 = new Vehicle();
        attendant.park(vehicle2);

        expect(parkingLot2.isParked(vehicle2)).toBeTruthy();
    });
});