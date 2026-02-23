// server/routes/admin.routes.js
import { Router } from 'express';
import { requireAuth, isAdmin } from '../middleware/auth.middleware.js';
import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} from '../controllers/admin.controller.js';

const router = Router();

// Todo protegido admin
router.post('/', requireAuth, isAdmin, createAdmin);
router.get('/', requireAuth, isAdmin, getAdmins);
router.get('/:id', requireAuth, isAdmin, getAdminById);
router.put('/:id', requireAuth, isAdmin, updateAdmin);
router.delete('/:id', requireAuth, isAdmin, deleteAdmin);

export default router;