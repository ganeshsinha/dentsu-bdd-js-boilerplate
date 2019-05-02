const HOST_URL = process.env.HOST_URL || 'http://enablers01-test-dan-user-management-client.az.enablers.gdpdentsu.net';
const REST_API_ENDPOINT = process.env.REST_API_ENDPOINT || 'http://enablers01-test-dan-role-manager-services.enablers01-test.svc.cluster.local';

exports.config = {
  output: './output',
  helpers: {

    Puppeteer: {
      url: HOST_URL,
      waitForNavigation: "networkidle0",
      waitForTimeout: 20000,
      show: true,
      windowSize: '640x480'
    },
    REST: {
        endpoint: REST_API_ENDPOINT,
        onRequest: async (request) => {
          let okta_token = await codeceptjs.container.helpers('Puppeteer').executeScript(() => localStorage.getItem('token'));
          request.headers = {
            Authorization: 'Bearer ' + okta_token,
            Accept: 'application/json',
            ContentType: "application/json; charset=utf-8"
          }
        }
    },

  },
  include: {
    Admin:'./pages/Admin.js',
    Okta:'./pages/Okta.js',
  },
  mocha: {},
  bootstrap: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.js']
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
