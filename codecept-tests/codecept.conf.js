require('import-export');
const {include, gherkin} = require('./config/include');
const {WebDriver, REST, GraphQL} = require('./config/helpers');
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
        WebDriver, REST, GraphQL,
        customHelper: {require: './factories/MyHelper.js'}
    },

    include,
    gherkin,
    plugins: {
        screenshotOnFail: {enabled: true},
        wdio: {enabled: true, services: ['selenium-standalone']},
        allure: {enabled: true},
    },
    name: 'Codeceptjs-Skeleton'
};
