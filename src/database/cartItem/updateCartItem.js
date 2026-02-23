import prisma from '../../prisma/prismaClient.js';

const updateCartItem = async (id, data) => {
  try {
    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data,
    });
    return updatedCartItem;
  } catch (error) {
    throw new Error(`Error updating cart item with ID ${id}: ${error.message}`);
  }
};

export default updateCartItem;
