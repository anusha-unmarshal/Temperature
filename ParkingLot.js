class ParkingLot {
    parking = [];
    availableSlots;
    owner;

    constructor(availableSlots, owner) {
        this.availableSlots = availableSlots;
        this.owner = owner;
    }
    park(vehicle){
        if (!this.isFull()) {
            this.parking.push(vehicle);
            this.availableSlots -= 1;
        }
        if (this.isFull()){
           this.owner.isFull();
        }
    }

    unpark(vehicle) {
        if (this.isParked(vehicle)) {
            this.parking = this.parking.filter((item) => {
                return item !== vehicle;
            });
            this.availableSlots += 1
            if (this.availableSlots === 1){
                this.owner.isAvailable()
            }
            return true;
        }
        else {
            return false;
        }
    }

    isParked(vehicle) {
        for (let i=0; i<this.parking.length;i++){
            if (this.parking[i] === vehicle){
                return true
            }
        }
        return false
    }

    isFull() {
       return this.availableSlots === 0;
    }
}
export class Vehicle {

}

class Owner {
    isLotFull = false;

    isFull() {
        this.isLotFull = true;
    }

    isAvailable() {
        this.isLotFull = false;
    }
}
export {ParkingLot, Owner};