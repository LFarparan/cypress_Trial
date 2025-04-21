class Autom_AddCard {
    // Define locators
    fullNameInput = '[data-qa="name-on-card"]'
    cardNumberInput = '[data-qa="card-number"]'
    cvcInput = '[data-qa="cvc"]'
    exMonthInput = '[data-qa="expiry-month"]'
    exYearInput = '[data-qa="expiry-year"]'
    formElement = 'form#payment-form'
    payButton = '[data-qa="pay-button"]'
    paymentSuccessPrompt = '#success_message > .alert-success'
    paymentSuccessMessage = '.col-sm-9 > p'


    // Method to fill the CARD details
    fillCardForm(user) {
        cy.get(this.fullNameInput).type(user.firstName + " " + user.lastName)
        cy.get(this.cardNumberInput).type(user.cardNumber)
        cy.get(this.cvcInput).type(user.cvc)
        cy.get(this.exMonthInput).type(user.exmonth)
        cy.get(this.exYearInput).type(user.exyear)
    }

    // Method to validate Input Fields
    validateCardInputs(user) {
        cy.get(this.fullNameInput).should('have.value', user.firstName + " " + user.lastName)
        cy.get(this.cardNumberInput).should('have.value', user.cardNumber)
        cy.get(this.cvcInput).should('have.value', user.cvc)
        cy.get(this.exMonthInput).should('have.value', user.exmonth)
        cy.get(this.exYearInput).should('have.value', user.exyear)
        cy.get(this.payButton).should('be.visible').and('contain', 'Pay and Confirm Order')
        cy.get(this.paymentSuccessPrompt).should('contain',
            ('Your order has been placed successfully!'))
    }

    submitWithPreventDefault() {
        cy.get(this.formElement).then(($form) => {
            $form[0].addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent the first submission only
            }, { once: true }); // This makes it fire only ONCE
        });
        cy.get(this.payButton).click()
    }

    submitCardForm() {
        cy.get(this.payButton).click()
    }

    validateSuccessfulCard() {
        cy.get(this.paymentSuccessMessage).should('contain',
            'Congratulations! Your order has been confirmed!')
    }
}

export default new Autom_AddCard();