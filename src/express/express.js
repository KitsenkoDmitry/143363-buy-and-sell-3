'use strict';

const express = require(`express`);
const {green} = require(`chalk`);
const mainRouter = require(`./routes/main`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);

const app = express();
app.use(`/offers`, offersRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

const PORT = 8080;
app.listen(PORT, () => console.info(green(`Front sever listening on port ${PORT}: http://localhost:${PORT}`)));
