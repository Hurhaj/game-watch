describe('PlatformSelectionTest' , () =>{
    beforeEach(() => {
        cy.visit('/')
    })
    it('NoPlatformSelectedAndProceedToContinue', () => {
        cy.get('button[type="button"]').contains("Continue").click()
        cy.get('p').should('not.contain', "To get started, add a new game to watch")  
    })
})