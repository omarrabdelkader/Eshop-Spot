const globalError = (err, req, res, next) => {
  // err object has all the properties of the instance of the apiError class
  // As we have sent it to the Error Handling using the next() method
  // If it returns a statusCode, so the statusCode equals that returned statusCode
  // If nothing is returned, then it's a 500
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProduction();
  }
};

const sendErrorForDev = (err, res) => {
  return res.status(400).json({
    status: err.statusCode,
    message: err.message,
    error: err,
    // where did it happen exactly?
    stack: err.stack,
  });
};

const sendErrorForProduction = (err, res) => {
  return res.status(400).json({
    status: err.statusCode,
    message: err.message,
  });
};

module.exports = globalError;
