import prisma from '../../prisma/prismaClient.js';

const updateCategory = async (id, data) => {
  try {
    const updatedCategory = await prisma.category.update({
      where: { id },
      data,
    });
    return updatedCategory;
  } catch (error) {
    throw new Error(`Error updating category with ID ${id}: ${error.message}`);
  }
};

export default updateCategory;
