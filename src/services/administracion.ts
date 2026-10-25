import { obtenerSesion } from './autenticacion';

export interface UsuarioAdministracion {
  id: number;
  nombre: string;
  email: string;
  creado_en: string;
  activo: boolean;
  rol: string;
}

export interface ModuloAdministracion {
  id: number;
  titulo: string;
  descripcion: string;
  dificultad: 'Facil' | 'Media' | 'Alta';
  total_pasos: number;
  estado: 'Habilitado' | 'Borrador' | 'Deshabilitado';
}

export interface MetricasAdministracion {
  resumen: {
    usuarios: number;
    sesiones: number;
    tiempo_promedio: number;
    tasa_error: number;
    tasa_abandono: number;
  };
  modulos: Array<{
    id: number;
    titulo: string;
    total_pasos: number;
    sesiones: number;
    completadas: number;
    tasa_error: number;
  }>;
  abandonos: Array<{
    titulo: string;
    abandonos: number;
  }>;
}

interface RespuestaApi<T> {
  ok: boolean;
  message?: string;
  error?: { mensaje?: string };
  data: T;
  total?: number;
}

const URL_API = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(/\/$/, '');

async function solicitarApi<T>(ruta: string, opciones: RequestInit = {}): Promise<RespuestaApi<T>> {
  const sesion = obtenerSesion();
  if (!sesion) throw new Error('Tu sesión terminó. Inicia sesión nuevamente.');

  let respuesta: Response;
  try {
    respuesta = await fetch(`${URL_API}${ruta}`, {
      ...opciones,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sesion.token}`,
        ...opciones.headers,
      },
    });
  } catch {
    throw new Error('No se pudo conectar con el servicio. Revisa que el servidor esté disponible.');
  }

  let resultado: RespuestaApi<T>;
  try {
    resultado = await respuesta.json() as RespuestaApi<T>;
  } catch {
    throw new Error('El servicio respondió con un formato inesperado.');
  }

  if (!respuesta.ok || resultado.ok !== true) {
    throw new Error(resultado.error?.mensaje || resultado.message || 'No se pudo completar la solicitud.');
  }

  return resultado;
}

export async function obtenerUsuarios(): Promise<UsuarioAdministracion[]> {
  const respuesta = await solicitarApi<UsuarioAdministracion[]>('/admin/usuarios');
  return respuesta.data;
}

export async function obtenerMetricas(): Promise<MetricasAdministracion> {
  const respuesta = await solicitarApi<MetricasAdministracion>('/admin/metricas');
  return respuesta.data;
}

export async function obtenerModulos(): Promise<ModuloAdministracion[]> {
  const respuesta = await solicitarApi<ModuloAdministracion[]>('/modulos');
  return respuesta.data;
}

export async function guardarModulo(
  modulo: Omit<ModuloAdministracion, 'id'>,
  id?: number
): Promise<ModuloAdministracion> {
  const respuesta = await solicitarApi<ModuloAdministracion>(
    id ? `/modulos/${id}` : '/modulos',
    {
      method: id ? 'PUT' : 'POST',
      body: JSON.stringify(modulo),
    }
  );
  return respuesta.data;
}

export async function cambiarEstadoModulo(
  id: number,
  estado: ModuloAdministracion['estado']
): Promise<ModuloAdministracion> {
  const respuesta = await solicitarApi<ModuloAdministracion>(`/modulos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ estado }),
  });
  return respuesta.data;
}
