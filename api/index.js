import app from '../backend/app.js';
import { connectDB } from '../backend/config/db.js';

export default async function handler(req, res) {
  // Ensure DB connection is established before serving requests
  await connectDB();

  // Route request to the Express application
  return app(req, res);
}
