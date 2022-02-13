const router = require('express').Router();
const { addUserController } = require('../controllers/users.controller');

router.post('/', addUserController);

module.exports = router;
