'use strict';

const {Router} = require(`express`);
const baseRouter = new Router();

baseRouter.get(`/`, (req, res) => res.send(`/`));

module.exports = baseRouter;
