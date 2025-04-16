describe('E-Commerce Test Flow/Workflow', () => {
    beforeEach(()=>{
        cy.auth('standard_user', 'secret_sauce')
    })

    it('Verify User Login', () => {
        cy.get('.app_logo').should('be.visible')
    });

  
    it('Verify adding products to Cart', () => {
      cy.addCart()
    });

    it('Verify checkout process', () => {
        cy.addCart()
        cy.checkOut('John', 'Doe', 1231)
        cy.takeScreenshot('checkout-')     
        cy.get('[data-test="back-to-products"]').click();
    });
  });
  


