// server/routes/orderItem.routes.js
import { Router } from 'express';
import { requireAuth, isAdmin } from '../middleware/auth.middleware.js';
import {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem
} from '../controllers/orderItem.controller.js';

const router = Router();

// Todo protegido admin
router.post('/', requireAuth, isAdmin, createOrderItem);
router.get('/', requireAuth, isAdmin, getOrderItems);
router.get('/:id', requireAuth, isAdmin, getOrderItemById);
router.put('/:id', requireAuth, isAdmin, updateOrderItem);
router.delete('/:id', requireAuth, isAdmin, deleteOrderItem);

export default router;