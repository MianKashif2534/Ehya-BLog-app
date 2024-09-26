// // error handlers
// export const errorResponserHandler = (err, req, res, next) => {
//   const statusCode = err.statusCode || 400;
//   res.status(statusCode).json({
//     message: err.message,
//     stack: process.env.NODE_ENV === "production" ? null : err.stack,
//   });
// };

// export const invalidPathHandler = (req, res, next) => {
//     let error = new Error("Invalid path");
//     error.statusCode = 500;
//     next(error);
//   };



  // General error handler (for any errors thrown in the app)
export const errorResponserHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400; // Use statusCode if defined, otherwise 400
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Hide stack trace in production
  });
};

// Invalid path handler (for undefined routes)
export const invalidPathHandler = (req, res, next) => {
  const error = new Error(`Invalid path: ${req.originalUrl}`); // Include the requested URL
  error.statusCode = 404; // Set to 404 Not Found
  next(error); // Pass to general error handler
};
