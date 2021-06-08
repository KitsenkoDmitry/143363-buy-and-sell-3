"use strict";
const packageJSONFile = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run: () => {
    console.info(chalk.blue(packageJSONFile.version));
  },
};
