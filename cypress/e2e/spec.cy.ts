/// <reference types="cypress" />

describe('Despegar Home page', () => {

    const email = "testing.aseca@gmail.com"
    const pass = "Tpaseca123"

    beforeEach(() => {
        cy.visit('https://www.despegar.com.ar/')
    })

    it('visits and login', () => {
        cy.get('#not-logged').click()
        cy.contains('Ingresa con tu email').click()
        cy.contains('Siguiente').click()
        cy.get("#input-email").type(email)
        cy.get("#logo-mobile").click()

    })

    it('should search for an activity', () => {
        cy.contains("Actividades").click()
        cy.get(".login-incentive--header").get(".login-incentive--close").click()

        cy.wait(1000)
        cy.get(".sbox-places-destination--1xd0k").find(".input-container")
            .find("input[placeholder=\"Ingresá una ciudad o punto de interés\"]").type("Amsterdam, Holanda Septentrional, Holanda")
        cy.wait(2000)
        cy.get('ul').contains("Amsterdam, Holanda Septentrional, Holanda").click()

        cy.get(".sbox5-box-search-button-container--3zL-J").find(".sbox5-box-button-ovr--lF_7c").click()
        cy.wait(300)
        cy.scrollTo(0, 500)
    });

    it('should search for a hotel', () => {
        cy.contains("Alojamientos").click()
        cy.wait(2000);
        cy.get(".login-incentive--header").get(".login-incentive--close").click()


        cy.wait(1000)
        cy.get(".sbox-places-destination--1xd0k").find(".input-container")
            .find("input[placeholder=\"Ingresá una ciudad, alojamiento o punto de interés\"]").type("Barcelona, Cataluña, España")
        cy.wait(2000)

        cy.get('ul').contains("Barcelona, Cataluña, España").click()

        cy.get(".sbox5-dates-input1-container").find("input[placeholder=\"Entrada\"]").click()
        cy.wait(1000)
        cy.get(".sbox5-monthgrid-datenumber").get(".sbox5-monthgrid-datenumber").find
        (".sbox5-monthgrid-datenumber-text").click({multiple: true, force: true})

        cy.wait(1000)
        cy.get(".sbox5-dates-input2-container").find("input[placeholder=\"Salida\"]").click()
        cy.get(".sbox5-monthgrid-dates-31").find(".sbox5-monthgrid-tooltip").contains("1 Noche")
            .click({multiple: true, force: true})

        cy.get(".sbox5-box-content").find(".sbox5-3-btn").click()
        cy.wait(2000)

        cy.scrollTo(0,2000)
        cy.wait(100)

        cy.scrollTo(2000, 100)
        cy.get(".eva-3-cluster-gallery").first().find(".eva-3-pricebox-cluster").find(".pricebox-action").click()
    });

})
