import createUser from "../../support/user.utils";

describe('Automation Exercise 14', () => {
    before(()=>{
        cy.writeFile('cypress/fixtures/automationUser.json', createUser()); 
    })
    
    it('Verify registration while checkout', () => {
        cy.fixture('automationUser').then((user)=>{
            cy.visit('http://automationexercise.com')
            cy.get('a > img').should('be.visible');
            cy.get('[alt="Website for automation practice"]')

            // Add cart
            cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .should('be.visible').click()
            cy.get('.modal-footer > .btn').should('be.visible').click()
            cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn')
            .should('be.visible').click()
            cy.get('.modal-footer > .btn').should('be.visible').click()

            //Failed checkout
            cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
            cy.url().should('include', '/view_cart')
            cy.get('.col-sm-6 > .btn').should('be.visible').click()

            //Register
            cy.get('.modal-body > :nth-child(2) > a > u').should('be.visible').click()
            cy.registerUser(user)
            cy.url().should('include', '/account_created')
            cy.get('[data-qa="continue-button"]').should('be.visible').click()

            // Order Validation
            cy.get(':nth-child(10) > a').should('be.visible').and('contain',`Logged in as ${user.username}`)
            cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
            cy.get('.col-sm-6 > .btn').should('be.visible').click()
            cy.cardValidation(user)
            cy.get('#product-1 > .cart_description > h4 > a').should('contain','Blue Top')
            cy.get('.form-control').type('Sample comment for Testing...')
            .should('have.value', 'Sample comment for Testing...')
            cy.get(':nth-child(7) > .btn').should('be.visible').click()

            //Payment
            cy.enterCard(user)

            // Delete Account
            cy.get(':nth-child(5) > a').click()
            cy.get('b').contains('Account Deleted!')
            cy.get('[data-qa="continue-button"]').should('be.visible').click()
        })
    });
});