import { Router } from 'express';
import { registrarUsuario, iniciarSesion } from '../controllers/auth_control.js';

const router = Router();

// Rutas públicas de autenticación
router.post('/registro', registrarUsuario);
router.post('/login', iniciarSesion);

export default router;