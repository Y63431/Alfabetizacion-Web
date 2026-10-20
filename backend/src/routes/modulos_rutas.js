import { Router } from 'express';
import {
  listarModulos, obtenerModulo, crearModulo,
  reemplazarModulo, modificarModulo, eliminarModulo,
} from '../controllers/modulos_control.js';
import { esAdmin, verificarToken } from '../middlewares/auth.js';

const router = Router();
router.get('/', listarModulos);
router.get('/:id', obtenerModulo);
router.post('/', verificarToken, esAdmin, crearModulo);
router.put('/:id', verificarToken, esAdmin, reemplazarModulo);
router.patch('/:id', verificarToken, esAdmin, modificarModulo);
router.delete('/:id', verificarToken, esAdmin, eliminarModulo);
export default router;