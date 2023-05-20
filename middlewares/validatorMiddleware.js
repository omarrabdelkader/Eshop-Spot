const { validationResult } = require("express-validator");
const validatorMiddleware = (req, res, next) => {
  // Checks if the param id is valid, if not
  // It heads into the next middleware (here) where it throws the error
  // Before it heads into the getCategory service
  // So, this middleware catches errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //   If there is no error, go to the next middleware (check the middleware pic)
  next();
};

module.exports = validatorMiddleware;
