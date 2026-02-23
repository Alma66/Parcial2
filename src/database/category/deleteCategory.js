import prisma from '../../prisma/prismaClient.js';

const deleteCategory = async (id) => {
  try {
    const category = await prisma.category.delete({
      where: { id },
    });
    return category;
  } catch (error) {
    throw new Error(`Error deleting category with ID ${id}: ${error.message}`);
  }
};

export default deleteCategory;
