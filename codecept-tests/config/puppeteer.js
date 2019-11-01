const envURL=require('./envConfig');
const HOST_URL = process.env.HOST_URL || envURL[envURL.env].web.HOST_URL;

const Puppeteer = {
    url: HOST_URL,
    restart: false,
    waitForNavigation: "domcontentloaded",
    waitForAction: 200,
    show:false,
    keepCookies:true,
    browser: 'chrome',
};

module.exports = Puppeteer;
