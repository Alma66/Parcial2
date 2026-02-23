// server/index.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';  // Solo una vez aquí
import { fileURLToPath } from 'url';

// Importar rutas
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import categoryRoutes from './routes/category.routes.js';
import productRoutes from './routes/product.routes.js';
import cartItemRoutes from './routes/cartItem.routes.js';
import orderRoutes from './routes/order.routes.js';
import orderItemRoutes from './routes/orderItem.routes.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// CORS: permitir frontend y credenciales
app.use(cors({
  origin: 'http://localhost:3000', // ajustá si tu frontend usa otro origen
  credentials: true
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/order-items', orderItemRoutes);

// Servir imágenes desde uploads/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Auth server listening on port ${PORT}`);
});