import React, { useEffect, useMemo, useState } from 'react';
import {
  IonButton, IonIcon, IonSearchbar, IonSpinner,
} from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';
import AdministracionLayout from '../components/AdministracionLayout';
import { obtenerUsuarios, type UsuarioAdministracion } from '../services/administracion';
import './VistasAdministrador.css';

const UsuariosAdministrador: React.FC = () => {
  const [usuarios, setUsuarios] = useState<UsuarioAdministracion[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarUsuarios = async () => {
    setCargando(true);
    setError('');
    try {
      setUsuarios(await obtenerUsuarios());
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : 'No se pudo cargar la lista de usuarios.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarUsuarios();
  }, []);

  const usuariosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase();
    if (!termino) return usuarios;
    return usuarios.filter((usuario) =>
      usuario.nombre.toLocaleLowerCase().includes(termino)
      || usuario.email.toLocaleLowerCase().includes(termino)
    );
  }, [busqueda, usuarios]);

  return (
    <AdministracionLayout titulo="Gestión de usuarios">
      <div className="admin-page-heading-row">
        <div>
          <p className="admin-overline">CUENTAS DE LA PLATAFORMA</p>
          <h1 className="admin-page-title">Listado de usuarios registrados</h1>
          <p className="admin-page-description">Consulta las cuentas de ciudadanía. Las contraseñas nunca se muestran.</p>
        </div>
        <IonButton fill="outline" onClick={() => void cargarUsuarios()} disabled={cargando}>
          <IonIcon slot="start" icon={refreshOutline} />
          Actualizar
        </IonButton>
      </div>

      {error && <div className="admin-alert" role="alert">{error}</div>}
      <section className="admin-section-card admin-table-card">
        <div className="admin-table-toolbar">
          <IonSearchbar
            value={busqueda}
            onIonInput={(evento) => setBusqueda(evento.detail.value ?? '')}
            placeholder="Buscar por nombre o correo"
            aria-label="Buscar usuarios"
            debounce={100}
          />
          <span>{usuariosFiltrados.length} usuarios</span>
        </div>

        {cargando ? (
          <div className="admin-loading"><IonSpinner name="crescent" /> Cargando usuarios…</div>
        ) : (
          <div className="admin-table-scroll">
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo electrónico</th>
                  <th>Fecha de registro</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>{new Date(usuario.creado_en).toLocaleDateString('es-CL')}</td>
                    <td><span className={`admin-status ${usuario.activo ? 'admin-status-active' : 'admin-status-inactive'}`}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span></td>
                  </tr>
                ))}
                {usuariosFiltrados.length === 0 && (
                  <tr><td colSpan={4} className="admin-empty-cell">
                    {busqueda ? 'No se encontraron usuarios con esa búsqueda.' : 'Todavía no hay usuarios registrados.'}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </AdministracionLayout>
  );
};

export default UsuariosAdministrador;
