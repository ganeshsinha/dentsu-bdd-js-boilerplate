const I = actor();
const oktaPage = require('./Okta');
const faker = require('faker');
var assert = require('assert');

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

    login(){
        I.amOnPage('');
        I.see('Sign In')
        oktaPage.login('global.admin1@dentsuaegis.com', 'passwd');
        I.waitForText('Identity & Access');
        I.seeElement(this.fields.addUserButton);
    },

    addUser(user, role){
        I.click(this.fields.addUserButton);
        I.waitForText('Add User To Role')
        I.fillField(this.fields.searchByUser, user)
        I.waitForEnabled(this.fields.selectUserName)
        I.click(this.fields.selectUserName)
        I.waitForElement(this.fields.rolesDropDown)
        I.click(this.fields.rolesDropDown)
        I.waitForEnabled(this.fields.selectRole)
        I.click(this.fields.selectRole)
        // I.fillField(this.fields.targetId, '17682')
        I.fillField(this.fields.targetId, faker.random.number)
        I.waitForEnabled(this.fields.addRoleButton)
        I.click(this.fields.addRoleButton)
        I.see('Added')

    },

    async removeUserPermissions(user){

        let response = await I.sendGetRequest('http://enablers01-test-dan-role-manager-services.enablers01-test.svc.cluster.local/api/user-roles?userId='+user);
        console.info("response is: "+response);

        // this.helpers['REST']._executeRequest({
        //     'http://tvstack01-dev-dan-role-manager-services.tvstack01-dev.svc.cluster.local/api/user-roles?userId=Tvstack.user1@dentsuaegis.com',
        //     headers,
        // });



        // console.info("response is: "+response.code);
        // assert.equal(ret.code, '200')
                // let userRolesResponse = I.sendGetRequest('http://enablers01-test-dan-role-manager-services.enablers01-test.svc.cluster.local/api/user-roles?userId='+user);
        // if (userRolesResponse.length > 1){
        //     userRolesResponse.forEach(element => {
        //         I.sendDeleteRequest('/api/user-roles/'+element.id)
        //     });
        }

};

Object.setPrototypeOf(module.exports, class Admin {}.prototype);