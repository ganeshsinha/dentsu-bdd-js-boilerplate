//In this file you have to add path of all the page file over here.
const include = {
    I: "./steps_file.js",
    loginPage: "./pages/Login.js",
};

const gherkin = {
    features: "./features/*/*/*.feature",
    steps: [
        "./step_definitions/web/steps.js",
        "./step_definitions/api/apiSteps.js",
    ]
};

module.exports = {
    include,
    gherkin,
};
