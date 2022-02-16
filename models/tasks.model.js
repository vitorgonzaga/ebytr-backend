const { ObjectId } = require('mongodb');
const connection = require('./connection');
require('dotenv').config();

const { COLLECTION_TASKS } = process.env;

const getAllTasksModel = async (userId) => {
  const conn = await connection();
  const tasks = await conn.collection(COLLECTION_TASKS).find(
    { userId: ObjectId(userId) },
  ).toArray();
  return tasks;
};

const addTaskModel = async (task, status, userId) => {
  const conn = await connection();
  const { insertedId } = await conn.collection(COLLECTION_TASKS).insertOne({
    task,
    status,
    userId: ObjectId(userId),
  });
  return { id: insertedId };
};

const removeTaskModel = async (taskId) => {
  const conn = await connection();
  await conn.collection(COLLECTION_TASKS).deleteOne({ _id: ObjectId(taskId) });
};

// salvar o _id no localStorage (sempre sobrescrevendo o último)
const getTaskIdByTask = async (task, userId) => {
  const conn = await connection();
  const { _id } = await conn.collection(COLLECTION_TASKS).findOne({
    $and: [
      { task },
      { userId: ObjectId(userId) },
    ],
  });
  return _id;
};

const updateTaskModel = async (taskId, task, status) => {
  const conn = await connection();
  await conn.collection(COLLECTION_TASKS).updateOne(
    { _id: ObjectId(taskId) },
    { $set: { task, status } },
  );
};

module.exports = {
  getAllTasksModel,
  addTaskModel,
  removeTaskModel,
  getTaskIdByTask,
  updateTaskModel,
};
