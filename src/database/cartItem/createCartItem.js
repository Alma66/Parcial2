import prisma from '../../prisma/prismaClient.js';

const createCartItem = async (data) => {
  try {
    const cartItem = await prisma.cartItem.create({
      data,
    });
    return cartItem;
  } catch (error) {
    throw new Error(`Error creating cart item: ${error.message}`);
  }
};

export default createCartItem;
