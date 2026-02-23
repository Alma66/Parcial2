import prisma from '../../prisma/prismaClient.js';

const updateOrderItem = async (id, data) => {
  try {
    const updatedOrderItem = await prisma.orderItem.update({
      where: { id },
      data,
    });
    return updatedOrderItem;
  } catch (error) {
    throw new Error(`Error updating order item with ID ${id}: ${error.message}`);
  }
};

export default updateOrderItem;
