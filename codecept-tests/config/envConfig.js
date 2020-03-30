/* you can use url like this:- envURL[envURL.envConfig].web.HOST_URL before this you have to add require this envConfig file.
this envConfig file is use to manage all the URLS of your app you can use multiple base ulr like this:-
I.amOnPage(envURL[envURL.env].web.HOST_URL+"/dashboard")

and also you can use this in
API like this:- I.sendGetRequest(envURL[envURL.env].api.REST_API_ENDPOINT+`/api/...`)

"process.envConfig.e2e_env" is for set envType from node script like
for Windows :- "(SET e2e_env=test) && codeceptjs run --steps"" "
or for linux :- "(e2e_env=test) && codeceptjs run --steps "
for pipeline :- "(e2e_env=test) && npm run test:e2e"
"process.envConfig.AppEnv" is use for set envType from your system variable or test is by default. */
//All the urls should be encoded by URL_ENcode.js

const envConfig = {

    "env": process.env.E2E_ENV || "test",

    "dev": {
        "web": {
            "HOST_URL": "http://ds-taxonomy01-dev-dan-taxonomy-client.az.ds-taxonomy.gdpdentsu.net",
        },
        "api": {
            "REST_API_ENDPOINT": "https://reqres.in/",
            // "Taxonomy_URL":"http://ds-taxonomy01-dev-dan-taxonomy-service.ds-taxonomy01-dev.svc.cluster.local",
        },
        "server": {
            "serverURL": "http://mappingui01-test-dan-mapping-svr.az.mapping.gdpdentsu.net/graphql",
        },
        "strapiCollectionName": "",
    },

    "test": {
        "web": {
            "HOST_URL": "http://ds-taxonomy01-test-dan-taxonomy-client.az.ds-taxonomy.gdpdentsu.net",
            "strapiURL": '',
        },
        "api": {
            "REST_API_ENDPOINT": "https://reqres.in/",
            // "Taxonomy_URL":"http://ds-taxonomy01-test-dan-taxonomy-service.ds-taxonomy01-test.svc.cluster.local",
        },
        "server": {
            "serverURL": "http://mappingui01-test-dan-mapping-svr.az.mapping.gdpdentsu.net/graphql",
        },
        "strapiCollectionName": "",
    },

    "int-g1ds": {
        "web": {
            "HOST_URL": "http://ds-taxonomy01-stg-dan-taxonomy-client.az.ds-taxonomy.gdpdentsu.net",
            "strapiURL": '',
        },
        "api": {
            "REST_API_ENDPOINT": "https://reqres.in/",
            // "Taxonomy_URL":"http://ds-taxonomy01-stg-dan-taxonomy-service.ds-taxonomy01-stg.svc.cluster.local",
        },
        "server": {
            "serverURL": "http://mappingui01-test-dan-mapping-svr.az.mapping.gdpdentsu.net/graphql",
        },
        "strapiCollectionName": "",
    },

};
module.exports = envConfig;
