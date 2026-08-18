// middleware/rateLimiter.js - simple in-memory rate limiter
const ipRequests = new Map();

export function rateLimiter(maxRequests = 100, windowMs = 60000) {
  return (req, res, next) => {
    const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    
    let record = ipRequests.get(ip);
    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + windowMs };
    } else {
      record.count += 1;
    }
    
    ipRequests.set(ip, record);
    
    if (record.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }
    next();
  };
}
