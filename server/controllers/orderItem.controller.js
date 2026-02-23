// server/controllers/orderItem.controller.js
import prisma from '../prismaClientProxy.js';

// Crear orderItem (solo admin, generalmente no usado directamente)
export const createOrderItem = async (req, res) => {
  try {
    const { orderId, productId, quantity, price } = req.body;
    if (!orderId || !productId || !quantity || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const orderItem = await prisma.orderItem.create({
      data: { orderId, productId, quantity: parseInt(quantity), price: parseFloat(price) }
    });
    res.status(201).json(orderItem);
  } catch (error) {
    console.error('Create orderItem error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener orderItems (solo admin)
export const getOrderItems = async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany({ include: { product: true, order: true } });
    res.json(orderItems);
  } catch (error) {
    console.error('Get orderItems error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener orderItem por ID (solo admin)
export const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await prisma.orderItem.findUnique({
      where: { id: parseInt(id) },
      include: { product: true, order: true }
    });
    if (!orderItem) return res.status(404).json({ message: 'OrderItem not found' });
    res.json(orderItem);
  } catch (error) {
    console.error('Get orderItem by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar orderItem (solo admin)
export const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;
    const data = {};
    if (quantity) data.quantity = parseInt(quantity);
    if (price) data.price = parseFloat(price);

    const orderItem = await prisma.orderItem.update({
      where: { id: parseInt(id) },
      data,
      include: { product: true, order: true }
    });
    res.json(orderItem);
  } catch (error) {
    console.error('Update orderItem error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'OrderItem not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Eliminar orderItem (solo admin)
export const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.orderItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'OrderItem deleted' });
  } catch (error) {
    console.error('Delete orderItem error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'OrderItem not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};