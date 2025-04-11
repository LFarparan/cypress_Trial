Cypress.Commands.add('auth', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.visit('https://www.saucedemo.com/', {timeout: 240000})
      cy.get('[data-test="username"]').type(username)
      .should('to.have', username)
      cy.get('[data-test="password"]').type(password)
      .should('to.have', password)
      cy.get('[data-test="login-button"]').click()
}); 

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

Cypress.Commands.add('fillRegForm', (user) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
    cy.get('[name = "customer.firstName"]').type(user.firstName)
       cy.get('[name = "customer.lastName"]').type(user.lastName)
       cy.get('[name = "customer.address.street"]').type(user.street)
       cy.get('[name = "customer.address.city"]').type(user.city)
       cy.get('[name = "customer.address.state"]').type(user.state)
       cy.get('[name = "customer.address.zipCode"]').type(user.zipCode)
       cy.get('[name = "customer.phoneNumber"]').type(user.phoneNumber)
       cy.get('[name = "customer.ssn"]').type(user.ssn)
       cy.get('[name = "customer.username"]').type(user.username)
       cy.get('[name = "customer.password"]').type(user.password)
       cy.get('[name = "repeatedPassword"]').type(user.password)
}); 
