import prisma from '../../prisma/prismaClient.js';

// Función para actualizar un producto por su ID
const updateProduct = async (id, data) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: id,
      },
      data: data, // Aquí se pasan los datos actualizados del producto
    });
    return updatedProduct;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw new Error(`Error al actualizar el producto con ID ${id}: ${error.message}`);
  }
};

export default updateProduct;
