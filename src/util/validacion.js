import { ApiError } from '../middlewares/error.js';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordSpecialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

const validarEmail = (email) => {
  if (typeof email !== 'string' || email.trim() === '') {
    throw new ApiError(400, 'El correo electrónico es obligatorio.');
  }
  if (email.trim().length > 150) {
    throw new ApiError(400, 'El correo electrónico no puede superar los 150 caracteres.');
  }
  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, 'El correo electrónico no es válido.');
  }
  if (!email.trim().toLowerCase().endsWith('@gmail.com')) {
    throw new ApiError(400, 'El correo electrónico debe ser de Gmail.');
  }
};

const validarPassword = (password) => {
  if (typeof password !== 'string' || password.trim() === '') {
    throw new ApiError(400, 'La contraseña es obligatoria.');
  }
  if (password.length < 8) {
    throw new ApiError(400, 'La contraseña debe tener al menos 8 caracteres.');
  }
  if (!/[a-z]/.test(password)) {
    throw new ApiError(400, 'La contraseña debe contener al menos una letra minúscula.');
  }
  if (!/[A-Z]/.test(password)) {
    throw new ApiError(400, 'La contraseña debe contener al menos una letra mayúscula.');
  }
  if (!/[0-9]/.test(password)) {
    throw new ApiError(400, 'La contraseña debe contener al menos un número.');
  }
  if (!passwordSpecialCharRegex.test(password)) {
    throw new ApiError(400, 'La contraseña debe contener al menos un carácter especial.');
  }
};

const validarLogin = (email, password) => {
  if (typeof email !== 'string' || email.trim() === '') {
    throw new ApiError(400, 'El correo electrónico es obligatorio.');
  }
  if (typeof password !== 'string' || password.trim() === '') {
    throw new ApiError(400, 'La contraseña es obligatoria.');
  }
  if (!emailRegex.test(email.trim())) {
    throw new ApiError(400, 'El correo electrónico no es válido.');
  }
};

const validarRegistro = (nombre, email, password, telefono) => {
  if (typeof nombre !== 'string' || nombre.trim() === '') {
    throw new ApiError(400, 'El nombre es obligatorio.');
  }
  if (nombre.trim().length > 100) {
    throw new ApiError(400, 'El nombre no puede superar los 100 caracteres.');
  }

  validarEmail(email);
  validarPassword(password);

  if (telefono != null && telefono !== '') {
    if (typeof telefono !== 'string' || !/^\+?[0-9\s()-]{7,20}$/.test(telefono.trim())) {
      throw new ApiError(400, 'El teléfono no tiene un formato válido.');
    }
  }
};

export { validarEmail, validarPassword, validarLogin, validarRegistro };
