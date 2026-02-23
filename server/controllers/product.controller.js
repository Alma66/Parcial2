import prisma from '../prismaClientProxy.js';
import multer from 'multer';
const upload = multer({ dest: 'uploads/products/' });  
// Endpoint para subir imagen (solo admin)
export const uploadProductImage = [
  upload.single('image'),  // Campo 'image' en el form
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const imageUrl = `http://localhost:5000/uploads/products/${req.file.filename}`;
    res.json({ imageUrl });  
  }
];
// Crear product (solo admin)
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, imageUrl, stockQuantity, categoryId } = req.body;
    if (!name || !price || !categoryId) {
      return res.status(400).json({ message: 'Name, price, and categoryId are required' });
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category) return res.status(400).json({ message: 'Invalid categoryId' });

    const product = await prisma.product.create({
      data: { name, description, price: parseFloat(price), imageUrl, stockQuantity: parseInt(stockQuantity) || 0, categoryId }
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener todos los products (público)
export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({ include: { category: true } });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Obtener product por ID (público)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: { category: true }
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Get product by ID error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Actualizar product (solo admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, stockQuantity, categoryId } = req.body;
    const data = {};
    if (name) data.name = name;
    if (description !== undefined) data.description = description;
    if (price) data.price = parseFloat(price);
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (stockQuantity !== undefined) data.stockQuantity = parseInt(stockQuantity);
    if (categoryId) {
      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) return res.status(400).json({ message: 'Invalid categoryId' });
      data.categoryId = categoryId;
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
      include: { category: true }
    });
    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Product not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Eliminar product (solo admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Delete product error:', error);
    if (error.code === 'P2025') return res.status(404).json({ message: 'Product not found' });
    res.status(500).json({ message: 'Internal server error' });
  }
};