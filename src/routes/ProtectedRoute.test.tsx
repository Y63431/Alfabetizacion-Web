import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

describe('ProtectedRoute', () => {
  beforeEach(() => sessionStorage.clear());
  afterEach(cleanup);

  const token = `e30.${btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 3600 }))}.signature`;

  const renderRoutes = (path: string) => render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/inicio" element={
          <ProtectedRoute allowedRoles={[1]}><p>Inicio ciudadano</p></ProtectedRoute>
        } />
        <Route path="/admin/panel" element={
          <ProtectedRoute allowedRoles={[2]}><p>Panel administrador</p></ProtectedRoute>
        } />
        <Route path="/iniciar-sesion" element={<p>Inicio de sesión</p>} />
      </Routes>
    </MemoryRouter>
  );

  it('redirects direct access without a session to login', () => {
    renderRoutes('/inicio');

    expect(screen.getByText('Inicio de sesión')).toBeTruthy();
  });

  it('redirects a citizen away from the administrator route', () => {
    sessionStorage.setItem('municipio-facil.session', JSON.stringify({
      token,
      usuario: { id: 1, nombre: 'Ana', email: 'ana@gmail.com', rol_id: 1 },
    }));

    renderRoutes('/admin/panel');

    expect(screen.getByText('Inicio ciudadano')).toBeTruthy();
  });

  it('allows an administrator to open the separate admin route', () => {
    sessionStorage.setItem('municipio-facil.session', JSON.stringify({
      token,
      usuario: { id: 2, nombre: 'Admin', email: 'admin@gmail.com', rol_id: 2 },
    }));

    renderRoutes('/admin/panel');

    expect(screen.getByText('Panel administrador')).toBeTruthy();
  });
});