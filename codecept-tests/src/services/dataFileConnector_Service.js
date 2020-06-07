const I = actor();
const apiURL = require('../../factories/ApiHelper');
const genericMethod = require('../../factories/GenericFuctions');
const loginPage = require('../pages/login_Page');

const userService = {

    async getDataFileName() {
        const token = await genericMethod.getOktaToken();
        return await I.sendGetRequest(apiURL.getBaseApiUrl('/files/filestore-data-files/'),{
            Authorization: token,
            serviceconfig: await loginPage.getServiceConfig() || {},
        }).then(async (response) => response.data);
    },

    async getDataFileContent(id, start, end) {
        const token = await genericMethod.getOktaToken();
        return await I.sendGetRequest(apiURL.getBaseApiUrl(`/files/${id}/retrieve-lines/${start}/${end}/`),
            {
                Authorization: token,
                serviceconfig: await loginPage.getServiceConfig() ,
            }).then(async (response) => response.data);
    },

    async getDataFileNumberOfRows(id) {
        const token = await genericMethod.getOktaToken();
        return await I.sendGetRequest(apiURL.getBaseApiUrl(`/files/${id}/metadata/`),
            {
                Authorization: token,
                serviceconfig: await loginPage.getServiceConfig() || {},
            }).then(async (response) => response.data);
    },

    async getLoadConfig(dataSource,fileType,account) {
        const token = await genericMethod.getOktaToken();
        let endPoint=(account===''||account===null)?`/files/${dataSource}/${fileType}/load_rules/`
            :`/files/${dataSource}/${fileType}/load_rules/${account}`;
        return await I.sendGetRequest(apiURL.getBaseApiUrl(endPoint), {
                Authorization: token,
                serviceconfig: await loginPage.getServiceConfig() || {},
            }).then(async (response) => response.data);
    },
};

module.exports = userService;
