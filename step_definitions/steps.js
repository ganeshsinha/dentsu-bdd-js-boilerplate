const Admin = require('../pages/Admin');

const I = actor();

Given('I am admin user and login into user management page', () => {
  Admin.login();
});

When('I add user {string} to {string} role', (user, role) => {
  Admin.addUser(user, role);
});

Then('the user is added to the role successfully', () => {
  Admin.checkIfUserAdded();
});

Given('I remove all associated roles of user {string}', (user) => {

  Admin.removeUserPermissions(user)
});
