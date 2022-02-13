const express = require('express');
const router = require('../routes');
const errorMiddleware = require('../middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use(router);

app.use(errorMiddleware);

module.exports = app;
