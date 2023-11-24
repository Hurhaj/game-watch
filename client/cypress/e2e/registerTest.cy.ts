describe('template spec', () => {
    // register 
    it('RegisterWithoutAgreeingPrivacyPolicyTest', () => {
        cy.visit('/');
        
      
        cy.get('button').contains('Register')
        .click()
        cy.get('#username:visible').type('Hurhajko')
        cy.get('#password:visible').type('password')
        cy.get('label[class="chakra-checkbox css-1577qb8"]').click()
        cy.get('button[type="submit"]').contains('Register').click()
        cy.get('button[type="submit"]').should('contain', 'Register')
    })
    
})