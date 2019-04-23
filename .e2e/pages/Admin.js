const I = actor();
const oktaPage = require('./Okta');
let faker = require('faker');
var expect = require('chai').expect;

var id;

module.exports = {

    fields: {
        addUserButton: '//div[@id="root"]/div/div/header/div[2]/button/span',
        searchByUser: '//input[@placeholder="Search by User Name"]',
        selectUserName: '//ul[@role="listbox"]/li[1]',
        rolesDropDown: "//div[@aria-haspopup='true']",
        selectRole: "//li[contains(text(),'Policy Manager')]",
        targetId: "#target_id",
        addRoleButton: "//span[text()='Add Role']"
    },

    login() {
        I.amOnPage('');
        I.see('Sign In')
        oktaPage.login('global.admin1@dentsuaegis.com', 'passwd');
        I.waitForText('Identity & Access');
        I.seeElement(this.fields.addUserButton);
    },

    addUser(user, role) {
        I.click(this.fields.addUserButton);
        I.waitForText('Add User To Role')
        I.fillField(this.fields.searchByUser, user)
        I.waitForEnabled(this.fields.selectUserName)
        I.click(this.fields.selectUserName)
        I.waitForElement(this.fields.rolesDropDown)
        I.click(this.fields.rolesDropDown)
        I.waitForEnabled(this.fields.selectRole)
        I.click(this.fields.selectRole)
        id = faker.random.alphaNumeric(4);
        I.fillField(this.fields.targetId, id)
        I.waitForEnabled(this.fields.addRoleButton)
        I.click(this.fields.addRoleButton)


    },

    checkIfUserAdded() {
        I.refreshPage();
        I.waitForText('Policy Manager(' + id + ')');
    },

    async removeUserPermissions(user) {

        let response = await I.sendGetRequest('/api/user-roles?userId=' + user);
        expect(response.status).to.be.equal(200);

        if (response.data.data.length >= 1) {

            for (let i = 0; i < response.data.data.length; i++) {

                let del_response = await I.sendDeleteRequest('/api/user-roles/' + response.data.data[i].id)
                expect(del_response.status).to.be.equal(200);
            }

        }

    }

};

Object.setPrototypeOf(module.exports, class Admin {
}.prototype);