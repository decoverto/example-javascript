// Uncomment the ./src/basic-class import in index.js to run this example
const {model, map, MapShape, property, Decoverto} = require('decoverto');

@model()
class User {

    @property(() => Date)
    createdAt;

    @property(() => String)
    givenName;

    @property(() => String)
    referralToken;

    @property(map(() => String, () => Boolean, {shape: MapShape.Object}))
    permissions;
}

const typeHandler = new Decoverto().type(User);

const result = typeHandler.plainToInstance({
    createdAt: 150000000000,
    givenName: 'Mark',
    permissions: {
        canCreateProducts: true,
        canManageUsers: false,
    },
});

console.log('instance', result);

console.log('plain', typeHandler.instanceToPlain(result));
