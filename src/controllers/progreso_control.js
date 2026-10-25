import { pool } from '../config/db.js';
import { ApiError } from '../middlewares/error.js';

// Función para leer y validar un id de parametro 
const leerId = (valor, nombre = 'id') => {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, `${nombre} debe ser un número entero positivo`);
  }
  return id;
};

// GET /api/progreso
export const listarProgreso = async (req, res) => {
  const filtros = [];
  const valores = [];
  if (req.query.usuario_id) {
    valores.push(leerId(req.query.usuario_id, 'usuario_id'));
    filtros.push(`p.usuario_id = $${valores.length}`);
  }
  const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
  const { rows } = await pool.query(
    `SELECT p.*, m.titulo AS modulo_titulo, m.total_pasos
       FROM progreso_usuarios p
       JOIN modulos_tutoriales m ON m.id = p.modulo_id
       ${where} ORDER BY p.id`,
    valores
  );
  res.status(200).json({ ok: true, total: rows.length, data: rows });
};

// GET /api/progreso/:id
export const obtenerProgreso = async (req, res) => {
  const id = leerId(req.params.id);
  const { rows } = await pool.query('SELECT * FROM progreso_usuarios WHERE id = $1', [id]);
  if (rows.length === 0) throw new ApiError(404, `No existe el progreso con id ${id}`);
  res.status(200).json({ ok: true, data: rows[0] });
};

// POST /api/progreso -> Si no existe el usuario o el módulo, la FK falla y el error responde 409
export const iniciarProgreso = async (req, res) => {
  const { usuario_id, modulo_id } = req.body ?? {};
  const uid = leerId(usuario_id, 'usuario_id');
  const mid = leerId(modulo_id, 'modulo_id');
  const { rows } = await pool.query(
    'INSERT INTO progreso_usuarios (usuario_id, modulo_id) VALUES ($1, $2) RETURNING *',
    [uid, mid]
  );
  res.status(201).json({ ok: true, message: 'Progreso iniciado', data: rows[0] });
};

// PATCH /api/progreso/:id 
export const actualizarProgreso = async (req, res) => {
  const id = leerId(req.params.id);
  const body = req.body ?? {};
  const errores = [];

  if (body.paso_actual !== undefined && (!Number.isInteger(body.paso_actual) || body.paso_actual < 1))
    errores.push('paso_actual debe ser un entero >= 1');
  if (body.completado !== undefined && typeof body.completado !== 'boolean')
    errores.push('completado debe ser true o false');
  for (const c of ['errores_cometidos', 'tiempo_segundos']) {
    if (body[c] !== undefined && (!Number.isInteger(body[c]) || body[c] < 0))
      errores.push(`${c} debe ser un entero >= 0`);
  }
  if (errores.length) throw new ApiError(400, 'Datos inválidos', errores);

  const permitidos = ['paso_actual', 'completado', 'errores_cometidos', 'tiempo_segundos'];
  const campos = permitidos.filter((c) => body[c] !== undefined);
  if (campos.length === 0)
    throw new ApiError(400, `Debes enviar al menos un campo: ${permitidos.join(', ')}`);

  const sets = [...campos.map((c, i) => `${c} = $${i + 1}`), 'actualizado_en = CURRENT_TIMESTAMP'].join(', ');
  const { rows } = await pool.query(
    `UPDATE progreso_usuarios SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`,
    [...campos.map((c) => body[c]), id]
  );
  if (rows.length === 0) throw new ApiError(404, `No existe el progreso con id ${id}`);
  res.status(200).json({ ok: true, message: 'Progreso actualizado', data: rows[0] });
};

// DELETE /api/progreso/:id 
export const eliminarProgreso = async (req, res) => {
  const id = leerId(req.params.id);
  const { rows } = await pool.query('DELETE FROM progreso_usuarios WHERE id = $1 RETURNING *', [id]);
  if (rows.length === 0) throw new ApiError(404, `No existe el progreso con id ${id}`);
  res.status(200).json({ ok: true, message: 'Progreso eliminado', data: rows[0] });
};