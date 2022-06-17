/// <reference types="cypress" />

describe('Despegar Home page', () => {

  const email = "testing.aseca@gmail.com"
  const pass = "Tpaseca123"

  it('visits and login', () => {
    cy.visit('https://www.despegar.com.ar/')

    cy.get('#not-logged').click()
    cy.contains('Ingresa con tu email').click()
    cy.contains('Siguiente').click()
    cy.get("#input-email").type(email)
    cy.get("#logo-mobile").click()

    cy.contains("Alojamientos").click()

   /* cy.get('offer-card').first().click()
    cy.get('offer-card').first().click()


    cy.get('aloha-cluster-container').first().click()*/
    // cy.get("input[placeholder=\"Ingresa hacia dónde viajas\"]").type("Buenos Aires")


  })

})
