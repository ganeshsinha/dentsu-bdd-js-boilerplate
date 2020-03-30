@graphQL
Feature: Data File Queries

  Background:
    Given User is on landing page
    When User enter credentials
    Then User select client, market and application
      | Client         | application   |
      | General Motors | Data Refinery |
    Then User Select "Data Mapping" from Data Refinery landing page
    Then  verify heading should be "Data Mapping" on Dashboard

  Scenario: Verify data file name and type from the queries similar to the api
    Given hit getFile query and get data from server
    Then verify data from query are similar to api /files/filestore-data-files/

  Scenario: Verify meta Data from the queries similar to the api
    Given hit getFile query and get data from server
    And get unique file id from getFile query
    Then hit getMetaData query and get data from server
    Then verify data from query are similar to api /files/${id}/metadata

  Scenario: Verify response from the meta Data queries when id is invalid
    Given hit getMetaData query with invalid id
    Then verify status code,message and getMetaData response

  Scenario: Verify records for data file from the queries similar to the api
    Given hit getFile query and get data from server
    And get unique file id from getFile query
    Then hit getRecords query and get data from server
    Then verify data from query are similar to api /files/${id}/retrieve-lines

  Scenario: Verify response from the getRecords queries when id is invalid
    When hit getRecords query with invalid id
    Then verify status code,message and getRecords in response