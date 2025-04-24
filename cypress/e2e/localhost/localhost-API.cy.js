import { faker } from "@faker-js/faker"

const baseURL = 'http://localhost:3000/api/users'
let bearerToken
let userID
const userData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password()
}

const putUser = {
    "name": faker.person.fullName(),
    "email": faker.internet.email(),
    "password": faker.internet.password()
}

const patchEmail = faker.internet.email()


describe('Local Host API test', () => {
    it('POST - User Registration',()=>{
        cy.api({
            method: 'POST',
            url: baseURL + '/register',
            body: userData
        }).should((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.message).to.eq("User registered")
            expect(response.body.user.name).to.eq(userData.name)
            expect(response.body.user.email).to.eq(userData.email)
            userID = response.body.user.id
        })
    })
    it('POST - Login',()=>{
        const {name, ...credentials} = userData
        cy.api({
            method: 'POST',
            url: baseURL + '/login',
            body: credentials
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('token')
            bearerToken = response.body.token
        })
    })
    it('GET - ALL user records',()=>{
        cy.api({
            method: 'GET',
            url: baseURL,
            headers: {
                Authorization: `Bearer ${bearerToken}`
            }
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array');
        })
    })
    it('GET - Fetch user data by id',()=>{
        cy.wrap(userID).should('exist')
        cy.api({
            method: 'GET',
            url: baseURL + `/${userID}`,
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.eq(userID)
            expect(response.body.name).to.eq(userData.name)
            expect(response.body.email).to.eq(userData.email)

        })
    })
    it('PUT - Overwrite existing user data',()=>{
        cy.api({
            method: 'PUT',
            url: baseURL + `/${userID}`,
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            },
            body: putUser
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("User updated")
            expect(response.body.user.name).to.eq(putUser.name)
            expect(response.body.user.email).to.eq(putUser.email)
            expect(response.body.user.id).to.eq(userID)
        })
    })
    it('PATCH - Overwrite a specific property',()=>{
        cy.api({
            method: 'PATCH',
            url: baseURL + `/${userID}`,
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            },
            body: {
                "email": patchEmail,
            }
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("User patched")
        })
    })
   it('DELETE - delete user data by id',()=>{
        cy.wrap(userID).should('exist')
        cy.api({
            method: 'DELETE',
            url: baseURL + `/${userID}`,
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            }
        }).should((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq("User deleted")
        })
    }) 
})