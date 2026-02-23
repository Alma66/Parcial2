import prisma from '../../prisma/prismaClient.js';

const getOrderById = async (id) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: true, // Incluir los items de la orden
      },
    });
    if (!order) {
      throw new Error(`Order with ID ${id} not found.`);
    }
    return order;
  } catch (error) {
    throw new Error(`Error getting order by ID: ${error.message}`);
  }
};

const getOrdersByUserId = async (userId) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: true, // Incluir los items de la orden
      },
    });
    return orders;
  } catch (error) {
    throw new Error(`Error getting orders by user ID: ${error.message}`);
  }
};

export { getOrderById, getOrdersByUserId };
