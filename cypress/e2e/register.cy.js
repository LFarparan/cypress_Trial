describe('Parabank Registration', () => {
    const username = 'Name1'
    const password = 'password001'

    it('Verify Registration', () => {
       cy.visit('/register.htm')
       cy.fillRegForm(username, password)
       cy.get('[value = "Register"]').click()
    })

    it('Verify Login', () => {
        cy.visit('/register.htm')
        cy.get('[name="username"]').type(username)
        cy.get('[name="password"]').type(password)
        cy.get('[value="Log In"]').click()
     })
})