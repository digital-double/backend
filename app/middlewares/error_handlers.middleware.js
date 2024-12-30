require('dotenv').config

global.StatusError = class extends Error {
    constructor(message, status) {
      super(message);
      this.status = status;
    }
  };
  
  exports.noPathHandler = (_req, _res, next) =>
    next(new StatusError('Path', 404));
  
  exports.errorHandler = (err, _req, res, _next) => {
    let message, status;
  
    if (err instanceof StatusError) {
      message = err.message;
      status = err.status;
    } else if (process.env.ERR_VERBOSE === 'true') {
      return res.status(500).send({
        err: err.stack,
      });
    } else {
      message = 'Something went wrong';
      status = 500;
    }
  
    switch (status) {
      case 400:
        message = `Bad request: ${message}`;
        break;
  
      case 401:
        message = `Unauthorized: ${message}`;
        break;
  
      case 403:
        message = `Forbidden: ${message}`;
        break;
  
      case 404:
        message = `${message} not found`;
        break;
  
      case 409:
        message = `Conflict: ${message}`;
        break;
  
      case 422:
        message = `Unprocessable Entity: ${message}`;
        break;
  
      case 500:
        message = `Internal Server Error: ${message}`;
        break;
  
      default:
        break;
    }
  
    return res.status(status).send({
      error: { message },
    });
  };