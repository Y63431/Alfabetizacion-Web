import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, IonIcon, IonText
} from '@ionic/react';
import { volumeMediumOutline, helpCircleOutline, arrowForwardOutline } from 'ionicons/icons';

const Login: React.FC = () => {
  const [identificador, setIdentificador] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>Municipio Fácil</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear">
              <IonIcon slot="start" icon={volumeMediumOutline} />
              Lectura
            </IonButton>
            <IonButton fill="clear">
              <IonIcon slot="start" icon={helpCircleOutline} />
              Ayuda
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#f4f5f8' } as React.CSSProperties}>
        <div style={{ maxWidth: '650px', margin: '30px auto' }}>
          <IonText color="dark">
            <h2 style={{ fontWeight: 'bold', fontSize: '2rem' }}>Iniciar sesión</h2>
            <p style={{ fontSize: '1.1rem' }}>Ingresa tu correo electrónico o teléfono y contraseña para continuar.</p>
            <p style={{ color: '#166534', fontWeight: 'bold' }}>Intentos ilimitados</p>
          </IonText>

          <IonCard style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <IonCardContent>
              <IonItem lines="none" style={{ border: '2px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}>
                <IonLabel position="stacked" style={{ fontWeight: 'bold', color: '#333' }}>Correo electrónico o teléfono</IonLabel>
                <IonInput value={identificador} placeholder="Ej: tunombre@gmail.com" onIonInput={(e) => setIdentificador(e.detail.value ?? '')} />
              </IonItem>

              <IonItem lines="none" style={{ border: '2px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
                <IonLabel position="stacked" style={{ fontWeight: 'bold', color: '#333' }}>Contraseña</IonLabel>
                <IonInput type="password" value={password} placeholder="Ej: MunicipioF@cil123" onIonInput={(e) => setPassword(e.detail.value ?? '')} />
              </IonItem>

              <div style={{ marginBottom: '15px' }}>
                <IonText color="primary" style={{ cursor: 'pointer', display: 'block', marginBottom: '8px' }}>
                  ¿Tiene problemas para iniciar sesión? Presione aquí
                </IonText>
                <IonText color="dark">
                  ¿No tiene cuenta? <strong style={{ color: '#166534', cursor: 'pointer' }}>Regístrese aquí</strong>
                </IonText>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <IonButton routerLink="/inicio" style={{ '--background': '#0f5132', '--border-radius': '20px', minWidth: '160px' }}>
                  Iniciar Sesión
                  <IonIcon slot="end" icon={arrowForwardOutline} />
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;