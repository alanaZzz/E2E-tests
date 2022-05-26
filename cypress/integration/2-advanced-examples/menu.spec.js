describe("website redirects", () => {
    it("webpage redirect", () => {
        const page = {
            "title": "Source",
            "from": "https://todomvc.com/examples/react/#/",
            "to": "https://github.com/tastejs/todomvc/tree/gh-pages/examples/react"
        }

        cy.visit(page.from, { failOnStatusCode: false });

        cy.url()
            .should("be.equals", page.to)

        cy.title()
            .should("include", page.title);
    });
});