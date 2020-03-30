const loginPage = require('../../pages/Login');
const genericMethod = require('../../../factories/genericFuctions');

//Use step file just to call page function do not create any logic in that.
Given(/^User is on landing page$/, () => {
    loginPage.navigateToUrl();
    loginPage.enterText();
});

When(/^User enter the valid credentials$/, (cred) => {
    let userCred = genericMethod.transformTable(cred);
    loginPage.switchNextWindow();
    loginPage.enterCreds(userCred[0]);
});

Then(/^User is navigated to the home page$/, () => {
    loginPage.clickOnSubmit();
});

When(/^User click on first link$/, () => {
    loginPage.clickOnfirstLink();
    loginPage.clickOnLink();
});
