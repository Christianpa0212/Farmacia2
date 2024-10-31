import { Router } from 'express';
import Sale from '../models/Sale.js';

const router = Router();

// Ruta para listar todas las ventas
router.get('/sales', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.render('sales/list', { sales });
  } catch (err) {
    console.error('Error al obtener las ventas:', err);
    res.redirect('/');
  }
});

// Ruta para mostrar el formulario de creación de venta
router.get('/sales/add', (req, res) => {
  res.render('sales/add');
});

// Ruta para crear una nueva venta
router.post('/sales/add', async (req, res) => {
  const { product, quantity, total, customerName } = req.body;
  try {
    const newSale = new Sale({ product, quantity, total, customerName });
    await newSale.save();
    res.redirect('/sales');
  } catch (err) {
    console.error('Error al crear la venta:', err);
    res.redirect('/sales/add');
  }
});

// Ruta para mostrar el formulario de edición de venta
router.get('/sales/edit/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    res.render('sales/edit', { sale });
  } catch (err) {
    console.error('Error al obtener la venta:', err);
    res.redirect('/sales');
  }
});

// Ruta para actualizar una venta
router.post('/sales/edit/:id', async (req, res) => {
  const { product, quantity, total, customerName } = req.body;
  try {
    await Sale.findByIdAndUpdate(req.params.id, { product, quantity, total, customerName });
    res.redirect('/sales');
  } catch (err) {
    console.error('Error al actualizar la venta:', err);
    res.redirect('/sales');
  }
});

// Ruta para eliminar una venta
router.get('/sales/delete/:id', async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id);
    res.redirect('/sales');
  } catch (err) {
    console.error('Error al eliminar la venta:', err);
    res.redirect('/sales');
  }
});

export default router;
