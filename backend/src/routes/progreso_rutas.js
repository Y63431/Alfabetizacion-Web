import { Router } from 'express';
import {
  listarProgreso, obtenerProgreso, iniciarProgreso,
  actualizarProgreso, eliminarProgreso,
} from '../controllers/progreso_control.js';
import { verificarToken } from '../middlewares/auth.js';

const router = Router();

// Agregamos verificarToken a todas las rutas de este archivo
router.use(verificarToken);

router.get('/', listarProgreso);
router.get('/:id', obtenerProgreso);
router.post('/', iniciarProgreso);
router.patch('/:id', actualizarProgreso);
router.delete('/:id', eliminarProgreso);

export default router;