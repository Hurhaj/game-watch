describe('template spec', () => {
    //before hook for logging in app
    beforeEach(() => {
       cy.visit('/')

    });
    it('SelectMultiplePlatformsAndContinueTest', () => {
        cy.get('p').contains('PS Store').click()
        cy.get('p').contains('Steam').click()
        cy.get('p').contains('Xbox').click()
        cy.get('button[type="button"]').contains("Continue").click()
        cy.get('p').should('contain', "To get started, add a new game to watch")
    })

    it('SelectSinglePlatformTest', () =>{
        cy.get('p').contains('Steam').click()
        cy.get('button[type="button"]').contains("Continue").click()
        cy.get('p').should('contain', "To get started, add a new game to watch")
    })
  })