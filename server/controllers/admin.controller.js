// server/controllers/admin.controller.js
import bcrypt from 'bcryptjs';
import prisma from '../prismaClientProxy.js';

// Crear admin (solo admin)
export const createAdmin = async (req, res) => {
  try {
    const { name, apellido, number, password } = req.body;
    if (!name || !apellido || !number || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { number } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this number already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const admin = await prisma.admin.create({
      data: { name, apellido, number, passwordHash },
      select: { id: true, name: true, apellido: true, number: true, createdAt: true }
    });

    res.status(201).json(admin);
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener todos los admins (solo admin)
export const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, name: true, apellido: true, number: true, createdAt: true }
    });
    res.json(admins);
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener admin por ID (solo admin)
export const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await prisma.admin.findUnique({
      where: { id: parseInt(id) },
      select: { id: true, name: true, apellido: true, number: true, createdAt: true }
    });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin);
  } catch (error) {
    console.error('Get admin by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar admin (solo admin)
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, apellido, number, password } = req.body;
    const data = {};
    if (name) data.name = name;
    if (apellido) data.apellido = apellido;
    if (number) data.number = number;
    if (password) data.passwordHash = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.update({
      where: { id: parseInt(id) },
      data,
      select: { id: true, name: true, apellido: true, number: true, createdAt: true }
    });
    res.json(admin);
  } catch (error) {
    console.error('Update admin error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Admin not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Eliminar admin (solo admin)
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.admin.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    console.error('Delete admin error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Admin not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};