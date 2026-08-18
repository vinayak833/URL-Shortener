// utils/apiResponse.js - standard JSON response formatter { success, data, message }
export function apiResponse(res, statusCode, success, data = null, message = '') {
  return res.status(statusCode).json({
    success,
    data,
    message
  });
}
