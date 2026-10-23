import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { iniciarSesion, obtenerSesion } from './autenticacion';

describe('servicio de autenticación', () => {
  const solicitudApiSimulada = vi.fn();
  const tokenVigente = `e30.${btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }))}.signature`;

  beforeEach(() => {
    sessionStorage.clear();
    vi.stubGlobal('fetch', solicitudApiSimulada);
    solicitudApiSimulada.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('guarda la sesión devuelta por la API cuando el acceso es válido', async () => {
    const sesion = {
      token: tokenVigente,
      usuario: { id: 1, nombre: 'Ana', email: 'ana@gmail.com', rol_id: 1 },
    };
    solicitudApiSimulada.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, data: sesion }),
    });

    await expect(iniciarSesion('ana@gmail.com', 'Clave123!')).resolves.toEqual(sesion);
    expect(obtenerSesion()).toEqual(sesion);
  });

  it('no crea una sesión cuando la API rechaza las credenciales', async () => {
    solicitudApiSimulada.mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: { mensaje: 'Credenciales inválidas' } }),
    });

    await expect(iniciarSesion('ana@gmail.com', 'incorrecta')).rejects.toThrow('Credenciales inválidas');
    expect(obtenerSesion()).toBeNull();
  });

  it('informa si falla la conexión y no crea una sesión', async () => {
    solicitudApiSimulada.mockRejectedValue(new Error('conexión no disponible'));

    await expect(iniciarSesion('ana@gmail.com', 'Clave123!')).rejects.toThrow('No se pudo conectar');
    expect(obtenerSesion()).toBeNull();
  });

  it('descarta la sesión cuando vence el JWT', () => {
    const tokenVencido = `e30.${btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) - 1 }))}.signature`;
    sessionStorage.setItem('municipio-facil.session', JSON.stringify({
      token: tokenVencido,
      usuario: { id: 1, nombre: 'Ana', email: 'ana@gmail.com', rol_id: 1 },
    }));

    expect(obtenerSesion()).toBeNull();
    expect(sessionStorage.getItem('municipio-facil.session')).toBeNull();
  });
});
