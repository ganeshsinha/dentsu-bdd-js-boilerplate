const I = actor();

module.exports = {

    transformTable(table) {
        const {rows} = table;
        const headerRow = rows.shift();
        const headers = headerRow.cells.map((item) => item.value);
        return rows.map((row) => {
            const obj = {};
            row.cells.forEach((item, index) => {
                obj[headers[index]] = item.value;
            });
            return obj;
        });
    },

    async deleteApi(url,headers,data) {
        const axios = require('axios');
        return await axios.delete(url, {
          headers: headers,
          data: data
        }).then((response)=>{
         return response.data
        });
      },

    transFormList(table){
        const {cells} = table.rows[0];
        cells.forEach((item, index) => {
            cells[index]=item.value;
        });
        return cells;
    },

    replaceAll(str, term, replacement) {
        return str.replace(new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement);
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
        I.pressKey(['\uE009', 'a', '\uE009']);
        I.pressKey('Backspace');
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

    async getOktaToken() {
        let token = await I.executeScript(
            (storage) => localStorage.getItem(storage), 'okta-token-storage');
        token = JSON.stringify(token);
        token = JSON.parse(JSON.parse(token));
        return `Bearer ${token.accessToken.accessToken}`;
    },

    async getCMSContentFromGraphQL(collectionName, lang) {
        const token = await this.getOktaToken();
        return await I.sendQuery(
            `query{
                getContent(input:{ collectionName :"${collectionName}", language: "${lang}"})
                 { result 
                 __typename
                 }
            }`, {}, {}, {
                authorization: token,
                serviceconfig: '{"clientCode":"A_GNMOT","marketCode":"US?","subTenantId":"y9dc5","tenantId":"ff2e3"}',
            }
        );
    },

};
