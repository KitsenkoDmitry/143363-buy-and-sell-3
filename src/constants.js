"use strict";

const USER_ARGV_INDEX = 2;
const DEFAULT_USER_COMAND = `--help`;
const DEFAULT_COUNT = 1;
const MAX_DESCRIPTION_LENGTH = 5;

const FILE_NAME = `mocks.json`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};
const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const PICTURE_NAME = `itemXX.jpg`;

const ExitCodes = {
  SUCCESS: 0,
  ERROR: 1,
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_USER_COMAND,
  DEFAULT_COUNT,
  MAX_DESCRIPTION_LENGTH,
  FILE_NAME,
  OfferType,
  SumRestrict,
  PictureRestrict,
  PICTURE_NAME,
  ExitCodes
};
