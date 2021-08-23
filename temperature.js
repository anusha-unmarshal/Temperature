export class Temperature {
    celsius = 0.;

    constructor(value) {
        this.celsius = value;
    }

    static NewCelsius = (celsius) => {
        return new Temperature(celsius);
    }

    static NewKelvin = (kelvin) => {
        return new Temperature(kelvin - 273.15);
    }

    static NewFahrenheit = (fahrenheit) => {
        return new Temperature((fahrenheit - 32) * 5 / 9);
    }

    isEqual = (otherTemperature) => {
        return this.celsius === otherTemperature.celsius;
    }

    toKelvin = () => {
        return this.celsius + 273.15;
    }

    toFahrenheit = () => {
        return (this.celsius * 9 / 5) + 32;
    }

    add = (otherTemperature) => {
        this.celsius = this.celsius + otherTemperature.celsius;
    }

}