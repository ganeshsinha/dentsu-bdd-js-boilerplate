/*This file is using for Storing Static string for the App in multiple language
use it like this "strings.SuccessMessage.publishMessage["eng"]" pass any language which you set in your app.*/
const successMessage=require("./staticStrings/successMessage");
const validationMessage=require("./staticStrings/validationMessage");
module.exports = {
    validationMessage,
    successMessage,
};
