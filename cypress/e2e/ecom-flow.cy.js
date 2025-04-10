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

        const testName = 'checkout-'
        const date = new Date().toISOString()
        const formattedDate = `${date.slice(5,7)}-${date.slice(8,10)}-${date.slice(2,4)}`
        cy.screenshot(testName+formattedDate, {capture: 'viewport'})


        // const currentDate = new Date().toISOString().replace(/[:]/g, '-');
        // cy.screenshot(testName+formattedDate, {capture: 'viewport'})
        // cy.screenshot(testName + currentDate, {capture: 'viewport'});
        // const formattedDate = 
        //     `${ String(currentDate.getMonth() + 1).padStart(2, '0')}-${ 
        //         String(currentDate.getDate()).padStart(2, '0')}-${ 
        //         String(currentDate.getFullYear()).slice(-2)}`
        
        cy.get('[data-test="back-to-products"]').click();
    });
  });
  


