// controllers/auth.controller.js - register & login business logic
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.model.js';
import { useMongo, getLocalData, saveLocalData } from '../config/db.js';
import { ENV } from '../config/env.js';
import { apiResponse } from '../utils/apiResponse.js';

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return apiResponse(res, 400, false, null, 'Please provide name, email, and password');
  }

  const cleanEmail = email.toLowerCase().trim();
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (useMongo) {
    const existing = await UserModel.findOne({ email: cleanEmail });
    if (existing) return apiResponse(res, 400, false, null, 'User already exists with this email');
    
    const user = await UserModel.create({ name, email: cleanEmail, password: hashedPassword });
    const token = jwt.sign({ userId: user._id.toString(), email: cleanEmail, name }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return apiResponse(res, 201, true, { token, user: { id: user._id, name, email: cleanEmail } }, 'User registered successfully');
  } else {
    const users = getLocalData('users');
    if (users.some(u => u.email === cleanEmail)) {
      return apiResponse(res, 400, false, null, 'User already exists with this email');
    }
    const newUser = { id: `usr_${Date.now()}`, name, email: cleanEmail, password: hashedPassword, createdAt: new Date().toISOString() };
    users.push(newUser);
    saveLocalData('users', users);
    const token = jwt.sign({ userId: newUser.id, email: cleanEmail, name }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return apiResponse(res, 201, true, { token, user: { id: newUser.id, name, email: cleanEmail } }, 'User registered successfully');
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return apiResponse(res, 400, false, null, 'Please provide email and password');
  }

  const cleanEmail = email.toLowerCase().trim();

  if (useMongo) {
    const user = await UserModel.findOne({ email: cleanEmail });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return apiResponse(res, 401, false, null, 'Invalid email or password');
    }
    const token = jwt.sign({ userId: user._id.toString(), email: cleanEmail, name: user.name }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return apiResponse(res, 200, true, { token, user: { id: user._id, name: user.name, email: cleanEmail } }, 'Logged in successfully');
  } else {
    const users = getLocalData('users');
    const user = users.find(u => u.email === cleanEmail);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return apiResponse(res, 401, false, null, 'Invalid email or password');
    }
    const token = jwt.sign({ userId: user.id, email: cleanEmail, name: user.name }, ENV.JWT_SECRET, { expiresIn: '7d' });
    return apiResponse(res, 200, true, { token, user: { id: user.id, name: user.name, email: cleanEmail } }, 'Logged in successfully');
  }
}
