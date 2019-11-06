const envURL = require('./envConfig');
const HOST_URL = envURL[envURL.env].web.HOST_URL;
const path = require('path');
const downloadDir = path.join(__dirname, '../output/Download');

const WebDriver = {
    url: HOST_URL,
    restart: false,
    keepCookies: true,
    windowSize: "maximize",
    waitForAction: 200,
    browser: 'chrome',
    "desiredCapabilities": {
        "chromeOptions": {
         "args": ["--disable-gpu-headless", "--disable-gpu", "--window-size=1325x744", "--no-sandbox", "--disable-dev-shm-usage"],
            //This preference is use to set default download path for our scenarios and the path is ../output/Download
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

module.exports = WebDriver;
