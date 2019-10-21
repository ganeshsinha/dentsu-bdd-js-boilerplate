/*Using this feature you can login to your app(by okta login) by automatically and also this feature store your sessionID
,URL and UserName, you just have to pass URL and credential of user */
import fs from 'fs';
import {RETRY} from './retryStatments';

const path = require('path');
const oktaPass = process.env.OKTA_PASS;
const strings = require('./strings');
let oktaFile;
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
    home: '',
    storage: 'okta-token-storage',
};

const getLogin = ({role, user, password, okta = oktaSelectors, app = appSelectors}) => {
    oktaFile = path.join(__dirname, `../output/${role}_okta.json`);
    // strings.userRolePath.loginUser = oktaFile;
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
            //url of the app
            I.amOnPage("https://www.google.com/");
            // I.retry(RETRY).waitForText(app.home);
        },

        check: (I) => {
            I.say('CHECK');
            // I.amOnPage('/');
            // I.retry(RETRY).waitForText(app.home);
        },

        fetch: (I) => {
            I.say("FETCH");
            I.amOnPage('/');
            return I.executeScript((storage) => localStorage.getItem(storage), app.storage);
        },

        restore: (I, session) => {
            I.say("RESTORE");
            const data = fs.readFileSync(oktaFile, 'utf8');
            if (!data) {
                return;
            }
            const cred = JSON.parse(data);
            if (!("sid" in cred) || !("url" in cred)) {
                this.login()
            }

            // Restoring OKTA cookie
            I.retry(RETRY).waitForVisible(okta.login);
            I.setCookie({name: okta.storage, value: cred.sid});

            // Restoring APP cookie
            I.amOnPage('https://www.google.com/');
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
    //User credentials
    users: {
        admin: getLogin({role: 'admin', user: '', password: oktaPass}),
        admin2: getLogin({role: 'admin2', user: '', password: oktaPass}),
    }
};
