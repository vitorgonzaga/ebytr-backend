const { ObjectId } = require('mongodb');

module.exports = async (req, res, next) => {
  try {
    const { taskid } = req.headers;
    if (!taskid) return res.status(401).json({ message: 'missing task id' });
    if (!ObjectId.isValid(taskid)) return res.status(401).json({ message: 'task id is not a valid ObjectId' });
    req.taskId = taskid;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ message: 'task id malformed' });
  }
};
