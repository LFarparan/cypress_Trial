const { faker } = require('@faker-js/faker');

export default function createUser(){
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName() ,
        street: faker.location.streetAddress() ,
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number(),
        ssn : faker.string.numeric(9),
        username : faker.internet.username(),
        password : faker.internet.password(),
    }
}