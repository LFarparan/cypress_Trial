describe('Cart Persistence Test', () => {
    it('Verify adding items to cart and saves cart contents', () => {
        cy.visit('/');
        cy.auth('standard_user', 'secret_sauce')

        // Add item to cart
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

        // Save current cart state
        cy.saveCart();

        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();
    });

    describe('Verify cart item persists after restoring cart and login', () => {
        beforeEach(() => {
            cy.visit('/');

            // Restore cart contents before auth
            cy.restoreCart();

            cy.auth('standard_user', 'secret_sauce')
        });

        it('should show the item in the cart after login', () => {
            cy.get('.shopping_cart_badge').should('contain', '1');
            cy.takeScreenshot('cartPersist-')
        });
    });
});
 