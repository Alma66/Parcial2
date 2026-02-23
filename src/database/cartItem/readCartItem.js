import prisma from '../../prisma/prismaClient.js';

const getCartItemById = async (id) => {
  try {
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: {
        Product: true,  // Incluir producto si es necesario
        User: true,     // Incluir usuario si es necesario
      },
    });
    return cartItem;
  } catch (error) {
    throw new Error(`Error getting cart item by ID: ${error.message}`);
  }
};

const getCartItemsByUserId = async (userId) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        Product: true,  // Incluir productos si es necesario
      },
    });
    return cartItems;
  } catch (error) {
    throw new Error(`Error getting cart items by user ID: ${error.message}`);
  }
};

export { getCartItemById, getCartItemsByUserId };
