const loginService = require('../services/login.service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await loginService.loginService(email, password);
    return res.status(200).json(token);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = {
  login,
};
