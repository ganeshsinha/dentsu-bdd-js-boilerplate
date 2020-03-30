let responseFromAPI;
const chai = require('chai');
const assert = chai.assert;
const {userService} = require('../../services');
let {newUser,createUserRes} = require('../../model/api');
const genericMethod = require('../../../factories/genericFuctions');

Given(/^User try to get the API response$/, async () => {
    responseFromAPI = await userService.getUserNameAPI();
});

Then(/^User receive the status code (\d+) in response$/, () => {
    console.log(responseFromAPI.data)
});

Given(/^create new user by hit post request$/, async function (table) {
    let newUserCreate = genericMethod.transformTable(table);
    newUser=newUserCreate[0];
    responseFromAPI = await userService.createUserNameAPI(newUser);
    createUserRes=responseFromAPI;
});

Then(/^verify new user is created$/, function () {
    console.log(createUserRes);
    console.log(createUserRes.name)
});
