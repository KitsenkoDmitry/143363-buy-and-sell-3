'use strict';

const {Router} = require(`express`);
const {getAPI} = require(`../api`);
const multer = require(`multer`);
const {nanoid} = require(`nanoid`);
const path = require(`path`);
const {ensureArray} = require(`../../utils`);

const {UPLOAD_DIR} = require(`../../constants`);
const UPLOAD_DIR_IMG = `../${UPLOAD_DIR}/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR_IMG);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});


const offersRouter = new Router();
const api = getAPI();

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));

offersRouter.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  return res.render(`tickets/new-ticket`, {categories});
});

offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;

  const offerData = {
    picture: file.filename,
    title: body[`ticket-name`],
    category: ensureArray(body.category),
    description: body.comment,
    type: body.action,
    sum: body.price,
  };

  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (e) {
    res.redirect(`back`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  const {id} = req.params;
  const [offer, categories] = await Promise.all([api.getOffer(id), api.getCategories()]);
  return res.render(`tickets/ticket-edit`, {offer, categories});
});

offersRouter.get(`/:id`, (req, res) => res.render(`tickets/ticket`));

module.exports = offersRouter;
