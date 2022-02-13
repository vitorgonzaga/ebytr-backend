const express = require('express');
const userRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const tasksRouter = require('./tasksRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
