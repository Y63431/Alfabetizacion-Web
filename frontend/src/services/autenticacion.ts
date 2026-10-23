export interface UsuarioAutenticado {
  id: number;
  nombre: string;
  email: string;
  rol_id: number;
}

export interface SesionAutenticada {
  token: string;
  usuario: UsuarioAutenticado;
}

interface RespuestaAutenticacionApi {
  ok?: boolean;
  message?: string;
  error?: {
    mensaje?: string;
  };
  data?: {
    token?: unknown;
    usuario?: unknown;
  };
}

const CLAVE_SESION = 'municipio-facil.session';
const URL_API = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

function esUsuarioAutenticado(valor: unknown): valor is UsuarioAutenticado {
  if (typeof valor !== 'object' || valor === null) return false;

  const usuario = valor as Record<string, unknown>;
  return Number.isInteger(usuario.id)
    && typeof usuario.nombre === 'string'
    && typeof usuario.email === 'string'
    && Number.isInteger(usuario.rol_id);
}

function esSesionAutenticada(valor: unknown): valor is SesionAutenticada {
  if (typeof valor !== 'object' || valor === null) return false;

  const sesion = valor as Record<string, unknown>;
  return typeof sesion.token === 'string' && esUsuarioAutenticado(sesion.usuario);
}

function tokenNoExpirado(token: string): boolean {
  const partesToken = token.split('.');
  if (partesToken.length !== 3) return false;

  const contenidoCodificado = partesToken[1].replace(/-/g, '+').replace(/_/g, '/');
  const contenidoConRelleno = contenidoCodificado.padEnd(
    Math.ceil(contenidoCodificado.length / 4) * 4,
    '='
  );
  try {
    const contenidoToken: unknown = JSON.parse(atob(contenidoConRelleno));
    if (typeof contenidoToken !== 'object' || contenidoToken === null) return false;

    const expiracion = (contenidoToken as Record<string, unknown>).exp;
    return typeof expiracion === 'number' && expiracion * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function obtenerSesion(): SesionAutenticada | null {
  const sesionGuardada = sessionStorage.getItem(CLAVE_SESION);
  if (!sesionGuardada) return null;

  try {
    const sesionInterpretada: unknown = JSON.parse(sesionGuardada);
    if (esSesionAutenticada(sesionInterpretada) && tokenNoExpirado(sesionInterpretada.token)) {
      return sesionInterpretada;
    }
  } catch {
    sessionStorage.removeItem(CLAVE_SESION);
    return null;
  }

  sessionStorage.removeItem(CLAVE_SESION);
  return null;
}

export function eliminarSesion(): void {
  sessionStorage.removeItem(CLAVE_SESION);
}

async function autenticar(
  ruta: 'login' | 'registro',
  credenciales: Record<string, string>
): Promise<SesionAutenticada> {
  let respuesta: Response;
  try {
    respuesta = await fetch(`${URL_API}/auth/${ruta}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credenciales),
    });
  } catch {
    throw new Error('No se pudo conectar con el servicio. Revisa tu conexión e inténtalo nuevamente.');
  }

  let resultado: RespuestaAutenticacionApi;
  try {
    resultado = await respuesta.json() as RespuestaAutenticacionApi;
  } catch {
    throw new Error('El servicio respondió con un formato inesperado. Inténtalo más tarde.');
  }

  if (!respuesta.ok || resultado.ok !== true) {
    throw new Error(
      resultado.message
      || resultado.error?.mensaje
      || 'No se pudo validar la cuenta. Revisa tus datos e inténtalo de nuevo.'
    );
  }

  const token = resultado.data?.token;
  const usuario = resultado.data?.usuario;
  if (typeof token !== 'string' || !tokenNoExpirado(token) || !esUsuarioAutenticado(usuario)) {
    throw new Error('El servicio no devolvió una sesión válida. Inténtalo más tarde.');
  }

  const sesion: SesionAutenticada = { token, usuario };
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
}

export function iniciarSesion(correo: string, clave: string): Promise<SesionAutenticada> {
  return autenticar('login', { email: correo, password: clave });
}

export function registrarUsuario(
  nombre: string,
  correo: string,
  clave: string
): Promise<SesionAutenticada> {
  return autenticar('registro', { nombre, email: correo, password: clave });
}
