const { faker } = require('@faker-js/faker');

describe('Pet Store API Tests', () => {
    let petId;
    it('GET - Getting petstore inventory data', () => {
        cy.api({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/store/inventory',
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('sold')
            expect(response.body).to.have.property('available')
            expect(response.body).to.have.property('string')
            expect(response.body).to.have.property('pending')
        })
    })

    it('POST - Register new pet', () => {
        const reqBody = {
            "id": 7,
            "petId": 3,
            "quantity": 5,
            "shipDate": "2025-04-22T03:02:28.856Z",
            "status": "placed",
            "complete": true
        }

        cy.api({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/store/order',
            body: reqBody
        }).should((response) => {
            expect(response.status).to.eq(200)
            petId = response.body.id

        })
    })

    it('GET - Getting single petstore data', () => {
        cy.api({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/store/order/' + petId
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(petId)
        })
    })

    it('GET 404 - Not Found Error', () => {
        cy.api({
            method: 'GET',
            failOnStatusCode: false,
            url: 'https://petstore.swagger.io/v2/store/order/' + 'test'
        }).should((response) => {
            expect(response.status).to.eq(404)
        })
    })

    it('DELETE - Delete Record by Id', () => {
        cy.api({
            method: 'DELETE',
            failOnStatusCode: false,
            url: 'https://petstore.swagger.io/v2/store/order/' + petId
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq(String(petId))
        })
    })
})


describe('Petstore User API Tests', () => {
    const fake_user = [{
        "id": 8,
        "username": faker.internet.username(),
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "phone": faker.phone.number(),
        "userStatus": 0
    },
    ]

    const UpdatedUser = {
        "id": 9,
        "username": faker.internet.username(),
        "firstName": faker.person.firstName(),
        "lastName": faker.person.lastName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "phone": faker.phone.number(),
        "userStatus": 0
    }

    it('POST - Creating new User with List', () => {
        cy.api({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithList',
            body: fake_user
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("ok")
        })
    })

    it("GET - Getting the newly created user by username", () => {
        cy.api({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/' + fake_user[0].username,
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.username).to.eq(fake_user[0].username)
        })
    })

    it("PUT - Overwriting an existing user record", () => {
        cy.api({
            method: 'PUT',
            url: 'https://petstore.swagger.io/v2/user/' + fake_user[0].username,
            body: UpdatedUser
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq(String(UpdatedUser.id))
        })
    })

    it("GET - Login using username & password Credentials", () => {
        cy.api({
            method: 'GET',
            url: `https://petstore.swagger.io/v2/user/login`,
            qs: {
                username: UpdatedUser.username,
                password: UpdatedUser.password
            }
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.include('logged in user session')
        })
    })

    it("GET - Logout user account", () => {
        cy.api({
            method: 'GET',
            url: 'https://petstore.swagger.io/v2/user/logout',
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("ok")
        })
    })

    it("DELETE - Deleting created user by username", () => {
        cy.api({
            method: 'DELETE',
            url: 'https://petstore.swagger.io/v2/user/' + UpdatedUser.username,
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq(UpdatedUser.username)
        })
    })

    it('POST - Creating new user with Array', () => {
        cy.api({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user/createWithArray',
            body: fake_user
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("ok")
        })
    })

    it('POST - Creating new user', () => {
        cy.api({
            method: 'POST',
            url: 'https://petstore.swagger.io/v2/user',
            body: fake_user[0]
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq(String(fake_user[0].id))
        })
    })

})