// middleware/errorHandler.js - global Express error handler
import { apiResponse } from '../utils/apiResponse.js';

export function errorHandler(err, req, res, next) {
  console.error('Unhandled Server Error:', err);
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return apiResponse(res, status, false, null, message);
}
