import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient.js';

const getUserByEmail = async (email) => {
  try {
    // Busca al usuario por su email
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user ? user : null;  // Retorna el usuario si existe, de lo contrario, null
  } catch (error) {
    throw new Error(`Error getting user by email: ${error.message}`);
  }
};

const validateUser = async (email, contrasena) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar las contraseñas
  const isPasswordValid = await bcrypt.compare(contrasena, user.contrasena);
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta');
  }

  return user;  // Si las contraseñas coinciden, devolvemos el usuario
};

export { validateUser, getUserByEmail };
