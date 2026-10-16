import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { probarConexion } from './config/db.js';
import modulosRoutes from './routes/modulos_rutas.js';
import progresoRoutes from './routes/progreso_rutas.js';
import { rutaNoEncontrada, errorHandler } from './middlewares/error.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Probamos conexion a BD
probarConexion();

// Ruta base de comprobación de salud de la API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'API Municipio Fácil operativa y escuchando solicitudes',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/modulos', modulosRoutes);
app.use('/api/progreso', progresoRoutes);

app.use(rutaNoEncontrada);
app.use(errorHandler);

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

export default app;