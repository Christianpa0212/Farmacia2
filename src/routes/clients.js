import { Router } from 'express';
import Client from '../models/Client.js';

const router = Router();

// Ruta para listar todos los clientes
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.render('clients/list', { clients });
  } catch (err) {
    console.error('Error al obtener los clientes:', err);
    res.redirect('/');
  }
});

// Ruta para mostrar el formulario de creación de cliente
router.get('/clients/add', (req, res) => {
  res.render('clients/add');
});

// Ruta para crear un nuevo cliente
router.post('/clients/add', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const newClient = new Client({ name, email, phone, address });
    await newClient.save();
    res.redirect('/clients');
  } catch (err) {
    console.error('Error al crear el cliente:', err);
    res.redirect('/clients/add');
  }
});

// Ruta para mostrar el formulario de edición de cliente
router.get('/clients/edit/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.render('clients/edit', { client });
  } catch (err) {
    console.error('Error al obtener el cliente:', err);
    res.redirect('/clients');
  }
});

// Ruta para actualizar un cliente
router.post('/clients/edit/:id', async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    await Client.findByIdAndUpdate(req.params.id, { name, email, phone, address });
    res.redirect('/clients');
  } catch (err) {
    console.error('Error al actualizar el cliente:', err);
    res.redirect('/clients');
  }
});

// Ruta para eliminar un cliente
router.get('/clients/delete/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.redirect('/clients');
  } catch (err) {
    console.error('Error al eliminar el cliente:', err);
    res.redirect('/clients');
  }
});

export default router;
