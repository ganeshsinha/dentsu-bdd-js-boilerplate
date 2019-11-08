/* you can use url like this:- envURL[envURL.envConfig].web.HOST_URL before this you have to add require this envConfig file.
this envConfig file is use to manage all the URLS of your app you can use multiple base ulr like this:-
I.amOnPage(envURL[envURL.env].web.HOST_URL+"/dashboard") or I.amOnPage(envURL[envURL.env].web["HOST_URL"]+"/dashboard")
and also you can use this in API like this:- I.sendGetRequest(envURL[envURL.env].api.REST_API_ENDPOINT+`/api/...`)
or I.sendGetRequest(envURL[envURL.env].api["REST_API_ENDPOINT12"]+`/api/...`)
"process.envConfig.AppEnv" is for set envType from node script like "(SET AppEnv=test) && codeceptjs run --grep "" "
"process.envConfig.AppEnv" is use for set envType from your system variable or test is by default. */

const envConfig = {
    "env": process.env.AppEnv ||"test",
    "test": {
        "web": {
            "HOST_URL": "https://www.google.com/",
            "strapiURL": '',
        },
        "api": {
            "REST_API_ENDPOINT": "https://reqres.in/",
        },
        "server": {
            "graphQL_ENDPOINT": ""
        }
    },
    "dev": {
        "web": {
            "HOST_URL": "https://www.irctc.co.in/nget/train-search",
            "strapiURL": '',
        },
        "api": {
            "REST_API_ENDPOINT": "https://reqres.in/",
        },
        "server": {
            "graphQL_ENDPOINT": ""
        }
    },
    "stg": {
        "web": {
            "HOST_URL": "https://www.google.com/",
            "strapiURL": '',
        },
        "api": {
            "REST_API_ENDPOINT": "https://reqres.in/",
        },
        "server": {
            "graphQL_ENDPOINT": ""
        }
    }
};
module.exports = envConfig;
