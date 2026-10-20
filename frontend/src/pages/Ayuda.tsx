import React from 'react';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonPage,
  IonTitle, IonToolbar,
} from '@ionic/react';

const Ayuda: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start"><IonBackButton defaultHref="/bienvenida" text="Volver" /></IonButtons>
        <IonTitle>Ayuda</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Preguntas frecuentes</h1>
      <h2>¿Las prácticas envían un trámite real?</h2>
      <p>No. Son ejercicios de aprendizaje y solo se deben usar datos ficticios.</p>
      <h2>¿Cómo cambio el tamaño de letra?</h2>
      <p>Con la sesión iniciada, abre Configuración desde Inicio y selecciona el tamaño que prefieras.</p>
      <h2>¿No puedes iniciar sesión?</h2>
      <p>Comprueba tu correo y contraseña. Si el servicio no está disponible, inténtalo más tarde.</p>
    </IonContent>
  </IonPage>
);

export default Ayuda;
