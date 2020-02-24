// / <reference path="..\steps.d.ts" />
const I = actor();
const envURL = require('../../config/envConfig');
let {market, client} = envURL[envURL.env];
const genericMethod = require('../../factories/genericFuctions');
const CmsContext = require('../../factories/CMSContent');

const url = require('url');
const querystring = require('querystring');

module.exports = {

    fields: {
        profileIcon: '//*[@id="root"]/div/div/div/header/div/div/button',
        email: '#okta-signin-username',
        password: '//input[@name=\'password\']',
        nextButton: "//input[@value='Next']",
        verifyButton: '//input[@value=\'Verify\']',
        oktaGlobal: '//a/span[text()="global"]',
        oktaSignOut: '//a/p[text()="Sign out"]',
        logoutButton: "//li[text()='Logout']",
        submitButton: "//input[@id='okta-signin-submit']",
    },

    landingPage: {
        marketAndClientSelector: (client, selector) => `//p[text()='${client}']/..//div[contains(text(),'${selector}')]/..//input`,
        agreeButton: "//span[text()='I agree']/..",
        acceptButton: "//span[text()='Accept cookies']/..",
        launchButton: (client) => `//p[text()='${client}']/..//span[text()='Launch app']/..`,
        languageSelector: "//select[@name='language']",
        languageOption: (language) => `//option[text()='${language}']`,
    },

    fillEmail(user) {
        I.waitForVisible(this.fields.email, 30);
        I.fillField(this.fields.email, user);
    },

    async changeLanguage(language) {
        I.waitForVisible(this.landingPage.languageSelector, 20);
        I.click(this.landingPage.languageSelector);
        I.waitForVisible(this.landingPage.languageOption(language), 20);
        I.click(this.landingPage.languageOption(language));
        CmsContext.language = language;
        await this.getCMSContentThroughLanguage('datamappings', CmsContext.language);
    },

    fillPassword(pass) {
        I.waitForVisible(this.fields.password, 30);
        I.fillField(this.fields.password, pass);
    },

    async Login(user, pass) {
        await I.isPresent(this.fields.email, 10).then(async (isButtonRendered) => {
            if (isButtonRendered === true) {
                if (envURL.env === 'dev' || envURL.env === 'test') {
                    this.login(user, pass);
                } else {
                    this.loginInOkta(user, pass);
                }
                // await this.getCMSContentThroughLanguage("datamappings", CmsContext.language)
            }
        });
        await this.acceptCookiesOnLandingPage();
    },

    async getCMSContentThroughLanguage(collection, lang) {
        const cmsContent = await genericMethod.getCMSContentFromGraphQL(collection, lang);
        CmsContext.result = (cmsContent.status === 200
            && (cmsContent.data.data.getContent.result !== null
                || cmsContent.data.data.getContent.result !== []))
            ? cmsContent.data.data.getContent.result
            : CmsContext.result;
    },

    async acceptCookiesOnLandingPage() {
        if (envURL.env === 'int-g1ds' || envURL.env === 'nft-g1ds' || envURL.env === 'stg-g1ds') {
            await I.isPresent(this.landingPage.agreeButton, 20).then((status) => {
                if (status) {
                    I.waitForVisible(this.landingPage.agreeButton, 20);
                    I.click(this.landingPage.agreeButton);
                }
            });
            await I.isPresent(this.landingPage.acceptButton, 3).then((status) => {
                if (status) {
                    I.waitForVisible(this.landingPage.acceptButton, 40);
                    I.waitForEnabled(this.landingPage.acceptButton, 40);
                    I.click(this.landingPage.acceptButton);
                }
            });
        }
    },

    loginInOkta(user, pass) {
        this.fillEmail(user);
        I.click(this.fields.nextButton);
        this.fillPassword(pass);
        I.click(this.fields.verifyButton);
        I.wait(5);
    },

    login(user, pass) {
        this.fillEmail(user);
        this.fillPassword(pass);
        I.click(this.fields.submitButton);
        I.wait(5);
    },

    async selectClientAndMarket(table) {
        if (envURL.env === 'int-g1ds' || envURL.env === 'nft-g1ds' || envURL.env === 'stg-g1ds') {
            this.verifyUserOnLandingPage();
            this.selectApplication(table);
            this.selectMarket(table);
            I.waitForVisible(this.landingPage.launchButton(table["Client"]), 40);
            I.click(this.landingPage.launchButton(table["Client"]));
        }
    },

    selectMarket(table) {
        I.waitForVisible(this.landingPage.marketAndClientSelector(table["Client"], 'Select an account'), 20);
        I.scrollTo(this.landingPage.marketAndClientSelector(table["Client"], 'Select an account'));

        if (!("Market" in table)) {
            I.fillField(this.landingPage.marketAndClientSelector(client,
                'Select an account'), market);
            I.pressKey('Enter');
        } else if (table["Market"] !== '' && table["Client"] !== '') {
            I.fillField(this.landingPage.marketAndClientSelector(table["Client"],
                'Select an account'), table["Market"]);
            I.pressKey('Enter');
        } else {
            I.click("//p[text()='" + client + "']/..//div[text()='Select an account']/..");
            I.waitForVisible("//div[contains(@id,'-option-0')]", 20);
            I.click("//div[contains(@id,'-option-0')]");
        }
    },

    selectApplication(table) {
        I.waitForElement(this.landingPage.marketAndClientSelector(table["Client"]||client, 'Select an app'), 20);
        I.scrollTo(this.landingPage.marketAndClientSelector(table["Client"]||client, 'Select an app'), 20,);
        I.fillField(this.landingPage.marketAndClientSelector(table["Client"]||client,
            'Select an app'), table["application"]);
        I.pressKey('Enter');
    },

    switchToFrame() {
        if (envURL.env === 'int-g1ds' || envURL.env === 'nft-g1ds' || envURL.env === 'stg-g1ds') {
            I.waitForVisible("//div[@id='container']//iframe", 40);
            I.switchTo("//div[@id='container']//iframe");
        }
    },

    verifyUserOnLandingPage() {
        I.waitForVisible("//p[text()='Clients and applications']", 40);
        I.seeElement("//p[text()='Clients and applications']");
    },

    async getServiceConfig() {
        let currentURL = await I.grabCurrentUrl();
        if (currentURL.includes("tenantId")) {
            let query = url.parse(currentURL).query;
            let queryString = querystring.parse(query);
            return `{ "tenantId": "${queryString.tenantId}", "subTenantId": "${queryString.subTenantId}", "clientCode": "${queryString.clientCode}", "marketCode": "${queryString.marketCode}" }`
        }
    }
};
