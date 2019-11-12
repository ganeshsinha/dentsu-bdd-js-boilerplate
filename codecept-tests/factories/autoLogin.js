import fs from 'fs';
import {RETRY} from './retryStatments';

const path = require('path');
let oktapass = process.env.OKTA_PASS;

const oktaSelectors = {
    login: 'input[name="username"]',
    home: 'input[name="app-link"]',
    storage: 'sid',
    userField: 'input[name="username"]',
    passwordField: '//input[@name="password"]',
    submitField: 'input[type="submit"]',
    nextButton: '#okta-signin-submit',
    verifyButton: "//input[@value='Verify']",
};

const appSelectors = {
    login: '#okta-signin-username',
    home: 'Taxonomy Manager',
    storage: 'okta-token-storage',
};

const getLogin = ({
                      role,
                      user,
                      password,
                      okta = oktaSelectors,
                      app = appSelectors
                  }) => {
    const oktaFile = path.join(__dirname, `../output/${role}_okta.json`);

    return {
        login: async (I) => {
            I.say("LOGIN");
            I.retry(RETRY).waitForVisible(okta.userField);
            I.fillField(okta.userField, user);
            const url = await I.grabCurrentUrl();
            I.click(okta.nextButton);
            I.retry(RETRY).waitForVisible(okta.passwordField);
            I.fillField(okta.passwordField, password);
            I.click(okta.verifyButton);
            I.retry(RETRY).waitForVisible(okta.home);
            const cookie = await I.grabCookie(okta.storage);
            fs.writeFileSync(oktaFile, JSON.stringify({url, [okta.storage]: cookie && cookie.value}));
            I.amOnPage("/");
            // I.retry(RETRY).waitForText(app.home);
        },

        check: (I) => {
            I.say('CHECK');
            // I.amOnPage('/');
            // I.retry(RETRY).waitForText(app.home);
        },

        fetch: async (I) => {
            I.say("FETCH");
            I.amOnPage('/');
            let token = await I.executeScript((storage) => localStorage.getItem(storage), app.storage);
            return JSON.parse(token);
        },

        restore: (I, session) => {
            I.say("RESTORE");
            const data = fs.readFileSync(oktaFile, 'utf8');
            if (!data) {
                return;
            }
            const cred = JSON.parse(data);
            if (!("sid" in cred) || !("url" in cred)) {
                this.login
            }
            I.retry(RETRY).waitForVisible(okta.login);
            I.setCookie({name: okta.storage, value: cred.sid});
            I.amOnPage('/');
            I.executeScript((session, storage) => {
                return localStorage.setItem(storage, session)
            }, session, app.storage);
        },
    }
};

let autoLogin;
export default autoLogin = {
    enabled: true,
    saveToFile: true,
    users: {
        admin: getLogin({
            role: 'admin',
            user: 'global.admin1@dentsuaegis.com',
            password: oktapass
        }),
        admin2: getLogin({
            role: 'admin2',
            user: 'global.admin2@dentsuaegis.com',
            password: oktapass
        }),
    }
};
