@Sm3
Feature: Demo feature dzx jnk
  Example for demo script of API

  Scenario: Demo script to run api scenario
    Given User try to get the API response
    Then User receive the status code 200 in response

  Scenario:Verify post request to create new user
    Given create new user by hit post request
      | name     | job    |
      | morpheus | leader |
    Then verify new user is created
