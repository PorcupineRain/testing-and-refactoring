/// <reference types="cypress"/>

describe("Todo App", () => {
  beforeEach("check if server is live", () => {
    cy.visit("http://localhost:3000");
  });

  it("should have input field", () => {
    cy.get("#toDoInput").should("exist");
  });

  it("should have filters", () => {
    cy.get("#filterNone").should("exist");
    cy.get("#filterDone").should("exist");
    cy.get("#filterOpen").should("exist");
  });

  it("should filter none", () => {
    cy.get("#filterNone").click();
    cy.get("#list").get("li").should("have.length", 3);
  });

  it("should filter done", () => {
    cy.get("#filterDone").click();
    cy.get("#list").get("li").should("have.length", 2);
  });

  it("should filter open", () => {
    cy.get("#filterOpen").click();
    cy.get("#list").get("li").should("have.length", 1);
  });

  it("should add new elements", () => {
    cy.get("#toDoInput").type("learn cypress");
    cy.get("#addButton").click();
    cy.get("#list").get("li").should("have.length", 4);
  });

  it("should delete done", () => {
    cy.get("#removeDone").click();
    cy.get("#list").get("li").should("have.length", 1);
    cy.get("li").find("input[type=checkbox]").should("not.be.checked");
  });

  it("should not allow duplicates", () => {
    cy.get("#toDoInput").type("learn JS");
    cy.get("#addButton").click();
    cy.get("#list").get("li").should("have.length", 4);
    cy.get("#toDoInput").type("learn JS");
    cy.get("#addButton").click();
    cy.get("#list").get("li").should("have.length", 4);
  });
});
