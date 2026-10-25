import React, { useState } from 'react';
import {
  IonBackButton, IonButtons, IonContent, IonHeader, IonItem,
  IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar,
} from '@ionic/react';

const Configuracion: React.FC = () => {
  const [fontSize, setFontSize] = useState('18px');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start"><IonBackButton defaultHref="/inicio" text="Inicio" /></IonButtons>
          <IonTitle>Configuración</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" style={{ fontSize }}>
        <h1>Accesibilidad</h1>
        <IonItem>
          <IonLabel>Tamaño del texto</IonLabel>
          <IonSelect
            aria-label="Tamaño del texto"
            value={fontSize}
            onIonChange={(event) => setFontSize(event.detail.value)}
          >
            <IonSelectOption value="16px">Normal</IonSelectOption>
            <IonSelectOption value="20px">Grande</IonSelectOption>
            <IonSelectOption value="24px">Muy grande</IonSelectOption>
          </IonSelect>
        </IonItem>
        <p>El cambio se aplica inmediatamente a esta vista.</p>
      </IonContent>
    </IonPage>
  );
};

export default Configuracion;
