const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error("Error:", {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
  });

  // Default error
  let error = {
    message: "Internal Server Error",
    status: 500,
  };

  // Handle specific error types
  if (err.name === "ValidationError") {
    error = {
      message: "Validation Error",
      status: 400,
      details: err.errors,
    };
  } else if (err.name === "SequelizeValidationError") {
    error = {
      message: "Database Validation Error",
      status: 400,
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    };
  } else if (err.name === "SequelizeUniqueConstraintError") {
    error = {
      message: "Duplicate Entry",
      status: 409,
      details: err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      })),
    };
  } else if (err.name === "JsonWebTokenError") {
    error = {
      message: "Invalid Token",
      status: 401,
    };
  } else if (err.name === "TokenExpiredError") {
    error = {
      message: "Token Expired",
      status: 401,
    };
  } else if (err.status) {
    // Handle custom errors with status codes
    error = {
      message: err.message || "Error",
      status: err.status,
    };
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === "production" && error.status === 500) {
    error.message = "Internal Server Error";
    delete error.details;
  }

  res.status(error.status).json({
    error: error.message,
    ...(error.details && { details: error.details }),
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
