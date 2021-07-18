"use strict";

const USER_ARGV_INDEX = 2;
const DEFAULT_USER_COMAND = `--help`;
const DEFAULT_COUNT = 1;
const MAX_DESCRIPTION_LENGTH = 5;
const DEFAULT_PORT = 3000;
const PUBLIC_DIR = `public`;
const UPLOAD_DIR = `upload`;
const TIMEOUT = 1000;
const MAX_ID_LENGTH = 5;
const MAX_COMMENTS = 3;
const API_PREFIX = `/api`;

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

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

module.exports = {
  API_PREFIX,
  USER_ARGV_INDEX,
  PUBLIC_DIR,
  UPLOAD_DIR,
  TIMEOUT,
  DEFAULT_USER_COMAND,
  DEFAULT_COUNT,
  DEFAULT_PORT,
  MAX_DESCRIPTION_LENGTH,
  MAX_ID_LENGTH,
  MAX_COMMENTS,
  FILE_NAME,
  OfferType,
  SumRestrict,
  PictureRestrict,
  PICTURE_NAME,
  ExitCodes,
  HttpCode,
  Env
};
