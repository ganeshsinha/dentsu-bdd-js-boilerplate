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
