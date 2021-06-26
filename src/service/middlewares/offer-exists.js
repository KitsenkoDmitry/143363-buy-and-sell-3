'use strict';
const {HttpCode} = require(`../../constants`);

module.exports = (offerService) => (req, res, next) => {
  const {offerId} = req.params;

  const offer = offerService.findOne(offerId);
  if (!offer) {
    res.status(HttpCode.NOT_FOUND).json(`Offer ${offerId} not found`);
  }
  res.locals.offer = offer;

  next();
};
