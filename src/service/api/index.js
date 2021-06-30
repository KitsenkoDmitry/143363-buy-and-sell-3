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

module.exports = async () => {
  const app = new Router();
  const data = await getMockData();

  category(app, new CategoryService(data));
  offer(app, new OfferService(data), new CommentService());
  search(app, new SearchService(data));

  return app;
};
