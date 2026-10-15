import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta base de comprobación de salud de la API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'API Municipio Fácil operativa y escuchando solicitudes',
    timestamp: new Date().toISOString()
  });
});

// Inicialización del servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

export default app;