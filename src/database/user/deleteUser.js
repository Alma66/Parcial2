import prisma from '../../prisma/prismaClient.js';

const deleteUser = async (id) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    });
    return deletedUser;  // Devuelve el usuario eliminado
  } catch (error) {
    throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
  }
};

export default deleteUser;
