import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Pool de conexiones a PostgreSQL
export const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "municipio-facil",
  port: process.env.DB_PORT || 5432,
});

// Función para verificar la conexión inicial
export const probarConexion = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexión exitosa a PostgreSQL:', res.rows[0].now);
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error.message);
  }
};