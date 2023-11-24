import cypressConfig from "../../cypress.config"

describe('finderTests', () =>{
    it('findAnExistingGame', () =>{
        cy.visit('/')
        cy.get('button').contains('Register / Login')
        .click()
        
        cy.get('button[id="tabs-:r7:--tab-1"]').contains('Login').click()
        cy.get('input[name="username"]:visible').type('Hurhajko')
        cy.get('input[name="password"]:visible').type('password')
        cy.get('button[type="submit"]').contains('Login').click()

        cy.get('input[placeholder="Name of the game"]').type('Dota 2')
        cy.get('button[type="button"]').contains('Search').click()
        cy.get('p').contains('Dota 2').should('be.visible')
        cy.get('button').contains('Save').click()
        cy.get('span').should('contain', 'Dota 2')

    })


    it('removeExistingFoundGameTest', () =>{
        cy.visit('/')
        cy.get('button').contains('Register / Login')
        .click()
        
        cy.get('button[id="tabs-:r7:--tab-1"]').contains('Login').click()
        cy.get('input[name="username"]:visible').type('Hurhajko')
        cy.get('input[name="password"]:visible').type('password')
        cy.get('button[type="submit"]').contains('Login').click()

        cy.get('button[class="chakra-button chakra-menu__menu-button css-1adf8z4"]').click()
        cy.get('span').contains('Remove').click({force: true})
        cy.get('button[class="chakra-button css-qjjd7t"]').click({force: true})
        cy.get('p').should('not.contain', 'Dota 2')
    })
    
})