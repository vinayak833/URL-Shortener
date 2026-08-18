// config/db.js - mongoose.connect() + persistent fallback storage
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { ENV } from './env.js';

export let useMongo = false;

const DB_URLS_FILE = path.join(process.cwd(), '.data_urls.json');
const DB_USERS_FILE = path.join(process.cwd(), '.data_users.json');

const INITIAL_URLS_SEED = [];

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    useMongo = true;
    return;
  }
  const uri = ENV.MONGODB_URI?.trim();
  if (uri) {
    try {
      console.log(`Connecting to MongoDB (${uri.includes('localhost') || uri.includes('127.0.0.1') ? 'local' : 'remote'})...`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
      useMongo = true;
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.log('ℹ️ MongoDB connection timed out or failed. Using persistent JSON DB.');
      useMongo = false;
    }
  } else {
    console.log('ℹ️ MONGODB_URI not set. Using persistent file DB.');
    useMongo = false;
  }

  // Ensure JSON files exist if using fallback
  if (!useMongo) {
    if (!fs.existsSync(DB_URLS_FILE)) {
      fs.writeFileSync(DB_URLS_FILE, JSON.stringify(INITIAL_URLS_SEED, null, 2), 'utf-8');
    }
    if (!fs.existsSync(DB_USERS_FILE)) {
      fs.writeFileSync(DB_USERS_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  }
}

export function getLocalData(entity) {
  const filePath = entity === 'urls' ? DB_URLS_FILE : DB_USERS_FILE;
  try {
    if (!fs.existsSync(filePath)) return entity === 'urls' ? INITIAL_URLS_SEED : [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return entity === 'urls' ? INITIAL_URLS_SEED : [];
  }
}

export function saveLocalData(entity, data) {
  const filePath = entity === 'urls' ? DB_URLS_FILE : DB_USERS_FILE;
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error saving ${entity}:`, err);
  }
}
