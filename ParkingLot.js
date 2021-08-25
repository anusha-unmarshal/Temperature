import {forEach} from "core-js/stable/dom-collections";

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
            this.notify(true);
        }
    }

    notify(isFull) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (isFull === true) {
                this.subscribers[i].isFull(this);
                continue;
            }
            this.subscribers[i].isAvailable(this);

        }
    }

    unpark(vehicle) {
        if (!this.isParked(vehicle)) {
            return false;
        }
        this.parking = this.parking.filter((item) => {
            return item !== vehicle;
        });
        if (this.parking.length === this.totalSlots - 1) {
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

    addSubscriber(subscriber) {
        this.subscribers.push(subscriber);
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

class Attendant extends Subscriber {
    parkingLots;
    availableLots;

    constructor(parkingLots) {
        super();
        this.parkingLots = parkingLots;
        this.subscribeParkingLot();
        this.availableLots = this.getAvailableLots(parkingLots);
    }

    isFull = (parkingLot) => {
        this.isLotFull = true;
        this.availableLots = this.availableLots.filter((lot) => {
            return lot !== parkingLot;
        });
    }

    isAvailable(parkingLot) {
        this.isLotFull = false;
        this.availableLots.push(parkingLot);
    }

    park(vehicle) {
        if (this.availableLots.length === 0){
            return false;
        }
        // const lot = this.getHighestCapacityLot();
        const lot = this.availableLots[0];
        lot.park(vehicle);
    }

    unpark(vehicle) {
        for(let i=0; i<this.parkingLots.length; i++){
            if (this.parkingLots[i].isParked(vehicle)){
                return this.parkingLots[i].unpark(vehicle);
            }
        }
        return false;
    }

    getAvailableLots(parkingLots) {
        return parkingLots.filter((parkingLot) => {
            return parkingLot.isFull() !== true;
        })
    }

    subscribeParkingLot() {
        for(let i=0; i<this.parkingLots.length; i++){
            this.parkingLots[i].addSubscriber(this);
        }
    }

}

export {ParkingLot, Owner, TrafficCop, Attendant};