const i=actor();
const a= require("../pages/demopage");
Given(/^I am on home page$/, function () {
    a.openpage();

});
Given(/^I entered "([^"]*)"$/, function () {
    a.entertext();
});
Then(/^Press enter$/, function () {
    a.click();
});