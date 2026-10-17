import React, { useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
  IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonButtons, 
  IonIcon, IonText, IonToast, useIonRouter
} from '@ionic/react';
import { volumeMediumOutline, helpCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import { loginService } from '../services/auth.service';

const Login: React.FC = () => {
  // Estados para la lógica
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [mensajeError, setMensajeError] = useState<string>('');
  const [mostrarToast, setMostrarToast] = useState<boolean>(false);

  // Hook nativo de Ionic para navegación (reemplaza a useHistory)
  const router = useIonRouter();

  // Función de inicio de sesión conectada a tu backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Llamamos al servicio (asegúrate de que la ruta de importación sea correcta)
      await loginService(email, password);
      
      // Redirigir al inicio si las credenciales son correctas
      router.push('/inicio', 'forward', 'push');
      
    } catch (error: any) {
      // Mostrar el error del backend (ej: credenciales inválidas)
      setMensajeError(error.message);
      setMostrarToast(true);
    }
  };

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
            <p style={{ fontSize: '1.1rem' }}>Ingresa tu correo electrónico y contraseña para continuar.</p>
            <p style={{ color: '#166534', fontWeight: 'bold' }}>Intentos ilimitados</p>
          </IonText>

          <IonCard style={{ borderRadius: '12px', padding: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <IonCardContent>
              {/* Formulario envolviendo los inputs para manejar el submit */}
              <form onSubmit={handleLogin}>
                
                <IonItem lines="none" style={{ border: '2px solid #ccc', borderRadius: '8px', marginBottom: '16px' }}>
                  <IonLabel position="stacked" style={{ fontWeight: 'bold', color: '#333' }}>Correo electrónico</IonLabel>
                  <IonInput 
                    type="email"
                    value={email} 
                    placeholder="Ej: tunombre@gmail.com" 
                    onIonInput={(e) => setEmail(e.detail.value ?? '')} 
                    required
                  />
                </IonItem>

                <IonItem lines="none" style={{ border: '2px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
                  <IonLabel position="stacked" style={{ fontWeight: 'bold', color: '#333' }}>Contraseña</IonLabel>
                  <IonInput 
                    type="password" 
                    value={password} 
                    placeholder="Ej: MunicipioF@cil123" 
                    onIonInput={(e) => setPassword(e.detail.value ?? '')} 
                    required
                  />
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
                  {/* Se elimina routerLink y se cambia a type="submit" */}
                  <IonButton type="submit" style={{ '--background': '#0f5132', '--border-radius': '20px', minWidth: '160px' }}>
                    Iniciar Sesión
                    <IonIcon slot="end" icon={arrowForwardOutline} />
                  </IonButton>
                </div>

              </form>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Notificación de error en caso de fallo de login */}
        <IonToast
          isOpen={mostrarToast}
          onDidDismiss={() => setMostrarToast(false)}
          message={mensajeError}
          duration={3000}
          color="danger"
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;