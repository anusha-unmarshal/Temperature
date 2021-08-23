const {Temperature} = require("./temperature");

describe("Temperature", () => {
    describe("Comparison", () => {
        test('Expect 100 Celsius to be equal to 373.15 Kelvin', () => {
            const celsius = Temperature.NewCelsius(100);
            const kelvin = Temperature.NewKelvin(373.15);

            const isEqual = celsius.isEqual(kelvin);

            expect(isEqual).toBe(true);
        });

        test('Compares Celsius with Kelvin', () => {
            const celsius = Temperature.NewCelsius(10);
            const kelvin = Temperature.NewKelvin(283.15);

            const isEqual = celsius.isEqual(kelvin);

            expect(isEqual).toBe(true);
        });

        test('Compare Celsius with Fahrenheit', () => {
            const celsius = Temperature.NewCelsius(100);
            const fahrenheit = Temperature.NewFahrenheit(212);

            const isEqual = celsius.isEqual(fahrenheit);

            expect(isEqual).toEqual(true);
        });

        test('Compare Celsius with Fahrenheit', () => {
            const celsius = Temperature.NewCelsius(10);
            const fahrenheit = Temperature.NewFahrenheit(50);

            const isEqual = celsius.isEqual(fahrenheit);

            expect(isEqual).toEqual(true);
        });

        test('Compare Fahrenheit with Kelvin', () => {
            const fahrenheit = Temperature.NewFahrenheit(50);
            const kelvin = Temperature.NewKelvin(283.15);

            const isEqual = fahrenheit.isEqual(kelvin);

            expect(isEqual).toEqual(true);
        });

        test('Compare Fahrenheit with Kelvin', () => {
            const fahrenheit = Temperature.NewFahrenheit(212);
            const kelvin = Temperature.NewKelvin(373.15);

            const isEqual = fahrenheit.isEqual(kelvin);

            expect(isEqual).toEqual(true);
        });
    });
    describe('Conversion', () => {
        test('Expect 100Celsius to be converted to 373.15Kelvin', () => {
            const hundredCelsius = Temperature.NewCelsius(100);
            const expectedKelvin = 373.15;

            const actualKelvin = hundredCelsius.toKelvin()

            expect(actualKelvin).toBeCloseTo(expectedKelvin)
        });

        test('Expect 10 celsius to be converted to 283.15Kelvin', () => {
            const tenCelsius = Temperature.NewCelsius(10);
            const expectedKelvin = 283.15;

            const actualKelvin = tenCelsius.toKelvin()

            expect(actualKelvin).toBeCloseTo(expectedKelvin)
        });

        test('Expect 100 celsius to be converted to 212 fahrenheit', () => {
            const hundredCelsius = Temperature.NewCelsius(100);
            const expectedFahrenheit = 212;

            const actualFahrenheit = hundredCelsius.toFahrenheit()

            expect(actualFahrenheit).toBeCloseTo(expectedFahrenheit)
        });

        test('Expect 100 celsius to be converted to 212 fahrenheit', () => {
            const hundredCelsius = Temperature.NewCelsius(10);
            const expectedFahrenheit = 50;

            const actualFahrenheit = hundredCelsius.toFahrenheit()

            expect(actualFahrenheit).toBeCloseTo(expectedFahrenheit)
        });

        test('Expect 100 fahrenheit to be converted to 310.928 Kelvin', () => {
            const hundredFahrenheit = Temperature.NewFahrenheit(100);
            const expectedKelvin= 310.928;

            const actualKelvin = hundredFahrenheit.toKelvin()

            expect(actualKelvin).toBeCloseTo(expectedKelvin)
        });

        test('Expect 10 fahrenheit to be converted to 260.928 Kelvin', () => {
            const hundredFahrenheit = Temperature.NewFahrenheit(10);
            const expectedKelvin= 260.928;

            const actualKelvin = hundredFahrenheit.toKelvin()

            expect(actualKelvin).toBeCloseTo(expectedKelvin)
        });
    });
    describe("Addition", () => {
        test('Adding 10Celsius to 10Kelvin returns -253.15 Celsius', () => {
            const temperature = Temperature.NewCelsius(10);
            const tenKelvin = Temperature.NewKelvin(10);
            const expectedSum = -253.15

            temperature.add(tenKelvin);

            expect(temperature.celsius).toBeCloseTo(expectedSum);
        });

        test('Adding 100Celsius to 10Kelvin returns -163.15 Celsius', () => {
            const temperature = Temperature.NewCelsius(100);
            const tenKelvin = Temperature.NewKelvin(10);
            const expectedSum = -163.15

            temperature.add(tenKelvin);

            expect(temperature.celsius).toBeCloseTo(expectedSum);
        });
    });
});

