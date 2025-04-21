class Autom_CheckoutValidation {

    // Define locators
    fullNameElement = '#address_delivery > .address_firstname'
    companyElement = '#address_delivery > :nth-child(3)'
    adressElement = '#address_delivery > :nth-child(4)'
    adress2Element = '#address_delivery > :nth-child(5)'
    locationElement = '#address_delivery > .address_city'
    countryElement = '#address_delivery > .address_country_name'

    // Method to fill the signup form
    verifyAddress(user) {
        cy.get(this.fullNameElement).should('contain', `Mr. ${user.firstName} ${user.lastName}`)
        cy.get(this.companyElement).should('contain', user.company)
        cy.get(this.adressElement).should('contain', user.address)
        cy.get(this.adress2Element).should('contain', user.address2)
        cy.get(this.locationElement).should('contain', user.city)
        cy.get(this.locationElement).should('contain', user.state)
        cy.get(this.locationElement).should('contain', user.zipCode)
        cy.get(this.countryElement).should('contain', user.country)
    }
}

export default new Autom_CheckoutValidation();