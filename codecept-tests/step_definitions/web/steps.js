const { I } = inject();
const loginPage = require('../../pages/Login');

//Use step file just to call page function do not create any logic in that.
    Given(/^User is on landing page$/, () => {
        loginPage.navigateToUrl();
        loginPage.enterText();
    });
    When(/^User enter the valid credentials$/, () => {
        loginPage.clickOnfirstLink();
        loginPage.clickOnLink();
        loginPage.switchNextWindow();
    });
    Then(/^User is navigated to the home page$/,  () => {
        loginPage.enterCreds();
        loginPage.clickOnSubmit();
    });
