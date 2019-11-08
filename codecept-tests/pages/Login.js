const I = actor();

module.exports = {

    navigateToUrl() {
        I.amOnPage('');
    },

    async enterText() {
        I.fillField('//input[contains(@type,\'text\')]', 'testcomplete web orders');
        let a = await I.isVisible('//input[contains(@type,\'text\')]', 'testcomplete web orders', 20);
        I.pressKey('Enter');
    },

    clickOnfirstLink() {
        I.waitForVisible("//h3[@class='LC20lb'][contains(.,'Web Orders Basic Sample | TestLeft Documentation')]",20);
        I.click('//h3[@class=\'LC20lb\'][contains(.,\'Web Orders Basic Sample | TestLeft Documentation\')]');
    },

    clickOnLink() {
        I.waitForVisible('(//a[@target=\'_blank\'])[18]', 20);
        I.click('(//a[@target=\'_blank\'])[18]');
    },


    async switchNextWindow() {
        I.wait(10);
        I.switchToNextTab();
    },

    enterCreds() {
        I.waitForVisible('//input[contains(@id,\'username\')]', 20);
        I.fillField('//input[contains(@id,\'username\')]', 'Tester');
        I.waitForVisible('//input[contains(@id,\'password\')]', 10);
        I.fillField('//input[contains(@id,\'password\')]', 'test')
    },

    clickOnSubmit() {
        I.click('//input[contains(@id,\'button\')]');
        I.waitForVisible('//h1[contains(.,\'Web Orders\')]', 20);
        I.seeElement('//h1[contains(.,\'Web Orders\')]');
    }
}
