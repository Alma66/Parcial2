// server/controllers/cartItem.controller.js
import prisma from '../prismaClientProxy.js';

// Crear cartItem (usuario autenticado, solo para sí mismo)
export const createCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    if (!productId || !quantity) {
      return res.status(400).json({ message: 'ProductId and quantity are required' });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return res.status(400).json({ message: 'Invalid productId' });

    const existing = await prisma.cartItem.findFirst({ where: { userId, productId } });
    if (existing) {
      // Actualizar cantidad
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + parseInt(quantity) }
      });
      return res.json(updated);
    }

    const cartItem = await prisma.cartItem.create({
      data: { userId, productId, quantity: parseInt(quantity) }
    });
    res.status(201).json(cartItem);
  } catch (error) {
    console.error('Create cartItem error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener cartItems del usuario (usuario autenticado)
export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true }
    });
    res.json(cartItems);
  } catch (error) {
    console.error('Get cartItems error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar cartItem (usuario autenticado, solo propio)
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    const cartItem = await prisma.cartItem.findFirst({ where: { id: parseInt(id), userId } });
    if (!cartItem) return res.status(404).json({ message: 'CartItem not found or not owned' });

    const updated = await prisma.cartItem.update({
      where: { id: parseInt(id) },
      data: { quantity: parseInt(quantity) }
    });
    res.json(updated);
  } catch (error) {
    console.error('Update cartItem error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Eliminar cartItem (usuario autenticado, solo propio)
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const cartItem = await prisma.cartItem.findFirst({ where: { id: parseInt(id), userId } });
    if (!cartItem) return res.status(404).json({ message: 'CartItem not found or not owned' });

    await prisma.cartItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'CartItem deleted' });
  } catch (error) {
    console.error('Delete cartItem error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};