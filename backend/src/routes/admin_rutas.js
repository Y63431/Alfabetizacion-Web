import { Router } from 'express';
import { listarUsuarios, obtenerMetricas } from '../controllers/admin_control.js';
import { esAdmin, verificarToken } from '../middlewares/auth.js';

const router = Router();

router.use(verificarToken, esAdmin);
router.get('/usuarios', listarUsuarios);
router.get('/metricas', obtenerMetricas);

export default router;
