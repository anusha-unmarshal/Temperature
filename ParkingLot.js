class ParkingLot {
    parking = [];
    totalSlots;
    subscribers;

    constructor(totalSlots, subscribers) {
        this.totalSlots = totalSlots;
        this.subscribers = subscribers;
    }

    park(vehicle) {
        if (!this.isFull()) {
            this.parking.push(vehicle);
        }
        if (this.isFull()) {
            this.notify(true)
        }
    }

    notify(isFull) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (isFull === true) {
                this.subscribers[i].isFull();
                continue;
            }
            this.subscribers[i].isAvailable();

        }
    }

    unpark(vehicle) {
        if (!this.isParked(vehicle)) {
            return false;
        }
        this.parking = this.parking.filter((item) => {
            return item !== vehicle;
        });
        if (this.parking.length === this.totalSlots-1) {
            this.notify(false);
        }
        return true;
    }

    isParked(vehicle) {
        for (let i = 0; i < this.parking.length; i++) {
            if (this.parking[i] === vehicle) {
                return true
            }
        }
        return false
    }

    isFull() {
        return this.parking.length === this.totalSlots;
    }
}

export class Vehicle {

}

class Subscriber {
    isLotFull = false;

    isFull = () => {
        this.isLotFull = true;
    }

    isAvailable() {
        this.isLotFull = false;
    }
}

class Owner extends Subscriber {

}

class TrafficCop extends Subscriber {

}

class Attendant {

}
export {ParkingLot, Owner, TrafficCop, Attendant};