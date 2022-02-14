const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const {
  getAllTasksController,
  addTaskController,
} = require('../controllers/tasks.controller');

router.get('/', auth, getAllTasksController);
router.post('/', auth, addTaskController);

module.exports = router;
