'use strict';
const {Router} = require(`express`);
const category = require(`./category`);
const offer = require(`./offer`);
const search = require(`./search`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  CommentService,
  OfferService,
  SearchService
} = require(`../data-service`);

const app = new Router();
(async () => {
  const data = await getMockData();

  category(app, new CategoryService(data));
  offer(app, new OfferService(data), new CommentService());
  search(app, new SearchService(data));
})();

module.exports = app;
