import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';
import passport from 'passport';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import inventoryRoutes from './routes/inventory.js';
import supplierRoutes from './routes/suppliers.js';
import salesRoutes from './routes/sales.js';
import clientRoutes from './routes/clients.js';
import authRoutes from './routes/auth.js';
import './config/passport.js';

// Configuración de entorno
dotenv.config();

// Inicializa la aplicación de Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Configuración del motor de plantillas (Handlebars)
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Configuración del middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesión
app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Uso de rutas
app.use(authRoutes);
app.use(inventoryRoutes);
app.use(supplierRoutes);
app.use(salesRoutes);
app.use(clientRoutes);

// Ruta principal (dashboard)
app.get('/dashboard', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('dashboard');
});

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
