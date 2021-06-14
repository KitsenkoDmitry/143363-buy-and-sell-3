'use strict';

const {Router} = require(`express`);
const {getRandomItem} = require(`../../utils`);
const baseRouter = new Router();

baseRouter.get(`/login`, (req, res) => res.render(`login`));
baseRouter.get(`/register`, (req, res) => res.render(`sign-up`));
baseRouter.get(`/search`, (req, res) => res.render(`search-result`));
// для примера с тикитами и без
baseRouter.get(`/`, (req, res) =>res.render(`main`, {tickets: getRandomItem([1, undefined])}));

module.exports = baseRouter;
