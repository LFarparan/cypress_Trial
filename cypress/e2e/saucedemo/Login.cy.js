describe('Log In', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
  });

  it('Sucessful login with valid credentials', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.contains('Swag Labs').should('be.visible')
    cy.url().should("include", '/inventory.html')
  })

  it('Unsuccessful login with invalid login credentials', () => {
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('ehetenandayo')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]')
    cy.url().should("include", 'saucedemo.com')
  })

})