"use strict";

const express = require(`express`);
const {DEFAULT_PORT, API_PREFIX, HttpCode} = require(`../../constants`);
const getApiRouter = require(`../api`);
const {getLogger} = require(`../lib/logger`);


module.exports = {
  name: `--server`,
  run: async (args) => {
    const logger = getLogger({name: `api`});
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    const apiRouter = await getApiRouter();
    const app = express();
    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    app.use(express.json());

    app.use(API_PREFIX, apiRouter);

    // запрос на несуществующий маршрут
    app.use((req, res) =>{
      res.status(HttpCode.NOT_FOUND).send(`not found`);
      logger.error(`Route not found: ${req.url}`);
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occured: ${err.message}`);
    });

    app.listen(port, () =>{
      logger.info(`Server listening on port ${port}: http://localhost:${port}`);
    }).on(`error`, (e) => {
      logger.error(`An error occurred on server creation: ${e.message}`);
    });
  }
};
