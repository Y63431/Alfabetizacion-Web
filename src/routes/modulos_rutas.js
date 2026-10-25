import { Router } from 'express';
import {
  listarModulos, obtenerModulo, crearModulo,
  reemplazarModulo, modificarModulo, eliminarModulo,
} from '../controllers/modulos_control.js';
import { verificarToken,esAdmin } from '../middlewares/auth.js';

const router = Router();
router.get('/', listarModulos);
router.get('/:id', obtenerModulo);
// GET /api/modulos
router.get('/', verificarToken, esAdmin, listarModulos);

// GET /api/modulos:id
router.get('/', verificarToken, esAdmin, obtenerModulo);

// POST /api/modulos
router.post('/', verificarToken, esAdmin, crearModulo);

// PUT /api/modulos:id
router.put('/:id', verificarToken, esAdmin, reemplazarModulo);

// DELETE /api/modulos:id
router.delete('/:id', verificarToken, esAdmin, eliminarModulo);

// PATCH /api/modulos:id
router.patch('/:id', verificarToken, esAdmin, modificarModulo);
export default router;