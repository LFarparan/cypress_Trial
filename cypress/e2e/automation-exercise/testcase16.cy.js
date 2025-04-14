import createUser from "../../support/user.utils";

describe('Automation Exercise 16', () => {
    before(()=>{
        // account creation prerequisite
        const user = createUser()
        cy.writeFile('cypress/fixtures/automationUser.json', user);
        cy.visit('https://automationexercise.com/login')
        cy.registerUser(user)
        cy.visit('http://automationexercise.com')
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    })
    
    it('Verify Login before checkout', () => {
        cy.fixture('automationUser').then((user)=>{
            cy.visit('http://automationexercise.com')
            cy.get('a > img').should('be.visible');
            cy.url().should('include', '/automationexercise.com')

            // Log In
            cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
            cy.get('[data-qa="login-email"]').type(user.email)
            cy.get('[data-qa="login-password"]').type(user.password)
            cy.get('[data-qa="login-button"]').click()
            cy.get(':nth-child(10) > a').should('contain',`Logged in as ${user.username}`)

            // Add cart
            cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
            cy.get('.modal-footer > .btn').click()
            cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
            cy.get('.modal-footer > .btn').click()
            cy.get('.shop-menu > .nav > :nth-child(3) > a').click()

            // Checkout
            cy.get('.col-sm-6 > .btn').click()
            cy.get('#address_delivery > .address_city').should('contain',user.city)
            cy.get('#product-1 > .cart_description > h4 > a').should('contain','Blue Top')
            cy.get('.form-control').type('Commenting for the sake of testing...')
            cy.get(':nth-child(7) > .btn').click()

            //Payment
            cy.get('[data-qa="name-on-card"]').type(user.firstName + " " + user.lastName)
            cy.get('[data-qa="card-number"]').type(user.cardNumber)
            cy.get('[data-qa="cvc"]').type(user.cvc)
            cy.get('[data-qa="expiry-month"]').type(user.exmonth)
            cy.get('[data-qa="expiry-year"]').type(user.exyear)
            // cy.get('#success_message > .alert-success',{timeout: 100}).should('contain',
            //     ('Your order has been placed successfully!'))
            cy.get('[data-qa="pay-button"]').click()
            cy.get('.col-sm-9 > p').should('contain',
                 'Congratulations! Your order has been confirmed!')

            // Delete Account
            cy.get(':nth-child(5) > a').click()
            cy.get('b').contains('Account Deleted!')
            cy.get('[data-qa="continue-button"]').click()
        })
    });
});