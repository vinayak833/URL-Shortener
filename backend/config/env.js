// config/env.js - dotenv configuration wrapper
import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'mern_super_secret_key_2026',
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_URL: process.env.APP_URL || ''
};