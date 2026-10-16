import jwt from 'jsonwebtoken';
import { ApiError } from './error.js';

/**
 * Middleware para verificar que la petición incluya un JWT válido
 */
// Obtener el secreto desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('❌ ERROR CRÍTICO: JWT_SECRET no está definido en el archivo .env');
  process.exit(1); // Detiene el servidor si no hay clave secreta
}

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Acceso denegado: No se proporcionó un token de autenticación');
  }

  try {
    // Firma y verificación estricta con la clave del .env
    const usuarioDecodificado = jwt.verify(token, JWT_SECRET);
    req.usuario = usuarioDecodificado;
    next();
  } catch (error) {
    next(new ApiError(403, 'Token inválido o expirado'));
  }
};

/**
 * Middleware opcional para restringir rutas a roles específicos (Ej. Admin) (Veremos si lo usamos a futuro)
 */
export const esAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol_id !== 2) { // 2 = Admin según nuestro script database.sql
    throw new ApiError(403, 'Acceso denegado: Se requieren permisos de administrador');
  }
  next();
};