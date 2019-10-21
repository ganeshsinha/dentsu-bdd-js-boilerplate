//This js file contains some helpers which is use to find out the status of the locator
const I = actor();
let Helper = codecept_helper;

class MyHelper extends Helper {

    async isVisible(textOrLocator, timeout) {
        const helper = this.helpers['WebDriver'];
        try {
            await helper.waitForVisible(textOrLocator, timeout);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isEnable(textOrLocator, timeout) {
        const helper = this.helpers['WebDriver'];
        try {
            await helper.waitForEnabled(textOrLocator, timeout);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isPresent(textOrLocator, timeout) {
        const helper = this.helpers['WebDriver'];
        try {
            await helper.waitForElement(textOrLocator, timeout);
            return true;
        } catch (err) {
            return false;
        }
    }

    async isTextPresent(text, timeout) {
        const helper = this.helpers['WebDriver'];
        try {
            await helper.waitForText(text, timeout);
            return true;
        } catch (err) {
            return false;
        }
    }


}

module.exports = MyHelper;
