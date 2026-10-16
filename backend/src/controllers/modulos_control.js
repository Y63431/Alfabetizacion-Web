import { pool } from '../config/db.js';
import { ApiError } from '../middlewares/error.js';

const DIFICULTADES = ['Facil', 'Media', 'Alta'];
const ESTADOS = ['Habilitado', 'Borrador', 'Deshabilitado'];

const leerId = (valor) => {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, 'El id debe ser un numero entero positivo');
  }
  return id;
};

const validarCuerpo = (body = {}, completo) => {
  const errores = [];
  const { titulo, descripcion, dificultad, total_pasos, estado } = body;

  if (completo || titulo !== undefined) {
    if (typeof titulo !== 'string' || titulo.trim() === '' || titulo.length > 150)
      errores.push('titulo es obligatorio');
  }
  if (completo || descripcion !== undefined) {
    if (typeof descripcion !== 'string' || descripcion.trim() === '')
      errores.push('descripcion es obligatoria');
  }
  if (dificultad !== undefined && !DIFICULTADES.includes(dificultad))
    errores.push(`dificultad debe ser una de: ${DIFICULTADES.join(', ')}`);
  if (total_pasos !== undefined && (!Number.isInteger(total_pasos) || total_pasos <= 0))
    errores.push('total_pasos debe ser un entero mayor a 0');
  if (estado !== undefined && !ESTADOS.includes(estado))
    errores.push(`estado debe ser uno de: ${ESTADOS.join(', ')}`);

  if (errores.length > 0) throw new ApiError(400, 'Datos inválidos', errores);
};

// GET /api/modulos
export const listarModulos = async (req, res) => {
  const { estado, dificultad } = req.query;
  const filtros = [];
  const valores = [];
  if (estado) { valores.push(estado); filtros.push(`estado = $${valores.length}`); }
  if (dificultad) { valores.push(dificultad); filtros.push(`dificultad = $${valores.length}`); }
  const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';

  const { rows } = await pool.query(`SELECT * FROM modulos_tutoriales ${where} ORDER BY id`, valores);
  res.status(200).json({ 
    ok: true, 
    total: rows.length, 
    data: rows 
    });
};

// GET /api/modulos/:id
export const obtenerModulo = async (req, res) => {
  const id = leerId(req.params.id);
  const { rows } = await pool.query('SELECT * FROM modulos_tutoriales WHERE id = $1', [id]);
  if (rows.length === 0) throw new ApiError(404, `No existe el módulo con id ${id}`);
  res.status(200).json({ 
    ok: true, 
    data: rows[0] 
    });
};

// POST /api/modulos
export const crearModulo = async (req, res) => {
  const body = req.body ?? {};
  validarCuerpo(body, true);
  const { titulo, descripcion, dificultad = 'Facil', total_pasos = 4, estado = 'Habilitado' } = body;

  const { rows } = await pool.query(
    `INSERT INTO modulos_tutoriales (titulo, descripcion, dificultad, total_pasos, estado)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [titulo.trim(), descripcion.trim(), dificultad, total_pasos, estado]
  );
  res.status(201).json({ ok: true, message: 'Módulo creado', data: rows[0] });
};

// PUT /api/modulos/:id  -> reemplaza todos los campos (excepto id) del módulo
export const reemplazarModulo = async (req, res) => {
  const id = leerId(req.params.id);
  const body = req.body ?? {};
  validarCuerpo(body, true);
  const { titulo, descripcion, dificultad = 'Facil', total_pasos = 4, estado = 'Habilitado' } = body;

  const { rows } = await pool.query(
    `UPDATE modulos_tutoriales
        SET titulo = $1, descripcion = $2, dificultad = $3, total_pasos = $4, estado = $5
      WHERE id = $6 RETURNING *`,
    [titulo.trim(), descripcion.trim(), dificultad, total_pasos, estado, id]
  );
  if (rows.length === 0) throw new ApiError(404, `No existe el módulo con id ${id}`);
  res.status(200).json({ ok: true, message: 'Módulo actualizado', data: rows[0] });
};

// PATCH /api/modulos/:id  -> solo los campos enviados en el body reemplazan los del módulo
export const modificarModulo = async (req, res) => {
  const id = leerId(req.params.id);
  const body = req.body ?? {};
  validarCuerpo(body, false);

  const permitidos = ['titulo', 'descripcion', 'dificultad', 'total_pasos', 'estado'];
  const campos = permitidos.filter((c) => body[c] !== undefined);
  if (campos.length === 0)
    throw new ApiError(400, `Debes enviar al menos un campo: ${permitidos.join(', ')}`);

  const sets = campos.map((c, i) => `${c} = $${i + 1}`).join(', ');
  const valores = campos.map((c) => (typeof body[c] === 'string' ? body[c].trim() : body[c]));

  const { rows } = await pool.query(
    `UPDATE modulos_tutoriales SET ${sets} WHERE id = $${campos.length + 1} RETURNING *`,
    [...valores, id]
  );
  if (rows.length === 0) throw new ApiError(404, `No existe el módulo con id ${id}`);
  res.status(200).json({ ok: true, message: 'Módulo modificado', data: rows[0] });
};

// DELETE /api/modulos/:id 
export const eliminarModulo = async (req, res) => {
  const id = leerId(req.params.id);
  const { rows } = await pool.query('DELETE FROM modulos_tutoriales WHERE id = $1 RETURNING *', [id]);
  if (rows.length === 0) throw new ApiError(404, `No existe el módulo con id ${id}`);
  res.status(200).json({ ok: true, message: 'Módulo eliminado', data: rows[0] });
};