// server/routes/auth.routes.js
import { Router } from 'express';
import { login, refreshToken, logout, register } from '../controllers/auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.post('/register', register); // opcional

export default router;
