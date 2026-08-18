// models/Click.model.js - analytics per visit
import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  shortCode: { type: String, required: true, index: true },
  timestamp: { type: Date, default: Date.now },
  userAgent: { type: String, default: '' },
  referrer: { type: String, default: '' },
  ip: { type: String, default: '' }
});

export const ClickModel = mongoose.models.Click || mongoose.model('Click', clickSchema);
