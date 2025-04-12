import createUser from "../../support/user.utils";

describe('Automation Exercise', () => {
    before(()=>{
            cy.writeFile('cypress/fixtures/automationUser.json', createUser()); 
    })
    
    it('Verify registration while checkout', () => {
        cy.fixture('automationUser').then((user)=>{
            cy.visit('http://automationexercise.com')
            cy.get('a > img').should('be.visible');
            cy.get('[alt="Website for automation practice"]')

            // add cart
            cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
            cy.get('.modal-footer > .btn').click()
            cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn').click()
            cy.get('.modal-footer > .btn').click()

            //failed checkout
            cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
            cy.url().should('include', '/view_cart')
            cy.get('.col-sm-6 > .btn').click()

            //register
            cy.registerUser(user)
            cy.url().should('include', '/account_created')
            cy.get('[data-qa="continue-button"]').click()

            // Order Validation
            cy.get(':nth-child(10) > a').contains(`Logged in as ${user.username}`)
            cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
            cy.get('.col-sm-6 > .btn').click()
            cy.get('#address_delivery > .address_city').contains(user.city)
            cy.get('#product-1 > .cart_description > h4 > a').contains('Blue Top')
            cy.get('.form-control').type('Commenting for the sake of testing...')
            cy.get(':nth-child(7) > .btn').click()

            //Payment
            cy.get('[data-qa="name-on-card"]').type(user.fullName)
            cy.get('[data-qa="card-number"]').type(user.cardNumber)
            cy.get('[data-qa="cvc"]').type(user.cvc)
            cy.get('[data-qa="expiry-month"]').type(user.exmonth)
            cy.get('[data-qa="expiry-year"]').type(user.exyear)
            cy.get('[data-qa="pay-button"]').click()

        })
    });
});