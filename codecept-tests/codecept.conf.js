require('import-export');
const envURL = require('./config/envConfig');
const REST_API_ENDPOINT =  envURL[envURL.env].api.REST_API_ENDPOINT;
const autoLogin = require('./factories/autoLogin');
const {include, gherkin} = require('./config/include');
const WebDriver = require('./config/webDriverConfig');
const Puppeteer = require('./config/puppeteer');
const browser = ["chrome", "chrome", "chrome", "chrome"];

exports.config = {
    output: './output',

    multiple: {
        default: {grep: "@Sm3", browsers: browser[0]},
        group1: {grep: "@Sm1", browsers: browser[1]},
        group2: {grep: "@Sm2", browsers: browser[2]},
        group3: {grep: "@Sm4", browsers: browser[3]}
    },

    helpers: {
        WebDriver,
        REST: {
            endpoint: REST_API_ENDPOINT,
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
        },
        customHelper: {require: './factories/MyHelper.js'}
    },
    include,
    gherkin,
    plugins: {
        screenshotOnFail: {enabled: true},
        wdio: {enabled: true, services: ['selenium-standalone']},
        allure: {enabled: true},
        autoLogin,
    },
    name: 'Codeceptjs-Skeleton'
};
