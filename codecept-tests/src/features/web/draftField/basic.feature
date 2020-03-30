@Sm1
Feature: Business rules
  In order to achieve my goals
  As a persona
  I want to be able to interact with a system

  Scenario: Demo scenario
    Given User is on landing page
    When User click on first link
    And User enter the valid credentials
      | UserName | Password |
      | Tester   | test     |
    Then User is navigated to the home page
