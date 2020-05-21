const I = actor();
const envURL = require('../../../config/EnvConfig');
const loginPage = require('../../pages/login_Page');
const genericMethod = require('../../../factories/GenericFuctions');
// const CryptoJS = require("crypto-js");
// const oktaPass = process.env.OKTA_PASS;
// const oktaKey = process.env.OKTA_KEY;
let currentUrl;
let table = '';

When('User enter credentials', async () => {
    let user = (envURL.env === "dev" || envURL.env === "test") ? "global.admin1" : 'Diana.Deane@dan-demo.com';
    let pass = (envURL.env === "dev" || envURL.env === "test") ? "" : "";
    await loginPage.Login(user,pass);
});

Given(/^User is on landing page$/, async () => {
    currentUrl = (envURL.env === 'dev' || envURL.env === 'test')
        ? '/mapping/data-files'
    : "https://platform.wal.int.az.eu.mediaecosystem.io/";

    I.amOnPage(currentUrl);
});

Then(/^User select client, market and application$/, async (input) => {
    if (envURL.env === 'int-g1ds' || envURL.env === 'nft-g1ds' || envURL.env === 'stg-g1ds') {
        table = table || genericMethod.transformTable(input);
        await loginPage.selectClientAndMarket(table[0]);
    }
});

Then(/^verify user is on landing page$/, function () {
    loginPage.verifyUserOnLandingPage()
});