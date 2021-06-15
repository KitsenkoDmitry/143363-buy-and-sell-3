"use strict";

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, FILE_NAME} = require(`../../constants`);

const offersRouter = new express.Router();
offersRouter.get(`/`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.json([]);
  }
});

module.exports = {
  name: `--server`,
  run: (args) => {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    app.use(express.json());
    app.use(`/offers`, offersRouter);

    app.listen(port, () => {
      console.info(chalk.green(`Server listening on port ${port}: http://localhost:${port}`));
    });
  },
};
