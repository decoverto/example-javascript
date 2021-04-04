// Uncomment the ./src/nested-class import in index.js to run this example
const {model, property, MapShape, array, map, Decoverto} = require('decoverto');

@model()
class Inn {

    @property(() => Number)
    maxCapacity;

    @property(() => String)
    name;
}

@model()
class Foo {

    @property(() => Inn)
    inn;

    @property(map(() => Number, () => Inn, {shape: MapShape.Array}))
    map;

    @property(array(array(() => Inn)))
    multiDimension;

    @property(array(map(() => Date, array(array(() => Inn)), {shape: MapShape.Array})))
    overlyComplex;
}

const decoverto = new Decoverto();
const typeHandler = decoverto.type(Foo);

const result = typeHandler.plainToInstance({
    inn: {maxCapacity: 55, name: `The Wayland's Forge`},
    map: [
        {key: 1, value: {maxCapacity: 60, name: `The Queen's Blessing`}},
    ],
    multiDimension: [
        [
            {maxCapacity: 25, name: 'The Winespring Inn'},
            {maxCapacity: 30, name: 'The Prancing Pony'},
        ],
    ],
    overlyComplex: [[{key: new Date(), value: [[{maxCapacity: 90, name: 'The Blue Cat'}]]}]],
});

console.log(result);
