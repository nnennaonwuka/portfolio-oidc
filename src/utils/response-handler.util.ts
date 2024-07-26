// Response handler to handle all web api responses
export const responseHandler = (
    res,
    message,
    statusCode,
    success = false,
    data?
  ) => {
    const response = {
      success,
      message,
      data }
  
    res.status(statusCode).json(response);
  };