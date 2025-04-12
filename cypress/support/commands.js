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

Cypress.Commands.add('restoreCart', () => {
    const cart = Cypress.env('savedCart') || '[]';
    cy.window().then((win) => {
      win.localStorage.setItem('cart-contents', cart);
    });
  });

Cypress.Commands.add('saveCart', () => {
    cy.window().then((win) => {
      const cart = win.localStorage.getItem('cart-contents') || '[]';
      Cypress.env('savedCart', cart);
    });
});

Cypress.Commands.add('registerUser', (user) => {
  cy.get('.modal-body > :nth-child(2) > a > u').click()
  cy.get('[data-qa="signup-name"]').type(user.username)
  cy.get('[data-qa="signup-email"]').type(user.email)
  cy.get('[data-qa="signup-button"]').click()
  cy.get('[value="Mr"]').click()
  cy.get('[data-qa="password"]').type(user.password)
  cy.get('[data-qa="days"]').select(user.day)
  cy.get('[data-qa="months"]').select(user.month)
  cy.get('[data-qa="years"]').select(user.year)
  cy.get('[data-qa="first_name"]').type(user.firstName)
  cy.get('[data-qa="last_name"]').type(user.lastName)
  cy.get('[data-qa="company"]').type(user.company)
  cy.get('[data-qa="address"]').type(user.address)
  cy.get('[data-qa="address2"]').type(user.address2)
  cy.get('[data-qa="country"]').select(user.country)
  cy.get('[data-qa="state"]').type(user.state)
  cy.get('[data-qa="city"]').type(user.city)
  cy.get('[data-qa="zipcode"]').type(user.zipCode)
  cy.get('[data-qa="mobile_number"]').type(user.phoneNumber)
  cy.get('[data-qa="create-account"]').click()
});

Cypress.Commands.add('hmmm', (user) => {
  
});