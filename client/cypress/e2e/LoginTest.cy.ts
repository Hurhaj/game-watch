describe('template spec', () => {
    it('LoginWithAlreadyRegisteredUserButBadCredentialsTest', () => {
        cy.visit('/') 
        cy.get('button').contains('Register / Login').click() 
        cy.get('button[id="tabs-:r7:--tab-1"]').contains('Login').click() 

        cy.get('input[name="username"]:visible').type('Hurhajko') 
        cy.get('input[name="password"]:visible').type('bad password') 

        cy.get('button[type="submit"]').contains('Login').click()
        cy.get('p').should('not.contain', 'Hey')
    })

    it('LoginWithAlreadyRegisteredUserTest', () => {
        cy.visit('/')

        cy.get('button').contains('Register / Login')
        .click()
        
        cy.get('button[id="tabs-:r7:--tab-1"]').contains('Login').click()
        cy.get('input[name="username"]:visible').type('Hurhajko')
        cy.get('input[name="password"]:visible').type('password')
        cy.get('button[type="submit"]').contains('Login').click()
        cy.get('p').should('contain', 'Hey')
    })
})