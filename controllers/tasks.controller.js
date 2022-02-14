const {
  getAllTasksService,
  addTaskService,
} = require('../services/tasks.service');

const getAllTasksController = async (req, res, next) => {
  try {
    const { userId } = req;
    const tasks = await getAllTasksService(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const addTaskController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { task } = req.body; // the insert operation always has status 'open'
    const taskInserted = await addTaskService(task, 'pendente', userId);
    return res.status(200).json(taskInserted);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

/*
body = {
  task: "string",
  status: "string"
}
*/

module.exports = {
  getAllTasksController,
  addTaskController,
};
