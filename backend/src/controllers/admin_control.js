import { pool } from '../config/db.js'; // Asegúrate de que la ruta sea correcta

// GET /api/admin/usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT u.id, u.nombre, u.email, u.creado_en, u.activo, r.nombre AS rol
      FROM usuarios u
      JOIN roles r ON u.rol_id = r.id
      ORDER BY u.creado_en DESC
    `);
    
    res.status(200).json({
      ok: true,
      message: 'Usuarios obtenidos con éxito',
      data: rows
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error interno del servidor' });
  }
};

// GET /api/admin/metricas
export const obtenerMetricas = async (req, res) => {
  try {
    // 1. Resumen general
    const usuariosRes = await pool.query("SELECT COUNT(*) FROM usuarios WHERE rol_id = 1");
    const sesionesRes = await pool.query(`
      SELECT COUNT(*) as total, 
             AVG(tiempo_segundos) as tiempo, 
             SUM(CASE WHEN errores_cometidos > 0 THEN 1 ELSE 0 END) as con_errores, 
             SUM(CASE WHEN completado = false THEN 1 ELSE 0 END) as abandonos 
      FROM progreso_usuarios
    `);

    const totalSesiones = parseInt(sesionesRes.rows[0].total) || 0;
    const conErrores = parseInt(sesionesRes.rows[0].con_errores) || 0;
    const abandonosCount = parseInt(sesionesRes.rows[0].abandonos) || 0;

    const resumen = {
      usuarios: parseInt(usuariosRes.rows[0].count) || 0,
      sesiones: totalSesiones,
      tiempo_promedio: parseInt(sesionesRes.rows[0].tiempo) || 0,
      tasa_error: totalSesiones > 0 ? Math.round((conErrores / totalSesiones) * 100) : 0,
      tasa_abandono: totalSesiones > 0 ? Math.round((abandonosCount / totalSesiones) * 100) : 0
    };

    // 2. Desempeño por Módulo
    const modulosRes = await pool.query(`
      SELECT m.id, m.titulo, m.total_pasos,
             COUNT(p.id) as sesiones,
             SUM(CASE WHEN p.completado = true THEN 1 ELSE 0 END) as completadas,
             SUM(CASE WHEN p.errores_cometidos > 0 THEN 1 ELSE 0 END) as con_errores
      FROM modulos_tutoriales m
      LEFT JOIN progreso_usuarios p ON m.id = p.modulo_id
      GROUP BY m.id, m.titulo, m.total_pasos
    `);

    const modulos = modulosRes.rows.map(m => {
      const mSesiones = parseInt(m.sesiones) || 0;
      const mErrores = parseInt(m.con_errores) || 0;
      return {
        id: m.id,
        titulo: m.titulo,
        total_pasos: m.total_pasos,
        sesiones: mSesiones,
        completadas: parseInt(m.completadas) || 0,
        tasa_error: mSesiones > 0 ? Math.round((mErrores / mSesiones) * 100) : 0
      };
    });

    // 3. Abandonos
    const abandonosRes = await pool.query(`
      SELECT m.titulo, COUNT(p.id) as abandonos
      FROM progreso_usuarios p
      JOIN modulos_tutoriales m ON p.modulo_id = m.id
      WHERE p.completado = false
      GROUP BY m.titulo
      ORDER BY abandonos DESC
    `);

    res.status(200).json({
      ok: true,
      data: {
        resumen,
        modulos,
        abandonos: abandonosRes.rows.map(a => ({ titulo: a.titulo, abandonos: parseInt(a.abandonos) }))
      }
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: 'Error al obtener métricas' });
  }
};