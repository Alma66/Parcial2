import prisma from '../../prisma/prismaClient.js';

// Función para obtener un producto por su ID o todos los productos
const readProduct = async (id = null) => {
  try {
    if (id) {
      // Si se pasa un id, buscamos un producto específico
      const product = await prisma.product.findUnique({
        where: {
          id: id,
        },
      });
      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado.`);
      }
      return product;
    } else {
      // Si no se pasa id, devuelve todos los productos
      const products = await prisma.product.findMany();
      return products;
    }
  } catch (error) {
    console.error(`Error al leer el producto con ID ${id}:`, error);
    throw new Error(`Error al leer el producto: ${error.message}`);
  }
};

export default readProduct;
