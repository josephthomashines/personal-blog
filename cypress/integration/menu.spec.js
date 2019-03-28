/// <reference types="Cypress" />
const config = require('./config.js')

describe('menu renders and functions correctly', () => {
  for (const screen of config.screens.mobiles) {
    for (const page of config.pages) {
      context(`${screen} - ${page}`, () => {
        beforeEach(() => {
          if (Array.isArray(screen)) {
            cy.viewport(...screen)
          } else {
            cy.viewport(screen)
          }

          cy.visit(page)
        })

        it('shows and hides a menu properly', () => {
          cy.get('div#menu').should('not.be.visible')
          cy.get('div#menuButton').click()
          cy.get('div#menu').should('be.visible')
        })
      })
    }
  }
  for (const screen of config.screens.desktops) {
    for (const page of config.pages) {
      context(`${screen} - ${page}`, () => {
        beforeEach(() => {
          if (Array.isArray(screen)) {
            cy.viewport(...screen)
          } else {
            cy.viewport(screen)
          }

          cy.visit(page)
        })

        it('shows and hides a menu properly', () => {
          cy.get('div#menu').should('be.visible')
        })
      })
    }
  }
})
