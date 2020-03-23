//In this file you have to add path of all the page file over here.
const include = {
    I: "./src/steps_file.js",
    loginPage: "./src/pages/Login.js",
};

const gherkin = {
    features: "./src/features/*/*/*.feature",

    steps: [
        "./src/step_definitions/web/steps.js",
        "./src/step_definitions/api/apiSteps.js",
        "./src/step_definitions/web/login_step.js",
    ]
};

module.exports = {
    include,
    gherkin,
};
