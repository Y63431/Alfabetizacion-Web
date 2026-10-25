import React from 'react';
import {
  IonBackButton, IonButtons, IonCard, IonCardContent, IonContent,
  IonHeader, IonPage, IonTitle, IonToolbar,
} from '@ionic/react';

const Practicar: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="light">
        <IonButtons slot="start"><IonBackButton defaultHref="/inicio" text="Inicio" /></IonButtons>
        <IonTitle>Practicar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Elige una práctica</h1>
      <p>Aprende con ejercicios guiados. Los datos que ingreses aquí son de ejemplo.</p>
      <IonCard button routerLink="/practicar/solicitud-municipal">
        <IonCardContent>
          <h2>Solicitar un trámite municipal</h2>
          <p>Practica cómo completar una solicitud paso a paso.</p>
        </IonCardContent>
      </IonCard>
      <IonCard button routerLink="/practicar/consultar-solicitud">
        <IonCardContent>
          <h2>Consultar una solicitud</h2>
          <p>Aprende a revisar el estado de un trámite de ejemplo.</p>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>
);

export default Practicar;
