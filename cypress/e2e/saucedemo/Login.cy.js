describe('Log In', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/'); // Runs before every test
  });

  it('Sucessful login with valid credentials', () => {
    cy.auth('standard_user', 'secret_sauce')
    cy.takeScreenshot('login-')
    cy.contains('Swag Labs').should('be.visible')
    cy.url().should("include", '/inventory.html')
  })

  it('Unsuccessful login with invalid login credentials', () => {
    cy.auth('standard_user', 'invalid_pass')
    cy.get('[data-test="error"]').should('contain', 'Epic sadface')
    cy.takeScreenshot('invalid_login-')
    cy.url().should("include", 'saucedemo.com')
  })

})