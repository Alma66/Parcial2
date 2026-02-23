import prisma from '../../prisma/prismaClient.js';

const deleteOrderItem = async (id) => {
  try {
    const orderItem = await prisma.orderItem.delete({
      where: { id },
    });
    return orderItem;
  } catch (error) {
    throw new Error(`Error deleting order item with ID ${id}: ${error.message}`);
  }
};

export default deleteOrderItem;
