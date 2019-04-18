const HOST_URL = process.env.HOST_URL || 'http://enablers01-test-dan-user-management-client.az.enablers.gdpdentsu.net';
const REST_API_ENDPOINT = process.env.REST_API_ENDPOINT || 'http://tvstack01-dev-dan-role-manager-services.tvstack01-dev.svc.cluster.local';

exports.config = {
  output: './.e2e/output',
  helpers: {

    // ApiDataFactory: {
    //   endpoint: 'http://enablers01-test-dan-role-manager-services.enablers01-test.svc.cluster.local',
    //   cleanup: true,
    //   headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    //     'Accept': 'application/json',
    //   },
    //   factories: {
    //     user: {
    //         uri: "/users",
    //         factory: "./factories/user",
    //     }
    //   },
    //   onRequest: async (request) => {
    //     let cookies = await codeceptjs.container.helpers('Puppeteer').grabCookie();
    //     request.headers = { Cookie: cookies.map(c => `${c.name}=${c.value}`).join('; ') };
    //   },
    // },
    Puppeteer: {
      url: HOST_URL,
      waitForNavigation: "networkidle0",
      waitForTimeout: 20000,
      show: true
    },
    REST: {
      // config: {
        endpoint: 'http://enablers01-test-dan-role-manager-services.enablers01-test.svc.cluster.local',
        onRequest: async (request) => {
          let okta_storage = await codeceptjs.container.helpers('Puppeteer').executeScript(() => localStorage.getItem('okta-token-storage'));
          let okta_token = JSON.parse(okta_storage).idToken.idToken;
          // request.headers.Authorization= 'Bearer ' + okta_token;
          // request.headers.= 'pplication/json;charset=UTF-8';
          // request.headers.Accept= 'application/json';
          request.headers = {
            Authorization: 'Bearer ' + okta_token,
            Accept: 'application/json',
            ContentType: "application/json; charset=utf-8"
          }
        }
      // }
    },

  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './.e2e/features/*.feature',
    steps: ['./.e2e/step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true
    }
  },
  name: 'dentsu-bdd-js'
}
