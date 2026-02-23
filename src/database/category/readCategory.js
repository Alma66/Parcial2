import prisma from '../../prisma/prismaClient.js';

const getCategoryById = async (id) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true, // Incluir productos si es necesario
      },
    });
    if (!category) {
      throw new Error(`Category with ID ${id} not found.`);
    }
    return category;
  } catch (error) {
    throw new Error(`Error getting category by ID: ${error.message}`);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany();
    return categories;
  } catch (error) {
    throw new Error(`Error getting all categories: ${error.message}`);
  }
};

export { getCategoryById, getAllCategories };
