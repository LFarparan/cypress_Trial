import RegistrationPage from './pages/registration.page';
import createUser from '../support/utils.js';

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

Cypress.Commands.add('enterCard', (user) => {
  cy.get('[data-qa="name-on-card"]').type(user.firstName + " " + user.lastName)
  cy.get('[data-qa="card-number"]').type(user.cardNumber)
  cy.get('[data-qa="cvc"]').type(user.cvc)
  cy.get('[data-qa="expiry-month"]').type(user.exmonth)
  cy.get('[data-qa="expiry-year"]').type(user.exyear)

  cy.get('form#payment-form').then(($form) => {
     $form[0].addEventListener('submit', (e) => {
       e.preventDefault(); // Prevent the first submission only
     }, { once: true }); // This makes it fire only ONCE
  });
            
  cy.get('[data-qa="pay-button"]').click()
  cy.get('#success_message > .alert-success').should('contain',
      ('Your order has been placed successfully!'))
  cy.get('[data-qa="pay-button"]').click()
  cy.get('.col-sm-9 > p').should('contain',
      'Congratulations! Your order has been confirmed!')
});

Cypress.Commands.add('cardValidation', (user) => {
  cy.get('#address_delivery > .address_firstname').should('contain',`Mr. ${user.firstName} ${user.lastName}`)
  cy.get('#address_delivery > :nth-child(3)').should('contain', user.company)
  cy.get('#address_delivery > :nth-child(4)').should('contain', user.address)
  cy.get('#address_delivery > :nth-child(5)').should('contain', user.address2)
  cy.get('#address_delivery > .address_city').should('contain',user.city)
  cy.get('#address_delivery > .address_city').should('contain',user.state)
  cy.get('#address_delivery > .address_city').should('contain',user.zipCode)
  cy.get('#address_delivery > .address_country_name').should('contain', user.country)
});

Cypress.Commands.add('fillRegistrationForm', (customerData = generateCustomerData()) => {
  RegistrationPage.fillSignUpForm(customerData);
  RegistrationPage.submitSignUpForm();
  RegistrationPage.verifySignUpSuccess(customerData.username);
});