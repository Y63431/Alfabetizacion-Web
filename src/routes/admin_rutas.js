import { Router } from 'express';
import { obtenerUsuarios, obtenerMetricas} from '../controllers/admin_control.js';
import { verificarToken, esAdmin } from '../middlewares/auth.js'; 
const router = Router();

// GET /api/admin/usuarios
router.get('/usuarios', verificarToken, esAdmin, obtenerUsuarios);

// GET /api/admin/metricas
router.get('/metricas', verificarToken, esAdmin, obtenerMetricas);

export default router;