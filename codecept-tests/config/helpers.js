const envURL = require('./envConfig');
const oktaKey = process.env.OKTA_KEY;
let { HOST_URL } = envURL[envURL.env].web;
let { REST_API_ENDPOINT } = envURL[envURL.env].api;
let { serverURL } = envURL[envURL.env].server;
let CryptoJS = require("crypto-js");
const path = require('path');
const downloadDir = path.join(__dirname, '../output/Download');
HOST_URL=CryptoJS.AES.decrypt(HOST_URL, oktaKey).toString(CryptoJS.enc.Utf8);
REST_API_ENDPOINT=CryptoJS.AES.decrypt(REST_API_ENDPOINT, oktaKey).toString(CryptoJS.enc.Utf8);
serverURL=CryptoJS.AES.decrypt(serverURL, oktaKey).toString(CryptoJS.enc.Utf8);
const WebDriver = {
    url: HOST_URL,
    restart: false,
    keepCookies: true,
    windowSize: "maximize",
    waitForAction: 200,
    browser: 'chrome',
    "desiredCapabilities": {
        "chromeOptions": {
            "args": ["--headless", "--disable-gpu", "--window-size=1325x744", "--no-sandbox", "--disable-dev-shm-usage"],
            "useAutomationExtension": true,
            "prefs": {
                'download.default_directory': downloadDir,
            },
        },
    },


    /*browser: 'firefox',
    'moz:firefoxOptions': {
        args: ["--headless", "--disable-gpu", "--window-size=1325x744", "--no-sandbox", "--disable-dev-shm-usage"],
    },
    "prefs": {
        'download.default_directory': downloadDir,
    },*/

    // browser: "internet explorer",
    // desiredCapabilities: {
    //     ieOptions: {
    //         "ie.browserCommandLineSwitches": "-private",
    //         "ie.usePerProcessProxy": true,
    //         "ie.ensureCleanSession": true,
    //     }
    // }

};

const REST = {
    endpoint: REST_API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
};

const Puppeteer = {
    url: HOST_URL,
    restart: false,
    waitForNavigation: "domcontentloaded",
    waitForAction: 200,
    show: false,
    keepCookies: true,
    browser: 'chrome',
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


module.exports = {WebDriver, Puppeteer, REST, GraphQL};
