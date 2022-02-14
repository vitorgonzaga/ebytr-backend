const Joi = require('joi');
const { getAllTasksModel, addTaskModel } = require('../models/tasks.model');
const errorConstructor = require('../utils/errorHandling');

const taskSchema = Joi.object({
  task: Joi.string().required(),
  userId: Joi.string().required(),
});

const validateTaskSchema = (task, userId) => {
  const { error } = taskSchema.validate({ task, userId });
  if (error) throw errorConstructor(400, 'invalid data', 'Invalid entries. Try again.');
};

const getAllTasksService = async (userId) => {
  const tasks = await getAllTasksModel(userId);
  return tasks;
};

const addTaskService = async (task, status, userId) => {
  validateTaskSchema(task, userId);
  const { id } = await addTaskModel(task, status, userId);
  return {
    id, task, status, userId,
  };
};

module.exports = {
  getAllTasksService,
  addTaskService,
};
