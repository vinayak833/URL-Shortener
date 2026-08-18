// routes/redirect.routes.js - GET /:code redirect handler
import express from 'express';
import { handleRedirect } from '../controllers/redirect.controller.js';

const router = express.Router();

router.get('/:code', handleRedirect);

export default router;
