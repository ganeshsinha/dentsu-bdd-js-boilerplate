const {include, gherkin} = require('./config/BddConfig');
const {WebDriver, GraphQL} = require('./config/WebHelpersConfig');
const browser = ['chrome', 'chrome', 'chrome', 'chrome'];
const hooks = require('./config/Hooks');

exports.config = {
    output: './output',

    multiple: {
        default: {grep: '@Sm3', browsers: browser[0]},
        group1: {grep: '@Sm1', browsers: browser[1]},
        group2: {grep: '@Sm2', browsers: browser[2]},
        group3: {grep: '@Sm4', browsers: browser[3]},
    },

    helpers: {
        WebDriver,
        GraphQL,
        customHelper: {require: './factories/MyHelper.js'},
    },

    //hooks added for parllel excution for more info go through with Readme
    bootstrapAll: hooks.setBootstrap,
    teardownAll: hooks.setTeardown,
    bootstrap: hooks.setBootstrap,
    teardown: hooks.setTeardown,

    include,
    gherkin,
    plugins: {
        screenshotOnFail: {enabled: true},
        // wdio: { enabled: true, services: ['selenium-standalone'] },
        allure: {
            enabled: true,
        },
    },
    name: 'codecept-test',
};
