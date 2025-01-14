describe('deleteAccount', () => {
    it('DeleteAccountTest', () => {
        cy.visit('/')

        cy.get('button').contains('Register / Login')
        .click()
        
        cy.get('input[id="agreeToTermsOfService"]').click({force: true})
        cy.get('input[name="username"]:visible').type('Testuser3')
        cy.get('input[name="password"]:visible').type('password')
        cy.get('button[type="submit"]').contains('Register').click()
        cy.get('p').should('contain', 'Hey')


        cy.get('p').contains('PS Store').click()
        cy.get('p').contains('Steam').click()
        cy.get('p').contains('Xbox').click()
        cy.get('button[type="button"]').contains("Continue").click()

        //logic for deleting
        cy.get('button[aria-label="settings"]').click()
        cy.get('button').contains('Delete Account').click()
        cy.get('button[class="chakra-button css-qjjd7t"]').click()


        cy.get('button').contains('Register / Login')
        .click()
        
        cy.get('button[id="tabs-:r7:--tab-1"]').contains('Login').click()
        cy.get('input[name="username"]:visible').type('Testuser3')
        cy.get('input[name="password"]:visible').type('password')
        cy.get('button[type="submit"]').contains('Login').click()
        cy.get('p').should('not.contain', 'Hey')
    })

    it()
})