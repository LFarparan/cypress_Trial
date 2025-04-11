import createUser from "../support/utils";

describe('Parabank Registration', () => {
    before(()=>{
        cy.writeFile('cypress/fixtures/testData.json', createUser()); 
    })

    it('Verify User Registration', () => {
        cy.visit('/register.htm')
        cy.fixture('testData').then((newUser) =>{
            cy.fillRegForm(newUser)
            cy.get('[value = "Register"]').click()
        })
     })

    it('Verify Login', () => {
        cy.visit('/register.htm')
        cy.fixture('testData').then((newUser) =>{
            cy.get('[name="username"]').type(newUser.username)
            cy.get('[name="password"]').type(newUser.password)
            cy.get('[value="Log In"]').click()
        })
     })
})