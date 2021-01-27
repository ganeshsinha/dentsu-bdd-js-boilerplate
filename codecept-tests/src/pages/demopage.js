const i=actor();
module.exports = {
    openpage() {
        i.amOnPage("https://www.google.com/");
    },
    entertext(){
        i.fillField({xpath:"//*[@id=\"tsf\"]/div[2]/div[1]/div[1]/div/div[2]/input"},"Apple");
    },
    click(){
        i.click({xpath:"//*[@id=\"tsf\"]/div[2]/div[1]/div[3]/center/input[1]"});
    }
}