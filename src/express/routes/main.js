'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const baseRouter = new Router();

const api = getAPI();

baseRouter.get(`/login`, (req, res) => res.render(`login`));
baseRouter.get(`/register`, (req, res) => res.render(`sign-up`));

baseRouter.get(`/search`, async (req, res) =>{
  const {search} = req.query;
  try {
    const results = await api.search(search);
    return res.render(`search-result`, {results});
  } catch (err) {
    return res.render(`search-result`, {results: []});
  }
});

baseRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  return res.render(`main`, {offers});
});

module.exports = baseRouter;
