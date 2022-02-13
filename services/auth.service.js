const jwt = require('jsonwebtoken');

const { API_SECRET } = process.env;

const JWT_CONFIG = {
  expiresIn: '5h', // número (segundos), string pode ser { '5h','7d'... }
  algorithm: 'HS256',
};

const genToken = (payload) => jwt.sign({ ...payload }, API_SECRET, JWT_CONFIG);

const verifyToken = (token) => {
  try {
    return jwt.verify(token, API_SECRET);
  } catch (error) {
    console.log('falha na autenticação');
    return null;
  }
};

module.exports = {
  genToken,
  verifyToken,
};
