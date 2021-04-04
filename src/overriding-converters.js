// Uncomment the ./src/overriding-converters import in index.js to run this example
const {Decoverto, model, property} = require('decoverto');

/*
 * You might need to override the conversion for a specific property. This can be accomplished using
 * the options of @property.
 */

const decoverto = new Decoverto();

@model()
class OverrideSingleConverter {

    @property(() => Date, {toPlain: date => date == null ? date : date.getTime()})
    date;
}

const singleOverrideHandler = decoverto.type(OverrideSingleConverter);
const singleConverterResult = singleOverrideHandler.plainToInstance({
    date: '2021-04-03T10:39:30.092Z',
});

console.log('The default strategy is used for toInstance', singleConverterResult);
console.log(
    'The overridden converter is used for toPlain',
    singleOverrideHandler.instanceToPlain(singleConverterResult),
);

/*
 * You could also set both converters.
 */

@model()
class OverrideConverters {

    @property({
        toInstance: value => {
            if (value == null) {
                return value;
            }

            if (typeof value === 'string' && value.startsWith('http')) {
                return new URL(value)
            }

            return value;
        },
        toPlain: value => value?.toString(),
    })
    foo;
}

const overrideConvertersHandler = decoverto.type(OverrideConverters);
const overrideConvertersResult = overrideConvertersHandler.plainToInstance({
    foo: 'https://example.com',
});

console.log('Both converters overwritten, to instance:', overrideConvertersResult);
console.log(
    'Both converters overwritten, to plain:',
    overrideConvertersHandler.instanceToPlain(overrideConvertersResult),
);
