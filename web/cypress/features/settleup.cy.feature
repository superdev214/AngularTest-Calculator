# cypress/features/settleup.cy.feature
Feature: Settle up
  Scenario: Settle up with 2 people
    Given I visit the website
    When I add expenses
    Then I see three rows inthe expense table
    When I settle up
    Then I get payouts response