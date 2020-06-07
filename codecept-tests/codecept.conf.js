const {include, gherkin} = require('./config/BddConfig');
const {WebDriver, REST, GraphQL} = require('./config/WebHelpersConfig');
const browser = ["chrome", "chrome", "chrome", "chrome"];
// const hooks = require('./config/Hooks');

exports.config = {
    output: './output',

    multiple: {
        default: {grep: '@Sm3', browsers: browser[0]},
        group1: {grep: '@Sm1', browsers: browser[1]},
        group2: {grep: '@Sm2', browsers: browser[2]},
        group3: {grep: '@Sm4', browsers: browser[3]},
    },

    helpers: {
        WebDriver, REST, GraphQL,
        customHelper: {require: './factories/MyHelper.js'}
    },

    // bootstrapAll: hooks.setBootstrap,
    // teardownAll: hooks.setTeardown,
    // bootstrap: hooks.setBootstrap,
    // teardown: hooks.setTeardown,

    include,
    gherkin,
    plugins: {
        screenshotOnFail: {enabled: true},
        wdio: {enabled: true, services: ['selenium-standalone']},
        allure: {enabled: true},
    },
    name: 'Codeceptjs-Skeleton'
};
