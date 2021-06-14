'use strict';

const {Router} = require(`express`);
const myRouter = new Router();

myRouter.get(`/comments`, (req, res) => res.render(`comments`));
myRouter.get(`/`, (req, res) => res.render(`tickets/my-tickets`));

module.exports = myRouter;
