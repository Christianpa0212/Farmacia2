import { Router } from 'express';
import passport from 'passport';
import User from '../models/User.js';

const router = Router();

// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
  res.render('register');
});

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username });
    user.password = await user.encryptPassword(password);
    await user.save();
    res.redirect('/login');
  } catch (err) {
    console.error('Error al registrar el usuario:', err);
    res.redirect('/register');
  }
});

// Ruta para mostrar el formulario de login
router.get('/login', (req, res) => {
  res.render('login');
});

// Ruta para autenticar al usuario
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

export default router;
