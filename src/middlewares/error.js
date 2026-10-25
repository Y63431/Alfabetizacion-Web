export class ApiError extends Error {
  constructor(status, mensaje, detalles) {
    super(mensaje);
    this.status = status;
    this.detalles = detalles;
  }
}

export const rutaNoEncontrada = (req, res) => {
  res.status(404).json({
    ok: false,
    error: { mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` },
  });
};

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      ok: false,
      error: { mensaje: err.message, detalles: err.detalles },
    });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      ok: false,
      error: { mensaje: 'El cuerpo de la petición no es un JSON válido' },
    });
  }


  // Errores de PostgreSQL por código
  const erroresPg = {
    '23505': [409, 'Ya existe un registro con esos datos (valor duplicado)'],
    '23503': [409, 'Referencia inválida: el registro relacionado no existe o está en uso'],
    '23502': [400, 'Falta un campo obligatorio'],
    '23514': [400, 'Un valor no cumple las reglas de la base de datos'],
    '22P02': [400, 'Un valor tiene un formato inválido'],
  };
  if (erroresPg[err.code]) {
    const [status, mensaje] = erroresPg[err.code];
    return res.status(status).json({ ok: false, error: { mensaje } });
  }
  console.error('Error no controlado:', err);
  res.status(500).json({ 
    ok: false, 
    error: { mensaje: 'Error interno del servidor' } 
});
};