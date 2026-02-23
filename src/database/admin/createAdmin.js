import prisma from '../../../prisma/prismaClient.js.js';

const createAdmin = async (data) => {
  try {
    const admin = await prisma.admin.create({
      data,
    });
    return admin;
  } catch (error) {
    throw new Error(`Error creating admin: ${error.message}`);
  }
};

export default createAdmin;
