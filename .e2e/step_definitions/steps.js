const Admin = require('../pages/Admin');

const I = actor();
// Add in your custom step files

Given('I am admin user and login into user management page', () => {
  Admin.login();
});

When('I add user {string} to {string} role', (user, role) => {
  Admin.addUser(user, role);
});

Then('the user is added to the role successfully', () => {
  // From ".e2e/features/basic.feature" {"line":9,"column":5}
  // throw new Error('Not implemented yet');
});

Given('I remove all associated roles of user {string}', (user) => {

  Admin.removeUserPermissions(user)
});
