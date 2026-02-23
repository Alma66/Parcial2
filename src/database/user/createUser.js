import bcrypt from 'bcrypt'; // Para cifrar la contraseña
import prisma from '../../prisma/prismaClient.js';

const createUser = async (data) => {
  try {
    // Cifrar la contraseña antes de guardarla
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }

    // Crear el usuario en la base de datos
    const newUser = await prisma.user.create({
      data,
    });
    return newUser;  // Devuelve el usuario creado
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

export default createUser;
