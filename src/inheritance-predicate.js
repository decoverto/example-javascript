// Uncomment the ./src/inheritance-predicate import in index.js to run this example
const {Decoverto, inherits, model, property} = require('decoverto');

@model({
    inheritance: {
        strategy: 'predicate',
    },
})
class Vehicle {

    @property(() => String)
    name;
}

@model()
class MotorVehicle extends Vehicle {

    @property(() => Number)
    engineDisplacement;
}

@inherits({matches: data => 'maxTrailerLoad' in data})
@model()
class Truck extends MotorVehicle {

    @property(() => Number)
    maxTrailerLoad;
}

@inherits({matches: data => 'rearGears' in data})
@model()
class Bicycle extends Vehicle {

    @property(() => Number)
    rearGears;
}

const typeHandler = new Decoverto().type(Vehicle);

const result = typeHandler.plainToInstanceArray([
    {
        engineDisplacement: 13,
        maxTrailerLoad: 50000,
        name: 'Vroom S-Haul',
    },
    {
        name: 'SuperVroom Street Racer',
        rearGears: 8,
    },
]);

console.log('instances', result);
console.log('plain', typeHandler.instanceArrayToPlain(result));
