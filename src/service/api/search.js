'use strict';
const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);


module.exports = (app, service) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, (req, res) =>{
    const {query} = req.query;
    const categories = service.findAll(query);
    res.status(HttpCode.OK).json(categories);
  });
};
