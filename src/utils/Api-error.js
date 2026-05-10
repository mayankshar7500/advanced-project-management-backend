class ApiError extends Error {
  constructor(statusCode, data, message = "Something went wrong") {
    super(message);

    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
