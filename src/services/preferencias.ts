/** Preferencias de accesibilidad guardadas en localStorage. */

export type TamanoLetra = 'normal' | 'grande' | 'muy-grande';

export interface PreferenciasUsuario {
  tamanoLetra: TamanoLetra;
}

const CLAVE = 'municipio-facil.preferencias';

export const PREFERENCIAS_POR_DEFECTO: PreferenciasUsuario = {
  tamanoLetra: 'normal',
};

/** Tamaño base de la letra. */
export const ESCALA_LETRA: Record<TamanoLetra, string> = {
  normal: '100%',
  grande: '118.75%',      // 19 px
  'muy-grande': '137.5%', // 22 px
};

const esValida = (valor: unknown): valor is PreferenciasUsuario => {
  if (typeof valor !== 'object' || valor === null) return false;
  const p = valor as Record<string, unknown>;
  return typeof p.tamanoLetra === 'string' && p.tamanoLetra in ESCALA_LETRA;
};

/** Aplica el tamaño de letra a toda la app. */
export function aplicarPreferencias(preferencias: PreferenciasUsuario): void {
  document.documentElement.style.fontSize = ESCALA_LETRA[preferencias.tamanoLetra];
}

/** Lee las preferencias guardadas o usa las de por defecto. */
export function obtenerPreferencias(): PreferenciasUsuario {
  try {
    const guardadas: unknown = JSON.parse(localStorage.getItem(CLAVE) ?? 'null');
    return esValida(guardadas) ? guardadas : { ...PREFERENCIAS_POR_DEFECTO };
  } catch {
    return { ...PREFERENCIAS_POR_DEFECTO };
  }
}

/** Se llama al abrir la app. */
export function cargarPreferencias(): PreferenciasUsuario {
  const preferencias = obtenerPreferencias();
  aplicarPreferencias(preferencias);
  return preferencias;
}

export function guardarPreferencias(preferencias: PreferenciasUsuario): void {
  localStorage.setItem(CLAVE, JSON.stringify(preferencias));
  aplicarPreferencias(preferencias);
}
