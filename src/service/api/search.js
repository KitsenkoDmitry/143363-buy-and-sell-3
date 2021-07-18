'use strict';
const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);


module.exports = (app, service) => {
  const route = new Router();

  app.use(`/search`, route);

  route.get(`/`, (req, res) =>{
    const {search} = req.query;
    if (!search) {
      return res.status(HttpCode.BAD_REQUEST).json([]);
    }
    const categories = service.findAll(search);
    if (categories.length === 0) {
      return res.status(HttpCode.NOT_FOUND).json([]);
    }
    return res.status(HttpCode.OK).json(categories);
  });
};
