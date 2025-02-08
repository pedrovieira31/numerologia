const logger = require('../utils/logger');

const requestLogger = (req, res, next) => {
  logger.info('Incoming Request', {
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query
  });
  next();
};

module.exports = requestLogger;
