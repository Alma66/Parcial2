// server/controllers/category.controller.js
import prisma from '../prismaClientProxy.js';

// Crear category (solo admin)
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) return res.status(400).json({ message: 'Category already exists' });

    const category = await prisma.category.create({ data: { name } });
    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener todas las categories (público)
export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener category por ID (público)
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({ where: { id: parseInt(id) } });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    console.error('Get category by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar category (solo admin)
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name }
    });
    res.json(category);
  } catch (error) {
    console.error('Update category error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Category not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Eliminar category (solo admin, verificar si tiene productos)
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await prisma.product.findMany({ where: { categoryId: parseInt(id) } });
    if (products.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category with associated products' });
    }

    await prisma.category.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Category deleted' });
  } catch (error) {
    console.error('Delete category error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Category not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};