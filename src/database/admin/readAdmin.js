import prisma from '../../prisma/prismaClient.js';

async function getAdminById(id) {
  try {
    const admin = await prisma.admin.findUnique({
      where: {
        id: id,
      },
    });
    return admin;
  } catch (error) {
    throw new Error('Error getting admin by ID: ' + error.message);
  }
}

async function getAdmins() {
  try {
    const admins = await prisma.admin.findMany();
    return admins;
  } catch (error) {
    throw new Error('Error getting admins: ' + error.message);
  }
}

export { getAdminById, getAdmins };
