'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const myRouter = new Router();

const api = getAPI();

myRouter.get(`/comments`, async (req, res) => {
  const offers = await api.getOffers();
  return res.render(`comments`, {offers});
});

myRouter.get(`/`, async (req, res) => {
  const offers = await api.getOffers();
  return res.render(`tickets/my-tickets`, {offers});
});

module.exports = myRouter;
