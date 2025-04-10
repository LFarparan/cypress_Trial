import createUser from '../support/utils.js'

describe('Parabank Registration', () => {
    const newUser = createUser()

    it('Verify User Registration', () => {
        cy.visit('/register.htm')
        cy.fillRegForm(newUser)
        cy.get('[value = "Register"]').click()
     })

    it('Verify Login', () => {
        cy.visit('/register.htm')
        cy.get('[name="username"]').type(newUser.username)
        cy.get('[name="password"]').type(newUser.password)
        cy.get('[value="Log In"]').click()
     })



    // it('Verify User Registration', () => {
    //    cy.fixture('example').then((credentials)=>{
    //         const username = credentials.username
    //         const password = credentials.password
    //         cy.visit('/register.htm')
    //         cy.fillRegForm(username, password)
    //         cy.get('[value = "Register"]').click()
    //    })
    // })

    // it('Verify Login', () => {
    //     cy.fixture('example').then((credentials)=>{
    //         const username = credentials.username
    //         const password = credentials.password
    //         cy.visit('/register.htm')
    //         cy.get('[name="username"]').type(username)
    //         cy.get('[name="password"]').type(password)
    //         cy.get('[value="Log In"]').click()
    //     })
    //  })
})