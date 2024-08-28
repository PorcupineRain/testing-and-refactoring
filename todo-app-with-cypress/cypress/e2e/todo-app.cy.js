/// <reference types="cypress"/>

describe("Todo App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should have input field", () => {
    cy.get("#toDoInput").should("exist");
  });

  it("should add new elements", () => {
    cy.get("#toDoInput").type("learn cypress");
    cy.get("#addButton").click();
    cy.get("#list").get("li").should("have.length", 4);
  });

  it("should have filters", () => {
    cy.get("#filterNone").should("exist");
    cy.get("#filterDone").should("exist");
    cy.get("#filterOpen").should("exist");
  });
});
