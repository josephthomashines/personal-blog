/// <reference types="Cypress" />
const config = require('./config.js')
const gatsby = require('../../gatsby-config.js')

describe('renders', () => {
  for (const screen of config.screens.all) {
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

        it('cy.window() - get the global window object', () => {
          cy.window().should('have.property', 'top')
        })

        it('cy.document() - get the document object', () => {
          cy.document()
            .should('have.property', 'charset')
            .and('eq', 'UTF-8')

          cy.get('head meta[name="description"]').should(
            'have.attr',
            'content',
            gatsby.siteMetadata.tagline,
          )

          cy.get('head meta[name="keywords"]').should(
            'have.attr',
            'content',
            gatsby.siteMetadata.keywords,
          )

          cy.get('head meta[name="author"]').should(
            'have.attr',
            'content',
            gatsby.siteMetadata.author,
          )
        })

        it('cy.title() - get the title', () => {
          cy.title().should('include', gatsby.siteMetadata.name)
        })
      })
    }
  }
})
