// Uncomment the ./src/inheritance-discriminator import in index.js to run this example
const {Decoverto, inherits, model, property} = require('decoverto');

@model({
    inheritance: {
        discriminatorKey: 'type',
        strategy: 'discriminator',
    },
})
class Vehicle {

    @property(() => String)
    name;
}

@model()
class MotorVehicle extends Vehicle {

    /**
     * Power in kW.
     */
    @property(() => Number)
    power;
}

@inherits({discriminator: 'Car'})
@model()
class Car extends MotorVehicle {

    @property(() => Boolean)
    entertainmentSystem;
}

@inherits({discriminator: 'Bicycle'})
@model()
class Bicycle extends Vehicle {

    @property(() => Number)
    saddleMaximumLengthInCm;
}

const decoverto = new Decoverto();
const typeHandler = decoverto.type(Vehicle);
const subject = [
    {
        name: 'SuperVroom Street Racer',
        saddleMaximumLengthInCm: 30,
        type: 'Bicycle',
    },
    {
        name: 'AF 4C 2017',
        entertainmentSystem: false,
        power: 177,
        type: 'Car',
    },
    {
        name: 'BWM 2M 2021',
        entertainmentSystem: true,
        power: 302,
        type: 'Car',
    },
];
const result = typeHandler.plainToInstanceArray(subject);

console.log('instances', result);
console.log('plain', typeHandler.instanceArrayToPlain(result));
