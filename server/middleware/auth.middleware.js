// server/middleware/auth.middleware.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../prismaClientProxy.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const requireAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: 'No auth header' });

    const token = auth.split(' ')[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Nuevo: middleware para verificar rol admin
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin role required' });
  }
  next();
};