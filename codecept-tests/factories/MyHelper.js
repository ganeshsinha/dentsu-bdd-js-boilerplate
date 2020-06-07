// This js file contains some helpers which is use to find out the status of the locator
const Helper = codecept_helper;
const Window = require('window');
const window = new Window();

class MyHelper extends Helper {

    // =========================================== Window Handel functions =============================================

    // url :- 'https://webdriver.io'
    // windowName:- 'WebdriverIO window'
    // windowFeature :- 'width=420,height=230,resizable,scrollbars=yes,status=1'
    async openNewWindow(url, windowName, windowFeature) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.newWindow(url, windowName, windowFeature)
    }

    async grabWindowHandles() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        return await browser.getWindowHandles().then((handle)=>{
            return handle
        })
    }

    async closeCurrentWindow() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.closeWindow()
    }

    async switchToWindow(handle) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.switchToWindow(handle)
    }

    async maximizeWindowSize() {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        const browser = helper.browser;
        await browser.maximizeWindow()
    }

    //==================================================================================================================


    // =========================================== Locator State functions =============================================
    // return true or false

    async isEnable(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForEnabled(textOrLocator, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isPresent(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForElement(textOrLocator, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isTextPresent(text, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForText(text, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isElementVisible(textOrLocator, timeout) {
        const helper = this.helpers[('Puppeteer' in this.helpers) ? 'Puppeteer' : 'WebDriver'];
        try {
            await helper.waitUntil(() => window.document.readyState === "complete", 20);
            await helper.waitForVisible(textOrLocator, timeout || 5);
            return true;
        } catch (err) {
            return false;
        }
    }
    //==================================================================================================================

    //==================================================== Hooks =======================================================

    _init(){

    }

    _before() {
        // remove if not used
    }

    _after() {
        // remove if not used
    }

    // _finishTest(){
    //
    // }

    //=====================================================================================================
}

module.exports = MyHelper;
