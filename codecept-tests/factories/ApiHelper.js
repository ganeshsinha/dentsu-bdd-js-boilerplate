const envURL = require('../config/envConfig');
module.exports = {

    getBaseApiUrl() {
        return envURL[envURL.env].api.REST_API_ENDPOINT;
    }
};


