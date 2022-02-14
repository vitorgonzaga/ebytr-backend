const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
// const checkifHasTaskId = require('../middlewares/checkTaskId.middleware');
const {
  getAllTasksController,
  addTaskController,
  updateTaskController,
  getTaskIdController,
} = require('../controllers/tasks.controller');

router.get('/', auth, getAllTasksController);
router.get('/taskid', auth, getTaskIdController);
router.post('/', auth, addTaskController);
router.put('/', auth, updateTaskController);

module.exports = router;
