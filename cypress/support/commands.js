// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
Cypress.Commands.add('auth', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
      cy.get('[data-test="username"]').type(username)
      .should('to.have', username)
      cy.get('[data-test="password"]').type(password)
      .should('to.have', password)
      cy.get('[data-test="login-button"]').click()
}); 

// Try to create other Commands - pwedeng yung add to cart at checkout is gagawan natin ng commands
Cypress.Commands.add('addCart', () => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
}); 

Cypress.Commands.add('checkOut', (firstname, lastname, postcode) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
      cy.get('[data-test="checkout"]').click();
      cy.get('[data-test="firstName"]').type(firstname);
      cy.get('[data-test="lastName"]').type(lastname);
      cy.get('[data-test="postalCode"]').type(postcode);
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="finish"]').click();
}); 

Cypress.Commands.add('fillRegForm', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.get('[name = "customer.firstName"]').type('John')
       cy.get('[name = "customer.lastName"]').type('Doe')
       cy.get('[name = "customer.address.street"]').type('Kalayaan')
       cy.get('[name = "customer.address.city"]').type('Imus')
       cy.get('[name = "customer.address.state"]').type('Cavite')
       cy.get('[name = "customer.address.zipCode"]').type('1231')
       cy.get('[name = "customer.phoneNumber"]').type('091212121212')
       cy.get('[name = "customer.ssn"]').type('12321')
       cy.get('[name = "customer.username"]').type(username)
       cy.get('[name = "customer.password"]').type(password)
       cy.get('[name = "repeatedPassword"]').type(password)
}); 




//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })