import RegistrationPage from './pages/registration.page';

Cypress.Commands.add('auth', (username, password) => { // FUNCTION OR METHOD --> Then i-call natin sya sa spec or test file natin.
  cy.visit('https://www.saucedemo.com/', { timeout: 240000 })
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
  cy.get('[data-qa="signup-name"]').type(user.username).should('have.value', user.username)
  cy.get('[data-qa="signup-email"]').type(user.email).should('have.value', user.email)
  cy.get('[data-qa="signup-button"]').should('be.visible').and('contain', 'Signup').click()
  cy.get('[value="Mr"]').should('be.visible').and('have.value', 'Mr').click()
  cy.get('[data-qa="password"]').type(user.password).should('have.value', user.password)
  cy.get('[data-qa="days"]').select(user.day).should('have.value', user.day)
  cy.get('[data-qa="months"]').select(user.month)
  cy.get('[data-qa="years"]').select(user.year).should('have.value', user.year)
  cy.get('[data-qa="first_name"]').type(user.firstName).should('have.value', user.firstName)
  cy.get('[data-qa="last_name"]').type(user.lastName).should('have.value', user.lastName)
  cy.get('[data-qa="company"]').type(user.company).should('have.value', user.company)
  cy.get('[data-qa="address"]').type(user.address).should('have.value', user.address)
  cy.get('[data-qa="address2"]').type(user.address2).should('have.value', user.address2)
  cy.get('[data-qa="country"]').select(user.country).should('have.value', user.country)
  cy.get('[data-qa="state"]').type(user.state).should('have.value', user.state)
  cy.get('[data-qa="city"]').type(user.city).should('have.value', user.city)
  cy.get('[data-qa="zipcode"]').type(user.zipCode).should('have.value', user.zipCode)
  cy.get('[data-qa="mobile_number"]').type(user.phoneNumber).should('have.value', user.phoneNumber)
  cy.get('[data-qa="create-account"]').should('be.visible').and('contain', 'Create Account').click()
});

Cypress.Commands.add('enterCard', (user) => {
  cy.get('[data-qa="name-on-card"]').type(user.firstName + " " + user.lastName)
  .should('have.value', user.firstName + " " + user.lastName)
  cy.get('[data-qa="card-number"]').type(user.cardNumber).should('have.value', user.cardNumber)
  cy.get('[data-qa="cvc"]').type(user.cvc).should('have.value', user.cvc)
  cy.get('[data-qa="expiry-month"]').type(user.exmonth).should('have.value', user.exmonth)
  cy.get('[data-qa="expiry-year"]').type(user.exyear).should('have.value', user.exyear)
  cy.get('form#payment-form').then(($form) => {
    $form[0].addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent the first submission only
    }, { once: true }); // This makes it fire only ONCE
  });
  cy.get('[data-qa="pay-button"]').should('be.visible')
  .and('contain', 'Pay and Confirm Order').click()
  cy.get('#success_message > .alert-success').should('contain',
    ('Your order has been placed successfully!'))
  cy.get('[data-qa="pay-button"]').should('be.visible')
  .and('contain', 'Pay and Confirm Order').click()
  cy.get('.col-sm-9 > p').should('contain',
    'Congratulations! Your order has been confirmed!')
});

Cypress.Commands.add('cardValidation', (user) => {
  cy.get('#address_delivery > .address_firstname').should('contain', `Mr. ${user.firstName} ${user.lastName}`)
  cy.get('#address_delivery > :nth-child(3)').should('contain', user.company)
  cy.get('#address_delivery > :nth-child(4)').should('contain', user.address)
  cy.get('#address_delivery > :nth-child(5)').should('contain', user.address2)
  cy.get('#address_delivery > .address_city').should('contain', user.city)
  cy.get('#address_delivery > .address_city').should('contain', user.state)
  cy.get('#address_delivery > .address_city').should('contain', user.zipCode)
  cy.get('#address_delivery > .address_country_name').should('contain', user.country)
});

Cypress.Commands.add('fillRegistrationForm', (customerData) => {
  RegistrationPage.fillSignUpForm(customerData);
  RegistrationPage.submitSignUpForm();
  RegistrationPage.verifySignUpSuccess(customerData.username);
});