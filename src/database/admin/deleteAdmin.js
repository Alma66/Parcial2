import prisma from '../../prisma/prismaClient.js';

const deleteAdmin = async (id) => {
  try {
    const admin = await prisma.admin.delete({
      where: { id },
    });
    return admin;
  } catch (error) {
    throw new Error(`Error deleting admin with ID ${id}: ${error.message}`);
  }
};

export default deleteAdmin;
