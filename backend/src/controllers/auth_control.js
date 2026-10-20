import 'dotenv/config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../config/db.js';
import { ApiError } from '../middlewares/error.js';
import { validarLogin, validarRegistro } from '../util/validacion.js';

const SALT_ROUNDS = 10;

// POST /api/auth/registro
export const registrarUsuario = async (req, res) => {
  const { nombre, email, password, telefono } = req.body ?? {};

  validarRegistro(nombre, email, password, telefono);

  // Hashear contraseña con bcrypt
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Rol por defecto: 1 = ciudadano
  const rolIdPorDefecto = 1;

  const { rows } = await pool.query(
    `INSERT INTO usuarios (nombre, email, password_hash, telefono, rol_id)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nombre, email, telefono, rol_id, creado_en`,
    [nombre.trim(), email.trim().toLowerCase(), passwordHash, telefono?.trim() || null, rolIdPorDefecto]
  );

  const nuevoUsuario = rows[0];

  // Generar JWT
  const token = jwt.sign(
    { id: nuevoUsuario.id, email: nuevoUsuario.email, rol_id: nuevoUsuario.rol_id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    ok: true,
    message: 'Usuario registrado con éxito',
    data: {
      usuario: nuevoUsuario,
      token
    }
  });
};

// POST /api/auth/login
export const iniciarSesion = async (req, res) => {
  const { email, password } = req.body ?? {};

  validarLogin(email, password);

  // Buscar usuario en la base de datos
  const { rows } = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1 AND activo = TRUE',
    [email.trim().toLowerCase()]
  );

  if (rows.length === 0) {
    throw new ApiError(401, 'Credenciales inválidas (email o contraseña incorrectos)');
  }

  const usuario = rows[0];

  // Comparar la contraseña ingresada con el hash de la BD
  const esPasswordCorrecto = await bcrypt.compare(password, usuario.password_hash);

  if (!esPasswordCorrecto) {
    throw new ApiError(401, 'Credenciales inválidas (email o contraseña incorrectos)');
  }

  // Generar JWT
  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol_id: usuario.rol_id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  // Omitir el hash de la contraseña en la respuesta
  const { password_hash, ...datosUsuario } = usuario;

  res.status(200).json({
    ok: true,
    message: 'Inicio de sesión exitoso',
    data: {
      usuario: datosUsuario,
      token
    }
  });
};