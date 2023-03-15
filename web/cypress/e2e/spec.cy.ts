describe('Settle up', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200');

    const expenses = [
      { "name": "Adriana", "amount": 5.75 },
      { "name": "Adriana", "amount": 5.75 },
      { "name": "Bao", "amount": 12 }
    ];
    for (const expense of expenses) {
      cy.get('[data-cy="input-name"]').type(expense.name);
      cy.get('[data-cy="input-amount"]').contains(expense.amount);
      cy.get('[data-cy="add-button"]').click();
    }

    cy.get('[data-cy="expenses-table"] tbody tr').should('have.length', 4);

    cy.get('[data-cy="settleup-button"]').click();

    cy.get('[data-cy="payouts-response"]').contains(`{
      "total": 23.5,
      "equalShare": 11.75,
      "payouts": [
        {
          "owes": "Adriana",
          "owed": "Bao",
          "amount": 0.25
        }
      ]
    }`);
  })
})