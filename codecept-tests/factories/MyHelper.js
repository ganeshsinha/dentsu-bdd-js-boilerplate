// This js file contains some helpers which is use to find out the status of the locator
const Helper = codecept_helper;
const Window = require('window');
const window = new Window();

class MyHelper extends Helper {

    async isElementVisible(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForVisible(textOrLocator,timeout||5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isEnable(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForEnabled(textOrLocator, timeout||5);
            return true;
        } catch (err) {

            return false;
        }
    }

    async isPresent(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForElement(textOrLocator,timeout||5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isTextPresent(text, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForText(text,timeout||5);
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = MyHelper;
