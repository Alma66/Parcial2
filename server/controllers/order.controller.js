// server/controllers/order.controller.js
import prisma from '../prismaClientProxy.js';

// Crear order (usuario autenticado, desde cart)
export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });
    if (cartItems.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    let totalAmount = 0;
    const orderItems = cartItems.map(item => {
      totalAmount += item.product.price * item.quantity;
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price
      };
    });

    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        orderItems: { create: orderItems }
      },
      include: { orderItems: { include: { product: true } } }
    });

    // Limpiar cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener orders del usuario (usuario autenticado)
export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { orderItems: { include: { product: true } } }
    });
    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener order por ID (usuario autenticado, solo propia)
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const order = await prisma.order.findFirst({
      where: { id: parseInt(id), userId },
      include: { orderItems: { include: { product: true } } }
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar order (solo admin, ej. cambiar status)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const data = {};
    if (status) data.status = status;

    const order = await prisma.order.update({
      where: { id: parseInt(id) },
      data,
      include: { orderItems: { include: { product: true } } }
    });
    res.json(order);
  } catch (error) {
    console.error('Update order error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Order not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Eliminar order (solo admin)
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.order.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Order deleted' });
  } catch (error) {
    console.error('Delete order error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Order not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};