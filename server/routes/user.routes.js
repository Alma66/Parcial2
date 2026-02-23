// server/routes/user.routes.js
import { Router } from 'express';
import { requireAuth, isAdmin } from '../middleware/auth.middleware.js';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js';

const router = Router();

// Registro público
router.post('/', createUser);

// Resto protegido admin
router.get('/', requireAuth, isAdmin, getUsers);
router.get('/:id', requireAuth, isAdmin, getUserById);
router.put('/:id', requireAuth, isAdmin, updateUser);
router.delete('/:id', requireAuth, isAdmin, deleteUser);

export default router;