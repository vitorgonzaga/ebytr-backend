const userService = require('../services/users.service');

const addUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userService.addUserService(email, password);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error.message);
    next(error); // chama o middleware de error
  }
};

module.exports = {
  addUserController,
};
