// routes/url.routes.js - /api/urls CRUD
import express from 'express';
import { createUrl, getUrls, deleteUrl } from '../controllers/url.controller.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/auth.middleware.js';
import { validateUrlRequest } from '../middleware/validate.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/', rateLimiter(50, 60000), optionalAuthMiddleware, validateUrlRequest, createUrl);
router.get('/', optionalAuthMiddleware, getUrls);
router.delete('/:id', authMiddleware, deleteUrl);

export default router;
