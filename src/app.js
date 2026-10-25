import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { probarConexion } from './config/db.js';

// Importar rutas
import authRutas from './routes/auth_rutas.js';
import modulosRutas from './routes/modulos_rutas.js';
import progresoRutas from './routes/progreso_rutas.js';
import adminRoutes from './routes/admin_rutas.js';

// Importar middlewares de error y autenticación
import { rutaNoEncontrada, errorHandler } from './middlewares/error.js';
import { verificarToken } from './middlewares/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Probar conexión a la BD
probarConexion();

// Endpoints Públicos
app.get('/api/health', (req, res) => {
  res.status(200).json({ ok: true, message: 'API Municipio Fácil operativa' });
});
app.use('/api/auth', authRutas);

// Endpoints de Módulos (Lectura pública, si se prefiere)
app.use('/api/modulos', modulosRutas);

// Endpoints Protegidos (Requieren JWT enviado en Header: Authorization: Bearer <TOKEN>)
app.use('/api/progreso', verificarToken, progresoRutas);

app.use('/api/admin', adminRoutes);


// Manejo de errores
app.use(rutaNoEncontrada);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

export default app;