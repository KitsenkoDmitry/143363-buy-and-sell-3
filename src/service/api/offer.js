'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);
const offerExists = require(`../middlewares/offer-exists`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentValidator = require(`../middlewares/comment-validator`);

const route = new Router();


module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    const offers = offerService.findAll();
    return res.status(HttpCode.OK).json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCode.NOT_FOUND).send(`Offer ${offerId} not found`);
    }

    return res.status(HttpCode.OK).json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    const newOffer = req.body;
    const createdOffer = offerService.create(newOffer);
    return res.status(HttpCode.CREATED).json(createdOffer);
  });

  route.put(`/:offerId`, [offerExists(offerService), offerValidator], (req, res) => {
    const {offerId} = req.params;

    const updatedOffer = offerService.update(offerId, req.body);
    return res.status(HttpCode.OK).json(updatedOffer);
  });

  route.delete(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offerId} = req.params;
    const deletedOffer = offerService.drop(offerId);
    res.status(HttpCode.OK).json(deletedOffer);
  });

  route.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);
    return res.status(HttpCode.OK).json(comments);
  });

  route.post(`/:offerId/comments`, [commentValidator, offerExists(offerService)], (req, res) => {
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);
    return res.status(HttpCode.OK).json(comment);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExists(offerService), (req, res) => {
    const {commentId} = req.params;
    const {offer} = res.locals;

    const deletedComment = commentService.drop(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }
    return res.status(HttpCode.OK).json(deletedComment);
  });
};
