class Autom_Registration {

  // Define locator object
  elements = {
    username: () => cy.get('[data-qa="signup-name"]'),
    email: () => cy.get('[data-qa="signup-email"]'),
    honorifics: () => cy.get('[value="Mr"]'),
    password: () => cy.get('[data-qa="password"]'),
    day: () => cy.get('[data-qa="days"]'),
    month: () => cy.get('[data-qa="months"]'),
    year: () => cy.get('[data-qa="years"]'),
    firstName: () => cy.get('[data-qa="first_name"]'),
    lastName: () => cy.get('[data-qa="last_name"]'),
    company: () => cy.get('[data-qa="company"]'),
    address: () => cy.get('[data-qa="address"]'),
    address2: () => cy.get('[data-qa="address2"]'),
    country: () => cy.get('[data-qa="country"]'),
    state: () => cy.get('[data-qa="state"]'),
    city: () => cy.get('[data-qa="city"]'),
    zipCode: () => cy.get('[data-qa="zipcode"]'),
    phoneNumber: () => cy.get('[data-qa="mobile_number"]'),
    signupUserName: () => cy.get('[data-qa="signup-name"]'),
    signupEmail: () => cy.get('[data-qa="signup-email"]')
  }

  // Method for Form Validations
  validateRegForm(user) {
    this.elements.honorifics().should('be.visible').and('have.value', 'Mr')
    this.elements.password().should('have.value', user.password)
    this.elements.day().should('have.value', user.day)
    this.elements.year().should('have.value', user.year)
    this.elements.firstName().should('have.value', user.firstName)
    this.elements.lastName().should('have.value', user.lastName)
    this.elements.company().should('have.value', user.company)
    this.elements.address().should('have.value', user.address)
    this.elements.address2().should('have.value', user.address2)
    this.elements.country().should('have.value', user.country)
    this.elements.state().should('have.value', user.state)
    this.elements.city().should('have.value', user.city)
    this.elements.zipCode().should('have.value', user.zipCode)
    this.elements.phoneNumber().should('have.value', user.phoneNumber)
  }

  // Method to fill the signup form
  fillRegForm(user) {
    this.elements.honorifics().click();
    this.elements.password().type(user.password),
    this.elements.day().select(user.day),
    this.elements.month().select(user.month),
    this.elements.year().select(user.year),
    this.elements.firstName().type(user.firstName),
    this.elements.lastName().type(user.lastName),
    this.elements.company().type(user.company),
    this.elements.address().type(user.address),
    this.elements.address2().type(user.address2),
    this.elements.country().select(user.country),
    this.elements.state().type(user.state),
    this.elements.city().type(user.city),
    this.elements.zipCode().type(user.zipCode),
    this.elements.phoneNumber().type(user.phoneNumber)
  }

  fillRegCredentials(user) {
    this.elements.signupUserName().type(user.username).should('have.value', user.username)
    this.elements.signupEmail().type(user.email).should('have.value', user.email)
  }

  submitRegCredentials() {
    cy.get('[data-qa="signup-button"]').should('be.visible').and('contain', 'Signup').click()
  }

  // Method to submit the signup form
  submitRegForm() {
    cy.get('[data-qa="create-account"]').should('be.visible').and('contain', 'Create Account').click()
  }
}

export default new Autom_Registration();