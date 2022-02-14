const {
  getAllTasksService,
  addTaskService,
  getTaskIdService,
  updateTaskService,
  removeTaskService,
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

// Quando o usuário clicar em "editar"
// 1. app faz uma requisição to tipo get para obter o id da task no db
// 2. salva isso no localstorage
// 3. depois utiliza o id salvo para montar o body da requisição do tipo PUT
// 4. a rota para realizar o GET do taskId será

const getTaskIdController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { task } = req.body;
    const taskId = await getTaskIdService(task, userId);
    return res.status(200).json({ id: taskId });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const updateTaskController = async (req, res, next) => {
  try {
    // const { userId } = req;
    const { taskid } = req.params;
    const { task, status } = req.body;
    const taskUpdated = await updateTaskService(taskid, task, status); // Não enviar o userId
    return res.status(200).json(taskUpdated);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const removeTaskController = async (req, res, next) => {
  try {
    const { taskid } = req.params;
    const deletedTask = await removeTaskService(taskid);
    return res.status(200).json(deletedTask);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  getAllTasksController,
  addTaskController,
  getTaskIdController,
  updateTaskController,
  removeTaskController,
};
