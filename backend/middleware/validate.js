// middleware/validate.js - request validation middleware wrapper
import { apiResponse } from '../utils/apiResponse.js';

export function validateUrlRequest(req, res, next) {
  const { originalUrl } = req.body;
  if (!originalUrl || typeof originalUrl !== 'string') {
    return apiResponse(res, 400, false, null, 'originalUrl is required');
  }
  try {
    const parsed = new URL(originalUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return apiResponse(res, 400, false, null, 'URL must start with http:// or https://');
    }
  } catch {
    return apiResponse(res, 400, false, null, 'Invalid URL format');
  }
  next();
}
