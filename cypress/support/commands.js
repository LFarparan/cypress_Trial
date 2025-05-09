import RegistrationPage from './pages/registration.page';
import Autom_Registration from './pages/autom_registration.page';
import Autom_AddCard from './pages/autom_addCard.page';
import Autom_CheckoutValidation from './pages/autom_checkoutValidation.page';

// SAUCEDEMO commands
Cypress.Commands.add('auth', (username, password) => {
  cy.visit('/', { timeout: 240000 })
  cy.get('[data-test="username"]').type(username)
    .should('to.have', username)
  cy.get('[data-test="password"]').type(password)
    .should('to.have', password)
  cy.get('[data-test="login-button"]').click()
});


Cypress.Commands.add('addCart', () => { 
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  cy.get('[data-test="shopping-cart-link"]').click();
});

Cypress.Commands.add('takeScreenshot', (testName) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
  const date = new Date().toISOString()
  const formattedDate = `${date.slice(5, 7)}-${date.slice(8, 10)}-${date.slice(2, 4)}`
  cy.screenshot(testName + formattedDate, { capture: 'viewport' })
});

Cypress.Commands.add('checkOut', (firstname, lastname, postcode) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(firstname);
  cy.get('[data-test="lastName"]').type(lastname);
  cy.get('[data-test="postalCode"]').type(postcode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

//NETLIFY commands
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

// AUTOMATION EXERCISES
Cypress.Commands.add('addToCart', () => {
  cy.get('.features_items > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn')
    .should('be.visible').click()
  cy.get('.modal-footer > .btn').should('be.visible').click()
  cy.get(':nth-child(4) > .product-image-wrapper > .single-products > .productinfo > .btn')
    .should('be.visible').click()
  cy.get('.modal-footer > .btn').should('be.visible').click()
});

Cypress.Commands.add('registerUser', (user) => {
  Autom_Registration.fillRegCredentials(user)
  Autom_Registration.submitRegCredentials()
  Autom_Registration.fillRegForm(user)
  Autom_Registration.validateRegForm(user)
  Autom_Registration.submitRegForm()
});

Cypress.Commands.add('enterCard', (user) => {
  Autom_AddCard.fillCardForm(user)
  Autom_AddCard.submitWithPreventDefault()
  Autom_AddCard.validateCardInputs(user)
  Autom_AddCard.submitCardForm()
  Autom_AddCard.validateSuccessfulCard()
});

Cypress.Commands.add('cardValidation', (user) => {
  Autom_CheckoutValidation.verifyAddress(user)
});

// PARABANK registration
Cypress.Commands.add('fillRegistrationForm', (customerData) => {
  RegistrationPage.fillSignUpForm(customerData);
  RegistrationPage.submitSignUpForm();
  RegistrationPage.verifySignUpSuccess(customerData.username);
});