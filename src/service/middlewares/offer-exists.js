'use strict';
const {HttpCode} = require(`../../constants`);

module.exports = (offerService) => (req, res, next) => {
  const {offerId} = req.params;

  const offer = offerService.findOne(offerId);
  if (!offer) {
    return res.status(HttpCode.NOT_FOUND).json(`Offer ${offerId} not found`);
  }
  res.locals.offer = offer;

  next();
  return null;
};
