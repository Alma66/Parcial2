import prisma from '../../prisma/prismaClient.js';

const deleteCartItem = async (id) => {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: { id },
    });
    return cartItem;
  } catch (error) {
    throw new Error(`Error deleting cart item with ID ${id}: ${error.message}`);
  }
};

export default deleteCartItem;
