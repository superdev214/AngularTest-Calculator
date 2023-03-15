import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I visit the website', () => {
  cy.visit('http://localhost:4200');
});

When('I add expenses', () => {
  const expenses = [
    { "name": "Adriana", "amount": 5.75 },
    { "name": "Adriana", "amount": 5.75 },
    { "name": "Bao", "amount": 12 }
  ];
  for (const expense of expenses) {
    cy.get('[data-cy="input-name"]').type(expense.name);
    cy.get('[data-cy="input-amount"]').type(expense.amount);
    cy.get('[data-cy="add-button"]').click();
  }
});

Then('I see three rows inthe expense table', () => {
  cy.get('[data-cy="expenses-table"] tbody tr').should('have.length', 3);
});

When('I settle up', () => {
  cy.get('[data-cy="settleup-button"]').click();
});

const SamplePayoutsResponse = `{
  "total": 23.5,
  "equalShare": 11.75,
  "payouts": [
    {
      "owes": "Adriana",
      "owed": "Bao",
      "amount": 0.25
    }
  ]
}`;
Then('I get payouts response', () => {
  cy.get('[data-cy="payouts-response"]').should('have.value', SamplePayoutsResponse);
});