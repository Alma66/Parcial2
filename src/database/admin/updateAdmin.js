import prisma from '../../prisma/prismaClient.js';

const updateAdmin = async (id, data) => {
  try {
    const admin = await prisma.admin.update({
      where: { id },
      data,
    });
    return admin;
  } catch (error) {
    throw new Error(`Error updating admin with ID ${id}: ${error.message}`);
  }
};

export default updateAdmin;
