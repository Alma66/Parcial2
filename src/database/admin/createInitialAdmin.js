import bcrypt from 'bcrypt';
import prisma from '../../../prisma/prismaClient.js';  // Ruta correcta

const createInitialAdmin = async () => {
  try {
    // Datos del admin (ajustados a tu esquema: name, apellido, number, passwordHash)
    const adminData = {
      name: 'Admin',  // Nombre del admin
      apellido: 'Test',  // Apellido
      number: 112233,  // Número único (cambia por el que quieras, ej. un ID de admin)
      passwordHash: '',  // Lo hashearemos aquí
    };

    // Hashear la contraseña
    const plainPassword = 'admintest';  // Contraseña en texto plano
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    // Crear el admin con la contraseña hasheada
    const admin = await prisma.admin.create({
      data: {
        ...adminData,
        passwordHash: hashedPassword,  // Campo correcto en el esquema
      },
    });

    console.log('Admin creado exitosamente:', admin);
    return admin;
  } catch (error) {
    console.error('Error creando admin:', error.message);
    throw error;
  }
};

// Ejecutar el script si se llama directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  createInitialAdmin()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default createInitialAdmin;