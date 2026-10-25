import { Router } from 'express';
import {
  listarModulos, obtenerModulo, crearModulo,
  reemplazarModulo, modificarModulo, eliminarModulo,
} from '../controllers/modulos_control.js';

const router = Router();
router.get('/', listarModulos);
router.get('/:id', obtenerModulo);
router.post('/', crearModulo);
router.put('/:id', reemplazarModulo);
router.patch('/:id', modificarModulo);
router.delete('/:id', eliminarModulo);
export default router;