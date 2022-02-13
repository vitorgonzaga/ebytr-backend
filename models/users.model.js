const connection = require('./connection');

const { COLLECTION_USERS } = process.env;

const addUser = async (email, password) => {
  const conn = await connection();
  const { insertedId } = await conn.collection(COLLECTION_USERS).insertOne({
    email,
    password,
  });
  return { id: insertedId };
};

const getUserByEmail = async (email) => {
  const conn = await connection();
  const user = await conn.collection(COLLECTION_USERS).findOne({ email });
  return user;
};

module.exports = {
  addUser,
  getUserByEmail,
};
