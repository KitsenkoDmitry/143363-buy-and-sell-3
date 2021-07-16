'use strict';
const fs = require(`fs`).promises;
const {red} = require(`chalk`);
const {FILE_NAME} = require(`../../constants`);
let data = null;

const getMockData = async () => {
  if (data) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME, {encoding: `utf-8`});
    data = JSON.parse(fileContent);
  } catch (err) {
    console.error(red(`Can't read from file ${FILE_NAME}: ${err}`));
    return Promise.reject(err);
  }
  return Promise.resolve(data);
};

module.exports = getMockData;
