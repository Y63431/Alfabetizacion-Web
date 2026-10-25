import React from 'react';
import {
  IonCard, IonCardContent, IonIcon,
} from '@ionic/react';
import {
  peopleOutline, barChartOutline, bookOutline, settingsOutline, sparklesOutline,
} from 'ionicons/icons';
import AdministracionLayout from '../components/AdministracionLayout';
import { obtenerSesion } from '../services/autenticacion';
import './PanelAdministrador.css';

const accesos = [
  {
    titulo: 'Gestión de usuarios',
    descripcion: 'Administra las cuentas de los ciudadanos registrados.',
    ruta: '/admin/usuarios',
    icono: peopleOutline,
    destacado: true,
  },
  {
    titulo: 'Reportes y estadísticas',
    descripcion: 'Revisa el uso de los tutoriales y las dificultades frecuentes.',
    ruta: '/admin/metricas',
    icono: barChartOutline,
  },
  {
    titulo: 'Contenidos y tutoriales',
    descripcion: 'Crea, modifica y habilita los módulos de aprendizaje.',
    ruta: '/admin/modulos',
    icono: bookOutline,
  },
  {
    titulo: 'Configuración del sistema',
    descripcion: 'Ajusta preferencias visuales de este panel administrativo.',
    ruta: '/admin/configuracion',
    icono: settingsOutline,
  },
];

const PanelAdministrador: React.FC = () => {
  const sesion = obtenerSesion();

  return (
    <AdministracionLayout titulo="Panel principal">
      <div className="admin-welcome-banner">
        <IonIcon icon={sparklesOutline} aria-hidden="true" />
        <span>Desde aquí puedes gestionar los contenidos y revisar el avance de Municipio Fácil.</span>
      </div>

      <div className="admin-dashboard-heading">
        <div>
          <p className="admin-overline">PANEL DE ADMINISTRACIÓN</p>
          <h1 className="admin-page-title">¡Hola{sesion ? `, ${sesion.usuario.nombre}` : ''}!</h1>
          <p className="admin-page-description">¿Qué necesitas revisar hoy?</p>
        </div>
      </div>

      <section className="admin-access-grid" aria-label="Secciones de administración">
        {accesos.map((acceso) => (
          <IonCard
            button
            routerLink={acceso.ruta}
            className={`admin-access-card${acceso.destacado ? ' admin-access-card-highlight' : ''}`}
            key={acceso.ruta}
          >
            <IonCardContent>
              <div className="admin-access-icon">
                <IonIcon icon={acceso.icono} aria-hidden="true" />
              </div>
              <div>
                <h2>{acceso.titulo}</h2>
                <p>{acceso.descripcion}</p>
              </div>
              <span className="admin-access-action">Abrir sección →</span>
            </IonCardContent>
          </IonCard>
        ))}
      </section>
    </AdministracionLayout>
  );
};

export default PanelAdministrador;
