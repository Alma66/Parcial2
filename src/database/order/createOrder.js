import prisma from '../../prisma/prismaClient.js';

const createOrder = async (data) => {
  try {
    const order = await prisma.order.create({
      data,
    });
    return order;
  } catch (error) {
    throw new Error(`Error creating order: ${error.message}`);
  }
};

export default createOrder;
