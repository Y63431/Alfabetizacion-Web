import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { helpCircleOutline, logOutOutline } from 'ionicons/icons';
import { eliminarSesion } from '../services/autenticacion';
import './AdministracionLayout.css';

interface AdministracionLayoutProps {
  titulo: string;
  children: React.ReactNode;
}

const AdministracionLayout: React.FC<AdministracionLayoutProps> = ({ titulo, children }) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    eliminarSesion();
    navigate('/bienvenida', { replace: true });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="admin-toolbar">
          <IonTitle>
            <span className="admin-brand-mark">MF</span>
            <span>Municipio Fácil</span>
            <span className="admin-breadcrumb"> / {titulo}</span>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton fill="outline" routerLink="/admin/panel" className="admin-toolbar-button">
              Panel principal
            </IonButton>
            <IonButton fill="outline" routerLink="/ayuda" aria-label="Ayuda" className="admin-toolbar-button">
              <IonIcon icon={helpCircleOutline} />
              <span className="admin-toolbar-label">Ayuda</span>
            </IonButton>
            <IonButton fill="clear" onClick={cerrarSesion} aria-label="Cerrar sesión">
              <IonIcon icon={logOutOutline} />
              <span className="admin-toolbar-label">Salir</span>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="admin-content">
        <div className="admin-container">{children}</div>
      </IonContent>
    </IonPage>
  );
};

export default AdministracionLayout;
