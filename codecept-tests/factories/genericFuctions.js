const path = require("path");
import fs from 'fs';
const I = actor();
module.exports = {

    transformTable(table) {
        let rows = table.rows;
        let headerRow = rows.shift();
        let headers = headerRow.cells.map(item => item.value);

        return rows.map(row => {
            let obj = {};
            row.cells.forEach((item, index) => {
                obj[headers[index]] = item.value;
            });
            return obj;
        });
    },

    removeDirectory(dir) {
        let list = fs.readdirSync(dir);
        for (let i = 0; i < list.length; i++) {
            let filename = path.join(dir, list[i]);
            let stat = fs.statSync(filename);
            if (filename === "." || filename === "..") {
            } else if (stat.isDirectory()) {
                fs.rmdir(filename);
            } else {
                fs.unlinkSync(filename);
            }
        }
        fs.rmdirSync(dir);
    },

    replaceAll(str, term, replacement) {
        return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), 'g'), replacement);
    },

    waitAndClick(locator, sec) {
        I.waitForVisible(locator, sec);
        I.waitForEnabled(locator, sec);
        I.click(locator);
    },

    waitAndSee(locator, sec) {
        I.waitForVisible(locator, sec);
        I.retry(3).seeElement(locator);
    },

    waitAndFillField(locator, text, sec) {
        I.waitForVisible(locator, sec);
        I.fillField(locator, text);
    },

    clearFields(locator, sec) {
        I.waitForVisible(locator, sec);
        I.click(locator);
        I.pressKey(["\uE009", "a", "\uE009"]);
        I.pressKey("Backspace");
    },

    waitAndAssertText(text, locator, sec) {
        I.waitForVisible(locator, sec);
        I.seeTextEquals(text, locator);
    },

    async waitAndGetTextFromAttribute(attribute, locator, sec) {
        I.waitForVisible(locator, sec);
        return await I.grabAttributeFrom(locator, attribute);
    },

    async waitAndGetTextFromLocator(locator, sec) {
        I.waitForVisible(locator, sec);
        return await I.grabTextFrom(locator);
    },

    async signIntoApplication(url,user,password) {
        I.amOnPage(url);
        I.waitForVisible("input[name='username']", 120);
        I.fillField("input[name='username']", user);
        I.click("#okta-signin-submit");
        I.waitForVisible("//input[@name='password']", 60);
        I.click("//input[@name='password']");
        I.fillField("//input[@name=,password,]", password);
        I.click("//input[@value='Verify']");
        I.waitForVisible("input[name='app-link']", 180);
        return  "Bearer " + await codeceptjs.container.helpers('WebDriver').executeScript(() => localStorage.token);
    },

};
