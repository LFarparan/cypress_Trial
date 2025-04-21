import createUser from "../../support/user.utils";

describe('Automation Exercise 16', () => {
    before(() => {
        // account creation prerequisite
        const user = createUser()
        cy.writeFile('cypress/fixtures/automationUser.json', user);
        cy.visit('https://automationexercise.com/login')
        cy.registerUser(user)
        cy.visit('http://automationexercise.com')
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    })

    it('Verify Login before checkout', () => {
        cy.fixture('automationUser').then((user) => {
            cy.visit('http://automationexercise.com')
            cy.get('a > img').should('be.visible');
            cy.url().should('include', '/automationexercise.com')

            // Log In
            cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
            cy.get('[data-qa="login-email"]').type(user.email).should('have.value', user.email)
            cy.get('[data-qa="login-password"]').type(user.password).should('have.value', user.password)
            cy.get('[data-qa="login-button"]').should('be.visible').click()
            cy.get(':nth-child(10) > a').should('be.visible').and('contain', `Logged in as ${user.username}`)

            // Add cart
            cy.addToCart()
            cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()

            // Checkout
            cy.get('.col-sm-6 > .btn').should('be.visible').click()
            cy.cardValidation(user)
            cy.get('#product-1 > .cart_description > h4 > a').should('contain', 'Blue Top')
            cy.get('.form-control').type('Sample comment for Testing...')
                .should('have.value', 'Sample comment for Testing...')
            cy.get(':nth-child(7) > .btn').should('be.visible').click()

            //Payment
            cy.enterCard(user)

            // Delete Account
            cy.get(':nth-child(5) > a').should('be.visible').click()
            cy.get('b').contains('Account Deleted!')
            cy.get('[data-qa="continue-button"]').should('be.visible').click()
        })
    });
});