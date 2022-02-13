// { statusCode, shortDescription, message }
module.exports = (err, _req, res, _next) => {
  console.log('err', err);
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      err: {
        code: err.shortDescription,
        message: err.message,
      },
    });
  }
  // console.log(err);
  return res.status(500).json({ status: 500, message: 'Internal Server Error' });
};
