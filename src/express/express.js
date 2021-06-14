'use strict';

const express = require(`express`);
const {green} = require(`chalk`);
const baseRouter = require(`./routes/base`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const offersRouter = require(`./routes/offers`);
const registerRouter = require(`./routes/register`);
const searchRouter = require(`./routes/search`);

const app = express();
app.use(`/`, baseRouter);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/offers`, offersRouter);
app.use(`/register`, registerRouter);
app.use(`/search`, searchRouter);

const PORT = 8080;
app.listen(PORT, () => console.info(green(`Front sever listening on port ${PORT}: http://localhost:${PORT}`)));
