// In this file you have to add path of all the page file over here.
const include = {
    I: './steps_file.js',
    loginPage: './src/pages/loginPage.js',
    validationRulesPage: './src/pages/validationRules_Page',
    characterRemoval: './src/pages/characterRemoval_Pages',
    fileDelimiter: './src/pages/confirmFileDelimiter_Page',
    duplicateDataPage: './src/pages/duplicateData_Page',
    fieldAliasPage: './src/pages/fieldAlias_Page.js',
    confirmFileHeaderAndFooterPage: './src/pages/confirmFileHeaderAndFooter_Page.js',
    characterReplacement: './src/pages/characterReplacement_Page',
    unexpectedLineBreak: './src/pages/unexpectedLineBreak_Page',
    dataMappingDashboard: './src/pages/dataMappingDashboard_Page',
    connectorDashboard: './src/pages/connectorDashboard',
};

const gherkin = {
    features: './src/features/*/*/*.feature',
    steps: [
        './src/step_definitions/login_step.js',
        './src/step_definitions/dataMappingDashboard_Steps.js',
        './src/step_definitions/validationRules_Steps.js',
        './src/step_definitions/confirmFileDelimiter_Steps.js',
        './src/step_definitions/characterReplacement_Steps.js',
        './src/step_definitions/characterRemoval_Steps.js',
        './src/step_definitions/confirmFileHeaderAndFooter_Steps.js',
        './src/step_definitions/duplicateData_Steps.js',
        './src/step_definitions/unexpectedLineBreak_Steps.js',
        './src/step_definitions/fieldAlias_Steps.js',
        './src/step_definitions/selectConnectorType.js',
    ],
};

module.exports = {
    include,
    gherkin,
};
