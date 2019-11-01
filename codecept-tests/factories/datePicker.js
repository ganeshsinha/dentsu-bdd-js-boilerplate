const I = actor();
const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const genericFunction = require('../factories/genericFuctions');

module.exports = {
    // from component library
    dateRangePicker(startDate, EndDate, locator) {
        let startDateYear = new Date(startDate).getFullYear();
        let currentYear = new Date().getFullYear();
        let startDateMonth = new Date(startDate).getMonth();
        let currentMonth = new Date().getMonth();
        let startDatePicked = new Date(startDate).getDate();

        let EndDateYear = new Date(EndDate).getFullYear();
        let EndDateMonth = new Date(EndDate).getMonth();
        let EndDatePicked = new Date(EndDate).getDate();
        genericFunction.waitAndClick(locator, 20);
        genericFunction.waitAndClick("(//option[text()='" + currentYear + "']/..)[1]", 20);
        genericFunction.waitAndClick("(//option[text()='" + startDateYear + "'])[1]", 20);
        genericFunction.waitAndClick("(//option[text()='" + months[currentMonth] + "']/..)[1]", 20);
        genericFunction.waitAndClick("(//option[text()='" + months[startDateMonth] + "'])[1]", 20);
        genericFunction.waitAndClick("(//div[text()='"+startDatePicked+"'][@aria-disabled='false'])[1]", 20);
        if(startDateMonth===EndDateMonth&&startDateYear===EndDateYear){
            genericFunction.waitAndClick("(//div[text()='"+EndDatePicked+"'][@aria-disabled='false'])[1]", 20);
        }
        else {
            genericFunction.waitAndClick("(//option[text()='" + currentYear + "']/..)[2]", 20);
            genericFunction.waitAndClick("(//option[text()='" + EndDateYear + "'])[2]", 20);
            genericFunction.waitAndClick("(//option[text()='" + months[startDateMonth + 1] + "']/..)[2]", 20);
            genericFunction.waitAndClick("(//option[text()='" + months[EndDateMonth] + "'])[2]", 20);
            genericFunction.waitAndClick("(//div[text()='" + EndDatePicked + "'][@aria-disabled='false'])[1]", 20);
        }
    },

    datePickerInput(date, locator) {
        let year = new Date(date).getFullYear();
        let currentYear = new Date().getFullYear();
        let month = new Date(date).getMonth();
        let currentMonth = new Date().getMonth();
        let datePick = new Date(date).getDate();
        this.waitAndClick(locator, 20);
        this.waitAndClick("(//option[text()='" + currentYear + "']/..)[1]", 20);
        this.waitAndClick("//option[text()='" + year + "']", 20);
        this.waitAndClick("//option[text()='" + months[currentMonth] + "']/..", 20);
        this.waitAndClick("//option[text()='" + months[month] + "']", 20);
        this.waitAndClick("(//div[text()='" + datePick + "'])[1]", 20);
    },

    //from taxonomy app
    datePicker(date) {
        if (!(date === "")) {
            let year = new Date(date).getFullYear();
            let currentYear = new Date().getFullYear();
            let month = new Date(date).getMonth();
            let currentMonth = new Date().getMonth();
            let datePick = new Date(date).getDate();
            this.waitAndClick("//div/label/../div[1]/input[@placeholder='MM/DD/YYYY']", 20);
            this.waitAndClick("//h6[text()='" + currentYear + "']", 5);
            I.waitForVisible("//div[text()='" + currentYear + "']", 5);
            I.click("//div[text()='" + year + "']");
            let numberOfClick = currentMonth - month;
            for (let i = 0; i < Math.abs(numberOfClick); i++) {
                if (numberOfClick < 0) {
                    this.waitAndClick("//p[contains(text(),'" + year + "')]/../..//button[2]", 20);
                }
                if (numberOfClick > 0) {
                    this.waitAndClick("//p[contains(text(),'" + year + "')]/../..//button[1]", 20);
                }
            }
            this.waitAndClick("//button[@tabindex='0']//span[text()='" + datePick + "']/..", 20);
            this.waitAndClick("//span[text()='OK']", 20);
        }
    },

    resetDatePicker() {
        this.waitAndClick("//input[@placeholder='MM/DD/YYYY']", 20);
        this.waitAndClick("//span[text()='Clear']", 20);
    },
};
