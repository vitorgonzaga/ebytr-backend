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

const removeTaskModel = async (taskName) => {
  const conn = await connection();
  await conn.collection(COLLECTION_TASKS).deleteOne({ where: { task: taskName } });
};

const updateTaskModel = async (task, status) => {
  const conn = await connection();
  await conn.collection(COLLECTION_TASKS).updateOne(
    { task },
    { $set: { task, status } },
  );
};

module.exports = {
  getAllTasksModel,
  addTaskModel,
  removeTaskModel,
  updateTaskModel,
};

/*
body = {
  task: "string",
  status: "string"
}
*/
