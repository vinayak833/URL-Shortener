// models/Url.model.js - originalUrl, shortCode, userId
import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true, index: true },
  title: { type: String, default: '' },
  userId: { type: String, default: null, index: true },
  clicks: { type: Number, default: 0 },
  lastClickedAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now }
});

export const UrlModel = mongoose.models.Url || mongoose.model('Url', urlSchema);
