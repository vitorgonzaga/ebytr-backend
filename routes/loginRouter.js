const express = require('express');
const { login } = require('../controllers/login.controller');

const router = express.Router();

router.post('/', login);

module.exports = router;
