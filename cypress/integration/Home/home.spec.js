/// <reference types="cypress" />

describe("Home test", () => {
  it("Reach the page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Search product for name", () => {
    cy.get("#input").type("iphone").should("have.value", "iphone");
    cy.get("#product-row-name").should("contain.text", "Nome: iPhone 9");
  });

  it("Search product for category", () => {
    cy.get("#input")
      .clear()
      .type("smartphones")
      .should("have.value", "smartphones");
    cy.get("#product-row-category").should("contain.text", "smartphones");
    cy.get("#input").clear();
  });

  it("Toggle add product logic", () => {
    cy.get("#button").click();
    cy.get("#form").should("be.visible");
    cy.get("#icon-close").click();
    cy.get("#form").should("not.exist");
  });

  it("Add new product disabled with only name field", () => {
    cy.get("#button").click();
    cy.get("#form").should("be.visible");
    cy.get("#form-name-input").type("Product Name");
    cy.get("#form-button").should(
      "have.css",
      "background-color",
      "rgb(128, 128, 128)"
    );
    cy.get("#form-name-input").clear();
  });

  it("Add new product disabled with only category field", () => {
    cy.get("#form-category-input").type("Product Category");
    cy.get("#form-button").should(
      "have.css",
      "background-color",
      "rgb(128, 128, 128)"
    );
    cy.get("#form-category-input").clear();
  });

  it("Add new product disabled with empty fields", () => {
    cy.get("#form-button").should(
      "have.css",
      "background-color",
      "rgb(128, 128, 128)"
    );
  });

  it("Add new product disabled with both field valorized", () => {
    cy.get("#form-name-input").type("Product Name");
    cy.get("#form-category-input").type("Product Category");
    cy.get("#form-button").should(
      "have.css",
      "background-color",
      "rgb(102, 102, 255)"
    );
  });

  it("Create new product", () => {
    cy.get("#form-button").click();
    cy.get("#input").type("Product Name").should("have.value", "Product Name");
    cy.get("#product-row-name").should("contain.text", "Nome: Product Name");
  });
});
