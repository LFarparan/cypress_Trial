describe('E-Commerce Test Flow/Workflow', () => {
    beforeEach(()=>{
        cy.auth('standard_user', 'secret_sauce')
    })

    it('Verify User Login', () => {
        cy.get('.app_logo').should('be.visible')
    });

  
    it('Verify Adding Products to Cart', () => {
      cy.addCart()
    });

    it('Verify Checkout Process', () => {
        cy.addCart()
        cy.checkOut('John', 'Doe', 1231)

        const testName = 'login-'
        const currentDate = new Date();
        const formattedDate = 
            `${ String(currentDate.getMonth() + 1).padStart(2, '0')}-${ 
                String(currentDate.getDate()).padStart(2, '0')}-${ 
                String(currentDate.getFullYear()).slice(-2)}`
        cy.screenshot(testName+formattedDate, {capture: 'viewport'})
        cy.get('[data-test="back-to-products"]').click();
    });
  });
  

