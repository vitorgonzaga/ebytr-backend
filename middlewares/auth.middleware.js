const authService = require('../services/auth.service');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    const payloadFromJwt = await authService.verifyToken(authorization);
    if (!payloadFromJwt) return res.status(401).json({ message: 'jwt malformed' });
    const { _id, email } = payloadFromJwt;
    req.userId = _id;
    req.userEmail = email;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
