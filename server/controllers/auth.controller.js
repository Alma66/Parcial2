// server/controllers/auth.controller.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from '../prismaClientProxy.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const ACCESS_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';

// Helpers para crear tokens
const createAccessToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
const createRefreshToken = (payload) => jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('🔍 Login attempt - Username:', username, 'Password length:', password ? password.length : 'null');
    if (!username || !password) {
      console.log('❌ Faltan username o password');
      return res.status(400).json({ message: 'username y password requeridos' });
    }

    let found = null;
    let role = 'user';
    if (!Number.isNaN(Number(username))) {
      console.log('🔍 Buscando admin por number:', username);
      found = await prisma.admin.findUnique({ where: { number: Number(username) } });
      if (found) {
        console.log('✅ Admin encontrado:', { id: found.id, name: found.name, number: found.number });
        role = 'admin';
      } else {
        console.log('❌ Admin NO encontrado para number:', username);
      }
    }

    if (!found) {
      console.log('🔍 Buscando user por email:', username);
      found = await prisma.user.findUnique({ where: { email: String(username) } });
      if (!found) {
        console.log('❌ User NO encontrado para email:', username);
        return res.status(401).json({ message: 'Credenciales inválidas' });
      } else {
        console.log('✅ User encontrado:', { id: found.id, name: found.name, email: found.email });
      }
    }

    console.log('🔐 Comparando password...');
    console.log('Hash en BD:', found.passwordHash ? 'Presente' : 'Ausente');
    const passwordMatch = await bcrypt.compare(password, found.passwordHash);
    console.log('Resultado bcrypt.compare:', passwordMatch);
    if (!passwordMatch) {
      console.log('❌ Password NO coincide');
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    console.log('✅ Password correcta, generando token...');

    const payload = { id: found.id, name: found.name, role };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken({ id: found.id, role });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    console.log('✅ Login exitoso para:', role, found.name);
    return res.json({ accessToken });
  } catch (error) {
    console.error('💥 Login error:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

// REFRESH (sin cambios)
export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    let data;
    try {
      data = jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Refresh token inválido' });
    }

    const payload = { id: data.id, role: data.role };
    const accessToken = createAccessToken(payload);
    return res.json({ accessToken });
  } catch (error) {
    console.error('Refresh error:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

// LOGOUT (sin cambios)
export const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken', { httpOnly: true, sameSite: 'lax' });
    return res.json({ ok: true });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

// REGISTER (sin cambios)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'Campos faltantes' });

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(400).json({ message: 'Usuario ya existe' });

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hash }
    });

    const payload = { id: user.id, role: 'user', name: user.name };
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken({ id: user.id, role: 'user' });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.json({ accessToken });
  } catch (err) {
    console.error('Register error', err);
    return res.status(500).json({ message: 'Error interno' });
  }
};