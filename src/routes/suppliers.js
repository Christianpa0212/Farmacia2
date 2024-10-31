import { Router } from 'express';
import Supplier from '../models/Supplier.js';

const router = Router();

// Ruta para listar todos los proveedores
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.render('suppliers/list', { suppliers });
  } catch (err) {
    console.error('Error al obtener los proveedores:', err);
    res.redirect('/');
  }
});

// Ruta para mostrar el formulario de creación de proveedor
router.get('/suppliers/add', (req, res) => {
  res.render('suppliers/add');
});

// Ruta para crear un nuevo proveedor
router.post('/suppliers/add', async (req, res) => {
  const { name, contact, address, email, phone } = req.body;
  try {
    const newSupplier = new Supplier({ name, contact, address, email, phone });
    await newSupplier.save();
    res.redirect('/suppliers');
  } catch (err) {
    console.error('Error al crear el proveedor:', err);
    res.redirect('/suppliers/add');
  }
});

// Ruta para mostrar el formulario de edición de proveedor
router.get('/suppliers/edit/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    res.render('suppliers/edit', { supplier });
  } catch (err) {
    console.error('Error al obtener el proveedor:', err);
    res.redirect('/suppliers');
  }
});

// Ruta para actualizar un proveedor
router.post('/suppliers/edit/:id', async (req, res) => {
  const { name, contact, address, email, phone } = req.body;
  try {
    await Supplier.findByIdAndUpdate(req.params.id, { name, contact, address, email, phone });
    res.redirect('/suppliers');
  } catch (err) {
    console.error('Error al actualizar el proveedor:', err);
    res.redirect('/suppliers');
  }
});

// Ruta para eliminar un proveedor
router.get('/suppliers/delete/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.redirect('/suppliers');
  } catch (err) {
    console.error('Error al eliminar el proveedor:', err);
    res.redirect('/suppliers');
  }
});

export default router;
