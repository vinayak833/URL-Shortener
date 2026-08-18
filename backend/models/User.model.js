// models/User.model.js - name, email, password
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
