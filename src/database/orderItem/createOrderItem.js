import prisma from '../../prisma/prismaClient.js';

const createOrderItem = async (data) => {
  try {
    const orderItem = await prisma.orderItem.create({
      data,
    });
    return orderItem;
  } catch (error) {
    throw new Error(`Error creating order item: ${error.message}`);
  }
};

export default createOrderItem;
