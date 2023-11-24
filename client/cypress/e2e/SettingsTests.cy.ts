describe('Settings testing', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.get('button').contains('Register / Login')
        .click()
        
        cy.get('button[id="tabs-:r7:--tab-1"]').contains('Login').click()
        cy.get('input[name="username"]:visible').type('Hurhajko')
        cy.get('input[name="password"]:visible').type('password')
        cy.get('button[type="submit"]').contains('Login').click()
    })
    it('ChangeTheAvaliableSourcesForCountryTest', () => {
        cy.get('button[aria-label="settings"]').click()
        cy.get('div[class="css-r157ul"]').click().type('{downarrow}{enter}')
        
        
        cy.get('div[class=" css-1xa1gs2"]').should('contain', 'Austria')
        
    })
    it('ChooseNoSourcesAndSaveTest', () => {
        cy.get('button[aria-label="settings"]').click()
        cy.get('p').contains('PS Store').click()
        cy.get('button').contains("Save").click()
        cy.get('p').should('contain', 'Available resources for')
    })

})