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

    env: process.env.E2E_ENV || 'int-g1ds',

    dev: {
        web: {
            HOST_URL: 'http://mappingui01-test-dan-dr-mapping-ui.az.mapping.gdpdentsu.net',
        },
        server: {
            serverURL: 'http://mappingui01-dev-dan-mapping-svr.az.mapping.gdpdentsu.net/graphql',
        },
    },

    test: {
        web: {
            HOST_URL: 'http://mappingui01-test-dan-dr-mapping-ui.az.mapping.gdpdentsu.net',
        },
        server: {
            serverURL: 'http://mappingui01-test-dan-mapping-svr.az.mapping.gdpdentsu.net/graphql',
        },
    },

    'int-g1ds': {
        web: {
            HOST_URL: 'https://platform.wal.int.az.eu.mediaecosystem.io/',
        },
        server: {
            serverURL: 'https://shared01-int-g1ds-kong-proxy.az.eu-az-int-wal.gdpdentsu.net/mapping/graphql',
        },
        market: 'General Motors France',
        client: 'General Motors'
    },

    'nft-g1ds': {
        web: {
            HOST_URL: 'https://platform.wal.nft.az.eu.mediaecosystem.io/',
        },
        server: {
            serverURL: 'https://shared01-nft-g1ds-kong-proxy.az.eu-az-nft-wal.gdpdentsu.net/mapping/graphql',
        },
        market: 'General Motors France',
        client: 'General Motors',
    },

    'stg-g1ds': {
        web: {
            HOST_URL: 'https://platform.wal.stg.az.eu.mediaecosystem.io/',
        },
        server: {
            serverURL: 'https://shared01-stg-g1ds-kong-proxy.az.eu-az-stg-wal.gdpdentsu.net/mapping/graphql',
        },
        market: 'General Motors United States of America (the)',
        client: 'General Motors',
    },

};

module.exports = envConfig;
