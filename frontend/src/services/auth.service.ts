const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const loginService = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Si el backend devuelve un error (ej. 401 Credenciales inválidas)
    if (!response.ok) {
      throw new Error(data.error?.mensaje || 'Error al iniciar sesión');
    }

    // Si todo sale bien, guardamos el JWT y los datos del usuario en el navegador
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('usuario', JSON.stringify(data.data.usuario));

    return data.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error de conexión con el servidor');
  }
};

export const registroService = async (nombre: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Enviamos exactamente lo que pide tu controlador auth_control.js
      body: JSON.stringify({ nombre, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.mensaje || 'Error al registrar la cuenta');
    }

    // Tu backend devuelve un token y usuario al registrar, los guardamos para auto-iniciar sesión
    localStorage.setItem('token', data.data.token);
    localStorage.setItem('usuario', JSON.stringify(data.data.usuario));

    return data.data;
  } catch (error: any) {
    throw new Error(error.message || 'Error de conexión con el servidor');
  }
};