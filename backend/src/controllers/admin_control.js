import { pool } from '../config/db.js';

export const listarUsuarios = async (req, res) => {
  const busqueda = typeof req.query.busqueda === 'string' ? req.query.busqueda.trim() : '';
  const valores = [];
  const filtro = busqueda
    ? `WHERE u.nombre ILIKE $1 OR u.email ILIKE $1`
    : '';

  if (busqueda) valores.push(`%${busqueda}%`);

  const { rows } = await pool.query(
    `SELECT u.id, u.nombre, u.email, u.creado_en, u.activo, r.nombre AS rol
       FROM usuarios u
       JOIN roles r ON r.id = u.rol_id
       ${filtro}
      ORDER BY u.creado_en DESC, u.id DESC`,
    valores
  );

  res.status(200).json({ ok: true, total: rows.length, data: rows });
};

export const obtenerMetricas = async (req, res) => {
  const [resumen, modulos, actividad] = await Promise.all([
    pool.query(
      `SELECT
         (SELECT COUNT(*)::int FROM usuarios WHERE rol_id = 1) AS usuarios,
         (SELECT COUNT(*)::int FROM progreso_usuarios) AS sesiones,
         COALESCE((SELECT ROUND(AVG(tiempo_segundos))::int
           FROM progreso_usuarios WHERE tiempo_segundos > 0), 0) AS tiempo_promedio,
         COALESCE((SELECT ROUND(
           100.0 * COUNT(*) FILTER (WHERE errores_cometidos > 0)
           / NULLIF(COUNT(*), 0), 1
         ) FROM progreso_usuarios), 0) AS tasa_error,
         COALESCE((SELECT ROUND(
           100.0 * COUNT(*) FILTER (WHERE NOT completado)
           / NULLIF(COUNT(*), 0), 1
         ) FROM progreso_usuarios), 0) AS tasa_abandono`
    ),
    pool.query(
      `SELECT m.id, m.titulo, m.total_pasos,
         COUNT(p.id)::int AS sesiones,
         COUNT(p.id) FILTER (WHERE p.completado)::int AS completadas,
         COALESCE(ROUND(
           100.0 * COUNT(p.id) FILTER (WHERE p.errores_cometidos > 0)
           / NULLIF(COUNT(p.id), 0), 1
         ), 0) AS tasa_error
       FROM modulos_tutoriales m
       LEFT JOIN progreso_usuarios p ON p.modulo_id = m.id
       GROUP BY m.id, m.titulo, m.total_pasos
       ORDER BY sesiones DESC, m.id`
    ),
    pool.query(
      `SELECT m.titulo, COUNT(p.id)::int AS abandonos
       FROM modulos_tutoriales m
       JOIN progreso_usuarios p ON p.modulo_id = m.id
       WHERE NOT p.completado
       GROUP BY m.id, m.titulo
       ORDER BY abandonos DESC, m.titulo
       LIMIT 5`
    ),
  ]);

  res.status(200).json({
    ok: true,
    data: {
      resumen: resumen.rows[0],
      modulos: modulos.rows,
      abandonos: actividad.rows,
    },
  });
};
