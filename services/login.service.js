const Joi = require('joi');
const usersModel = require('../models/users.model');
const errorConstructor = require('../utils/errorHandling');
const authService = require('./auth.service');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLoginSchema = (email, password) => {
  const { error } = loginSchema.validate({ email, password });
  if (error) throw errorConstructor(401, 'Unauthorized', 'All fields must be filled');
};

const loginService = async (email, password) => {
  await validateLoginSchema(email, password);
  const user = await usersModel.getUserByEmail(email);
  if (!user || user.password !== password) {
    throw errorConstructor(401, 'Unauthorized', 'Incorrect username or password');
  }
  const { password: _password, ...userWithoutPassword } = user;

  const token = authService.genToken(userWithoutPassword);

  return { token };
};

module.exports = {
  loginService,
};
