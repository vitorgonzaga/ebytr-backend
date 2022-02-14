const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
// const checkifHasTaskId = require('../middlewares/checkTaskId.middleware');
const {
  getAllTasksController,
  addTaskController,
  updateTaskController,
  getTaskIdController,
  removeTaskController,
} = require('../controllers/tasks.controller');

router.get('/', auth, getAllTasksController);
router.post('/', auth, addTaskController);
router.get('/taskid', auth, getTaskIdController);
router.put('/:taskid', auth, updateTaskController);
router.delete('/:taskid', auth, removeTaskController);

module.exports = router;
