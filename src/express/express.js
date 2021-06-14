'use strict';

const express = require(`express`);
const path = require(`path`);
const {green} = require(`chalk`);
const {PUBLIC_DIR} = require(`./../constants`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const app = express();
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));
app.set(`views`, path.resolve(__dirname, `./templates`));
app.set(`view engine`, `pug`);

app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

const PORT = 8080;
app.listen(PORT, () => console.info(green(`Front sever listening on port ${PORT}: http://localhost:${PORT}`)));
