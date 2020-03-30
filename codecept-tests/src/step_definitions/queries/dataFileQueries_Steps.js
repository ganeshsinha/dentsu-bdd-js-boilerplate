const chai = require('chai');
const queries = require('../../queries/dataFile_Queries');
const { dataFileService } = require('../../services/Index');
const { assert } = chai;
let dataFiles = null;
let dataFilesRecords = null;
let dataFilesID = null;
let response = null;
const I = actor();
let getDataFilesMetaData = null;

Given(/^hit getFile query and get data from server$/, async () => {
  dataFiles = await queries.getData();
  console.log("=============",dataFiles.data)
});

Then(/^verify data from query are similar to api \/files\/filestore\-data\-files\/$/, async () => {
  response = await dataFileService.getDataFileName();
  assert.equal(JSON.stringify(dataFiles.data.data.getDataSource.results),
    JSON.stringify(response.results));
});

Given(/^hit getMetaData query and get data from server$/, async () => {
  getDataFilesMetaData = await queries.getDataFile_MetaData(dataFilesID);
});

Then(/^verify data from query are similar to api \/files\/\$\{id\}\/metadata$/, async () => {
  response = await dataFileService.getDataFileNumberOfRows(dataFilesID);
  assert.equal(JSON.stringify(getDataFilesMetaData.data.data.getMetaData),
    JSON.stringify(response));
});

Then(/^hit getRecords query and get data from server$/, async () => {
  dataFilesRecords = await queries.getDataFile_Records(dataFilesID, 1, 10);
});

Then(/^verify data from query are similar to api \/files\/\$\{id\}\/retrieve\-lines$/, async () => {
  response = await dataFileService.getDataFileContent(dataFilesID, 1, 10);
  assert.equal(JSON.stringify(dataFilesRecords.data.data.getRecords.lines),
    JSON.stringify(response.lines));
});

Given(/^get unique file id from getFile query$/, () => {
  dataFilesID = dataFiles.data.data.getDataSource.results[0].ID;
});

Given(/^hit getMetaData query with invalid id$/, async () => {
  getDataFilesMetaData = await queries.getDataFile_MetaData('3456723456');
});

Then(/^verify status code,message and getMetaData response$/, () => {
  assert.equal(getDataFilesMetaData.data.errors[0].message, '404: Not Found');
  assert.equal(getDataFilesMetaData.data.data.getMetaData, null);
});

When(/^hit getRecords query with invalid id$/, async () => {
  dataFilesRecords = await queries.getDataFile_Records('345678907', 1, 10);
});

Then(/^verify status code,message and getRecords in response$/, () => {
  assert.equal(dataFilesRecords.data.errors[0].message,
    '404: Not Found');
  // assert.equal(dataFilesRecords.data.data.getRecords, null)
});
