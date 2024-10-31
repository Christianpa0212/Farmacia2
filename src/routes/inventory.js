import { Router } from 'express';
import Inventory from '../models/Inventory.js';

const router = Router();

// Ruta para listar todos los productos
router.get('/inventory', async (req, res) => {
  try {
    const products = await Inventory.find();
    res.render('inventory/list', { products });
  } catch (err) {
    console.error('Error al obtener los productos:', err);
    res.redirect('/');
  }
});

// Ruta para mostrar el formulario de creación de producto
router.get('/inventory/add', (req, res) => {
  res.render('inventory/add');
});

// Ruta para crear un nuevo producto
router.post('/inventory/add', async (req, res) => {
  const { name, description, quantity, price } = req.body;
  try {
    const newProduct = new Inventory({ name, description, quantity, price });
    await newProduct.save();
    res.redirect('/inventory');
  } catch (err) {
    console.error('Error al crear el producto:', err);
    res.redirect('/inventory/add');
  }
});

// Ruta para mostrar el formulario de edición de producto
router.get('/inventory/edit/:id', async (req, res) => {
  try {
    const product = await Inventory.findById(req.params.id);
    res.render('inventory/edit', { product });
  } catch (err) {
    console.error('Error al obtener el producto:', err);
    res.redirect('/inventory');
  }
});

// Ruta para actualizar un producto
router.post('/inventory/edit/:id', async (req, res) => {
  const { name, description, quantity, price } = req.body;
  try {
    await Inventory.findByIdAndUpdate(req.params.id, { name, description, quantity, price });
    res.redirect('/inventory');
  } catch (err) {
    console.error('Error al actualizar el producto:', err);
    res.redirect('/inventory');
  }
});

// Ruta para eliminar un producto
router.get('/inventory/delete/:id', async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.redirect('/inventory');
  } catch (err) {
    console.error('Error al eliminar el producto:', err);
    res.redirect('/inventory');
  }
});

export default router;
