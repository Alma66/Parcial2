import prisma from '../../prisma/prismaClient.js';

const createProduct = async (data) => {
  try {
    const product = await prisma.product.create({
      data,
    });
    return product;
  } catch (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
};

export default createProduct;
