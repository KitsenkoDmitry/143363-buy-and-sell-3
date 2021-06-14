'use strict';

const {Router} = require(`express`);
const baseRouter = new Router();

baseRouter.get(`/login`, (req, res) => res.send(`/login`));
baseRouter.get(`/register`, (req, res) => res.send(`/register`));
baseRouter.get(`/search`, (req, res) => res.send(`/search`));
baseRouter.get(`/`, (req, res) => res.send(`/`));

module.exports = baseRouter;
