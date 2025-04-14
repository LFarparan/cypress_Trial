import createUser from "../../support/user.utils";

describe('Automation Exercise 15', () => {
    before(()=>{
        cy.writeFile('cypress/fixtures/automationUser.json', createUser()); 
    })
    
    it('Verify registration while checkout', () => {
        cy.fixture('automationUser').then((user)=>{
            
        })
    });
});