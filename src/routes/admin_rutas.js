import { Router } from 'express';
import { obtenerUsuarios, obtenerMetricas } from '../controllers/admin_control.js';

const router = Router();

// GET /api/admin/usuarios
router.get('/usuarios', obtenerUsuarios);

// GET /api/admin/metricas
router.get('/metricas', obtenerMetricas);

export default router;