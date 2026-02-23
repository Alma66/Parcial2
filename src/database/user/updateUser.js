import bcrypt from 'bcrypt';  // Para cifrar la nueva contraseña
import prisma from '../../../prisma/prismaClient.js.js';

const updateUser = async (id, data) => {
  try {
    // Si se proporciona una nueva contraseña, cifrarla
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;  // Devuelve el usuario actualizado
  } catch (error) {
    throw new Error(`Error updating user with ID ${id}: ${error.message}`);
  }
};

export default updateUser;
