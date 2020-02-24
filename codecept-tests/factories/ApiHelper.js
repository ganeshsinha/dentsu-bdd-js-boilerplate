const envURL = require('../config/envConfig');
module.exports = {
    getBaseApiUrl(url) {
        return envURL[envURL.env].api.REST_API_ENDPOINT + url || "/";
    },

};