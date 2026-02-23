import prisma from '../../prisma/prismaClient.js';

const updateOrder = async (id, data) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data,
    });
    return updatedOrder;
  } catch (error) {
    throw new Error(`Error updating order with ID ${id}: ${error.message}`);
  }
};

export default updateOrder;
