import prisma from '../../prisma/prismaClient.js';

const getOrderItemById = async (id) => {
  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id: id,
      },
    });
    if (!orderItem) {
      throw new Error(`Order item with ID ${id} not found.`);
    }
    return orderItem;
  } catch (error) {
    throw new Error(`Error getting order item by ID: ${error.message}`);
  }
};

const getOrderItemsByOrderId = async (orderId) => {
  try {
    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: orderId,
      },
    });
    return orderItems;
  } catch (error) {
    throw new Error(`Error getting order items by order ID: ${error.message}`);
  }
};

export { getOrderItemById, getOrderItemsByOrderId };
