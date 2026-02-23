// server/routes/category.routes.js
import { Router } from 'express';
import { requireAuth, isAdmin } from '../middleware/auth.middleware.js';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from '../controllers/category.controller.js';

const router = Router();

// Crear, actualizar, eliminar: admin
router.post('/', requireAuth, isAdmin, createCategory);
router.put('/:id', requireAuth, isAdmin, updateCategory);
router.delete('/:id', requireAuth, isAdmin, deleteCategory);

// Leer: público
router.get('/', getCategories);
router.get('/:id', getCategoryById);

export default router;