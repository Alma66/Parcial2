import prisma from '../../prisma/prismaClient.js';

// Función para eliminar un producto por su ID
const deleteProduct = async (id) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return deletedProduct; // Devuelve el producto eliminado
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw new Error(`Error al eliminar el producto con ID ${id}: ${error.message}`);
  }
};

export default deleteProduct;
