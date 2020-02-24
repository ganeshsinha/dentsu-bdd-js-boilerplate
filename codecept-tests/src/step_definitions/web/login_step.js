let I = actor();
const {login} = inject();
const loginPage = require('../../pages/loginPage_okta');
const genericMethod = require('../../../factories/genericFuctions');

When('User enter credentials', async () => {
    let status = await I.isVisible("#okta-signin-username", 10);
    if (status) {
        await login("admin");
    }
    //for token //console.log(genericMethod.getOktaToken());
});

Given(/^User am on login page$/, () => {
    //I.amOnPage('/');
    I.amOnPage('https://dentsuaegis-test.okta-emea.com');
});
