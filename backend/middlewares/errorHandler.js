const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // The stack trace is used to trace the active stack frames at a particular instance during the execution of a program. The stack trace is useful while debugging code(so no need of this in production mode) as it shows the exact point that has caused an error. Errors in Node.
  });
  next();
};

export { notFound, errorHandler };
