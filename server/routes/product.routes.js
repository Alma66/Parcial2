// server/routes/product.routes.js
import { Router } from 'express';
import { requireAuth, isAdmin } from '../middleware/auth.middleware.js';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage
} from '../controllers/product.controller.js';

const router = Router();

// Crear, actualizar, eliminar: admin
router.post('/', requireAuth, isAdmin, createProduct);
router.put('/:id', requireAuth, isAdmin, updateProduct);
router.delete('/:id', requireAuth, isAdmin, deleteProduct);

// Leer: público
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/upload-image', requireAuth, isAdmin, uploadProductImage);
export default router;