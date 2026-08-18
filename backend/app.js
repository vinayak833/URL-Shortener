// app.js - express(), cors, routes
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import urlRoutes from './routes/url.routes.js';
import redirectRoutes from './routes/redirect.routes.js';
import { getUrlStats } from './controllers/stats.controller.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/urls', urlRoutes);
app.get('/api/stats/:code', getUrlStats);

// Short code redirection route
app.use('/', redirectRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;
