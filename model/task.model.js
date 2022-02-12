const conn = require('./connection');

const COLLECTION_NAME = 'tasks';

const getAllTasksModel = async () => {
  const tasks = await conn(COLLECTION_NAME).findAll({});
  return tasks;
};

const addTaskModel = async (task, status) => {
  const { insertedId } = await conn.collection(COLLECTION_NAME).insertOne({
    task,
    status,
  });
  return { id: insertedId };
};

const removeTaskModel = async (taskName) => {
  await conn.collection(COLLECTION_NAME).deleteOne({ where: { task: taskName } });
};

const updateTaskModel = async (task, status) => {
  await conn.collection(COLLECTION_NAME).updateOne(
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
