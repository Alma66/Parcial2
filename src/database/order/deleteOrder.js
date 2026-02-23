import prisma from '../../prisma/prismaClient.js';

const deleteOrder = async (id) => {
  try {
    const order = await prisma.order.delete({
      where: { id },
    });
    return order;
  } catch (error) {
    throw new Error(`Error deleting order with ID ${id}: ${error.message}`);
  }
};

export default deleteOrder;
