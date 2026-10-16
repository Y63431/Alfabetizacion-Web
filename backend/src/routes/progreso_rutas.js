import { Router } from 'express';
import {
  listarProgreso, obtenerProgreso, iniciarProgreso,
  actualizarProgreso, eliminarProgreso,
} from '../controllers/progreso_control.js';

const router = Router();
router.get('/', listarProgreso);
router.get('/:id', obtenerProgreso);
router.post('/', iniciarProgreso);
router.patch('/:id', actualizarProgreso);
router.delete('/:id', eliminarProgreso);
export default router;