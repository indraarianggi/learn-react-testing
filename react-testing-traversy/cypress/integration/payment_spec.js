// const { cy } = require("date-fns/locale");
const { v4: uuidv4 } = require("uuid");

describe("payment", () => {
  it("user can make payment", () => {
    // Login
    cy.visit("/");
    cy.findByRole("textbox", { name: /username/i }).type("johndoe");
    cy.findByLabelText(/password/i).type("s3cret");
    cy.findByRole("checkbox", { name: /remember me/i }).check();
    cy.findByRole("button", { name: /sign in/i }).click();

    // Check account balance
    let oldBalance;
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => (oldBalance = $balance.text()));

    // Click on new button
    cy.findByRole("button", { name: /new/i }).click();

    // Search for user
    cy.findByRole("textbox").type("devon becker");
    cy.findByText(/devon becker/i).click();

    // Add amount and note and click pay
    const paymentAmount = "5.00";
    cy.findByPlaceholderText(/amount/i).type(paymentAmount);
    const note = uuidv4();
    cy.findByPlaceholderText(/add a note/i).type(note);
    cy.findByRole("button", { name: /pay/i }).click();

    // Return to transactions
    cy.findByRole("button", { name: /return to transactions/i }).click();

    // Go to presonal payments
    cy.findByRole("tab", { name: /mine/i }).click();

    // Click on payment
    cy.findByText(note).click({ force: true });

    // Verify if payment was made
    cy.findByText(`-$${paymentAmount}`).should("be.visible");
    cy.findByText(note).should("be.visible");

    // verify if payment amount was deducted
    cy.get("[data-test=sidenav-user-balance]").then(($balance) => {
      const convertedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ""));
      const convertedNewBalance = parseFloat($balance.text().replace(/\$|,/g, ""));

      expect(convertedOldBalance - convertedNewBalance).to.equal(parseFloat(paymentAmount));
    });
  });
});
