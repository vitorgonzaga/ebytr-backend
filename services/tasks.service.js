const Joi = require('joi');
const {
  getAllTasksModel,
  addTaskModel,
  updateTaskModel,
  getTaskIdByTask,
  removeTaskModel,
} = require('../models/tasks.model');
const errorConstructor = require('../utils/errorHandling');

const taskSchema = Joi.object({
  task: Joi.string().required(),
  status: Joi.string().invalid(['pendente', 'em andamento', 'pronto']).required(),
});

const validateTaskSchema = (task, status) => {
  const { error } = taskSchema.validate({ task, status });
  if (error) throw errorConstructor(400, 'invalid data', 'Invalid entries. Try again.');
};

const getAllTasksService = async (userId) => {
  const tasks = await getAllTasksModel(userId);
  return tasks;
};

const addTaskService = async (task, status, userId) => {
  validateTaskSchema(task, status);
  const { id } = await addTaskModel(task, status, userId);
  return {
    id, task, status, userId,
  };
};

const getTaskIdService = async (task, userId) => {
  const id = await getTaskIdByTask(task, userId);
  return id;
};

const updateTaskService = async (taskId, task, status) => {
  validateTaskSchema(task, status);
  await updateTaskModel(taskId, task, status);
};

const removeTaskService = async (taskId) => {
  await removeTaskModel(taskId);
};

module.exports = {
  getAllTasksService,
  addTaskService,
  getTaskIdService,
  updateTaskService,
  removeTaskService,
};
