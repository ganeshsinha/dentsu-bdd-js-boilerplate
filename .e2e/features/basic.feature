Feature: User management
  In order to make the applications secure
  As an admin
  I want to be able to be able to manage the users and roles

  Background: Remove existing permissions for user
     Given I am admin user and login into user management page
      And I remove all associated roles of user "Tvstack.user2@dentsuaegis.com"


  Scenario: Add a user to one or more roles
     When I add user "Tvstack.user2" to "Policy Manager" role
     Then the user is added to the role successfully