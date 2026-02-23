// server/routes/cartItem.routes.js
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import {
  createCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem
} from '../controllers/cartItem.controller.js';

const router = Router();

// Todo protegido auth (usuario maneja su propio cart)
router.post('/', requireAuth, createCartItem);
router.get('/', requireAuth, getCartItems);
router.put('/:id', requireAuth, updateCartItem);
router.delete('/:id', requireAuth, deleteCartItem);

export default router;