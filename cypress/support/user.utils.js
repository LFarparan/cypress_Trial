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
        email: faker.internet.email(),
        day : faker.number.int({ min: 1, max: 31 }),
        month : faker.date.month(),
        year: String(faker.number.int({ min: 1900, max: 2021 })),
        company: faker.company.name(),
        address: faker.location.secondaryAddress(),
        address2: faker.location.secondaryAddress(),
        country: faker.helpers.arrayElement(['India','United States','Canada','Australia','Israel','New Zealand','Singapore' ]),
        state: faker.location.state(),
        fullName: faker.finance.accountName(),
        cardNumber: faker.finance.accountNumber(),
        cvc: faker.number.int({ min: 100, max: 999 }),
        exmonth: faker.number.int({ min: 1, max: 12 }),
        exyear: faker.number.int({ min: 2022, max: 2050 }),

    }
}