import React from 'react';
import { IonPage, IonContent, IonButton, IonText } from '@ionic/react';

const Bienvenida: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': '#f4f5f8' } as React.CSSProperties}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', 
          justifyContent: 'center', minHeight: '80vh', textAlign: 'center'
        }}>
          <IonText color="dark">
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#0f5132', marginBottom: '40px' }}>
              Municipio Fácil
            </h1>
          </IonText>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '320px' }}>
            <IonButton routerLink="/registro" style={{ '--background': '#0f5132', '--border-radius': '25px', height: '52px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Comenzar
            </IonButton>

            <IonButton routerLink="/iniciar-sesion" fill="outline" style={{ '--border-color': '#0f5132', '--color': '#0f5132', '--border-radius': '25px', height: '52px', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Iniciar sesión
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Bienvenida;