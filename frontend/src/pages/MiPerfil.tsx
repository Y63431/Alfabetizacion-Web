import React from 'react';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonItem,
  IonLabel, IonList, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';
import { obtenerSesion } from '../services/autenticacion';

const MiPerfil: React.FC = () => {
  const sesion = obtenerSesion();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start"><IonBackButton defaultHref="/inicio" text="Inicio" /></IonButtons>
          <IonTitle>Mi Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h1>Mis datos</h1>
        {sesion ? (
          <IonList>
            <IonItem><IonLabel><strong>Nombre</strong><p>{sesion.usuario.nombre}</p></IonLabel></IonItem>
            <IonItem><IonLabel><strong>Correo electrónico</strong><p>{sesion.usuario.email}</p></IonLabel></IonItem>
          </IonList>
        ) : (
          <p>No se encontró una sesión activa. Vuelve a iniciar sesión.</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default MiPerfil;
