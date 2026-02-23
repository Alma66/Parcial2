// server/routes/order.routes.js
import { Router } from 'express';
import { requireAuth, isAdmin } from '../middleware/auth.middleware.js';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
} from '../controllers/order.controller.js';

const router = Router();

// Crear order: usuario autenticado
router.post('/', requireAuth, createOrder);

// Obtener orders: usuario autenticado (solo propias)
router.get('/', requireAuth, getOrders);
router.get('/:id', requireAuth, getOrderById);

// Actualizar/eliminar: admin
router.put('/:id', requireAuth, isAdmin, updateOrder);
router.delete('/:id', requireAuth, isAdmin, deleteOrder);

export default router;