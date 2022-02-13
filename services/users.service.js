const Joi = require('joi');
const usersModel = require('../models/users.model');
const errorConstructor = require('../utils/errorHandling');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const checkIfEmailExists = async (email) => {
  const user = await usersModel.getUserByEmail(email);
  if (user) return true;
  return false;
};

const validateUserSchema = (email, password) => {
  const { error } = userSchema.validate({ email, password });
  if (error) throw errorConstructor(400, 'invalid data', 'Invalid entries. Try again.');
};

const addUserService = async (email, password) => {
  validateUserSchema(email, password);
  const blnEmailExists = await checkIfEmailExists(email);
  if (blnEmailExists) throw errorConstructor(409, 'conflict', 'Email already registered');
  const { id } = await usersModel.addUser(email, password);
  return {
    user: {
      email,
      id,
    },
  };
};

module.exports = {
  addUserService,
  checkIfEmailExists,
};
