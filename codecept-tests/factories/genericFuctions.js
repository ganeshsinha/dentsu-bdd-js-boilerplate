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

    getOktaToken(){
        const sessionFile = path.join(__dirname, `../output/admin_session.json`);
        const data = fs.readFileSync(sessionFile, 'utf8');
        if (!data) { return; }
        const cred = JSON.parse(data);
        return cred.idToken.idToken;
    },

};
