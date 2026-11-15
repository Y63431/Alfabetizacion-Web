import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { cargarPreferencias } from './services/preferencias';

// Aplica el tamaño de letra guardado
cargarPreferencias();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
