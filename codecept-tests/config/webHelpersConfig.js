const envURL = require('./EnvConfig');
// const oktaKey = process.env.OKTA_KEY;
let {HOST_URL} = envURL[envURL.env].web;
let {serverURL} = envURL[envURL.env].server;
const path = require('path');
// const CryptoJS = require("crypto-js");
const downloadDir = path.join(__dirname, '../output/Download');

// HOST_URL = CryptoJS.AES.decrypt(HOST_URL, oktaKey).toString(CryptoJS.enc.Utf8);
// serverURL = CryptoJS.AES.decrypt(serverURL, oktaKey).toString(CryptoJS.enc.Utf8);

const WebDriver = {
    url: HOST_URL,
    browser: 'chrome',
    restart: true,
    keepCookies: true,
    windowSize: 'maximize',
    waitForAction: 200,
    desiredCapabilities: {
        chromeOptions: {
            "args": [
                "--headless",
              "--disable-gpu",
              "--window-size=1280,1696",
              "--no-sandbox",
              "--disable-dev-shm-usage"
            ],
            useAutomationExtension: true,
            prefs: {
                'download.default_directory': downloadDir,
            },
        },
    },


    // browser: 'firefox',
    //  'moz:firefoxOptions': {
    //      args: ["--headless", "--disable-gpu", "--window-size=1325x744", "--no-sandbox", "--disable-dev-shm-usage"],
    //  },
    //  "prefs": {
    //      'download.default_directory': downloadDir,
    // },

    // browser: "internet explorer",
    // desiredCapabilities: {
    //     ieOptions: {
    //         "ie.browserCommandLineSwitches": "-private",
    //         "ie.usePerProcessProxy": true,
    //         "ie.ensureCleanSession": true,
    //     }
    // }

};

const GraphQL = {
    endpoint: serverURL,
    timeout: 40000,
    headers: {
        serviceconfig: {
            tenantId: 'u0094', subTenantId: 'm1f7c', clientCode: 'A_GNMOT', marketCode: 'CA?',
        },
    },
};


module.exports = {WebDriver, GraphQL};
