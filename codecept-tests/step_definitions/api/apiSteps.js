const apiURL = require('../../factories/ApiHelper');
let responseFromAPI;
const I = actor();

Given(/^User try to get the API response$/, () =>
    I.sendGetRequest(apiURL.getBaseApiUrl + `/api/users?page=2`).then(async (response) => {
        //await publishDraftsPage.verifyTableContent(response, "Fields");
        console.log(response);
        responseFromAPI = response;
    }));

Then(/^User receive the status code (\d+) in response$/, () => {
    console.log(responseFromAPI)
});

