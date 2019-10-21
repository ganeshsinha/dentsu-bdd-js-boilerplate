const { I } = inject();
const loginPage = require('../../pages/Login');

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
