import prisma from '../../prisma/prismaClient.js';

const createCategory = async (data) => {
  try {
    const category = await prisma.category.create({
      data,
    });
    return category;
  } catch (error) {
    throw new Error(`Error creating category: ${error.message}`);
  }
};

export default createCategory;
