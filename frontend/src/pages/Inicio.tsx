import React, { useEffect, useState } from 'react';
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButtons, IonMenuButton, IonIcon, IonCard, IonCardContent,
  IonGrid, IonRow, IonCol, IonButton
} from '@ionic/react';
import { 
  volumeMediumOutline, helpCircleOutline, bookOutline, 
  personOutline, settingsOutline, buildOutline 
} from 'ionicons/icons';

const Inicio: React.FC = () => {
  // Estados para guardar los datos del usuario logueado
  const [nombreUsuario, setNombreUsuario] = useState<string>('Estudiante');
  const [esAdmin, setEsAdmin] = useState<boolean>(false);

  // Hook para cargar los datos al entrar a la pantalla
  useEffect(() => {
    const usuarioString = localStorage.getItem('usuario');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      // Extraemos el primer nombre para el saludo
      const primerNombre = usuario.nombre.split(' ')[0];
      setNombreUsuario(primerNombre);
      
      // Verificamos si tiene el rol de administrador
      if (usuario.rol_id === 2) {
        setEsAdmin(true);
      }
    }
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonMenuButton style={{ color: '#0f5132' }} />
          </IonButtons>
          <IonTitle>Municipio Fácil</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear">
              <IonIcon icon={volumeMediumOutline} slot="start" />
              Lectura
            </IonButton>
            <IonButton fill="clear">
              <IonIcon icon={helpCircleOutline} slot="start" />
              Ayuda
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#f4f5f8' } as React.CSSProperties}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '24px' }}>
            {/* Saludo dinámico con el nombre del usuario */}
            <h1 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.8rem' }}>
              ¡Hola, {nombreUsuario}! Bienvenido de vuelta a tu espacio.
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#4b5563' }}>
              {esAdmin ? 'Modo Administrador activado.' : '¿Qué te gustaría practicar hoy?'}
            </p>
            {!esAdmin && (
              <div style={{ background: '#d1e7dd', color: '#0f5132', padding: '12px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block', marginTop: '10px' }}>
                🔥 Racha de hoy: ¡Llevas 5 días practicando seguido!
              </div>
            )}
          </div>

          <h2 style={{ fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>Elige una actividad para comenzar</h2>

          <IonGrid>
            <IonRow>
              
              {/* Tarjeta Exclusiva para Administradores (Solo se renderiza si esAdmin es true) */}
              {esAdmin && (
                <IonCol size="12">
                  <IonCard style={{ border: '2px solid #0f5132', borderRadius: '12px', background: '#e8f5e9', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                    <IonCardContent style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ background: '#0f5132', padding: '16px', borderRadius: '50%' }}>
                        <IonIcon icon={buildOutline} style={{ color: '#fff', fontSize: '32px' }} />
                      </div>
                      <div>
                        <h2 style={{ fontWeight: 'bold', color: '#0f5132', fontSize: '1.2rem', margin: '0 0 4px 0' }}>Gestión de Módulos (Admin)</h2>
                        <p style={{ margin: 0, color: '#111827' }}>Crea, edita o deshabilita los tutoriales para los ciudadanos.</p>
                      </div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              )}

              {/* Tarjetas comunes (Accesibles para todos) */}
              <IonCol size="12" sizeMd="6">
                <IonCard style={{ border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: 'none', height: '100%' }}>
                  <IonCardContent style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#e8f5e9', padding: '16px', borderRadius: '50%' }}>
                      <IonIcon icon={bookOutline} style={{ color: '#0f5132', fontSize: '32px' }} />
                    </div>
                    <div>
                      <h2 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.2rem', margin: '0 0 4px 0' }}>Practicar</h2>
                      <p style={{ margin: 0, color: '#4b5563' }}>Ejercicios divertidos para aprender a usar el teléfono y la computadora sin miedo.</p>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonCard style={{ border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: 'none', height: '100%' }}>
                  <IonCardContent style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#e3f2fd', padding: '16px', borderRadius: '50%' }}>
                      <IonIcon icon={personOutline} style={{ color: '#1565c0', fontSize: '32px' }} />
                    </div>
                    <div>
                      <h2 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.2rem', margin: '0 0 4px 0' }}>Mi Perfil</h2>
                      <p style={{ margin: 0, color: '#4b5563' }}>Revisa tus datos personales y edita tu información de contacto.</p>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonCard style={{ border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: 'none', height: '100%' }}>
                  <IonCardContent style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#f3e5f5', padding: '16px', borderRadius: '50%' }}>
                      <IonIcon icon={settingsOutline} style={{ color: '#6a1b9a', fontSize: '32px' }} />
                    </div>
                    <div>
                      <h2 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.2rem', margin: '0 0 4px 0' }}>Configuración</h2>
                      <p style={{ margin: 0, color: '#4b5563' }}>Ajusta el tamaño de la letra y los colores para leer mucho mejor.</p>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6">
                <IonCard style={{ border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: 'none', height: '100%' }}>
                  <IonCardContent style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '50%' }}>
                      <IonIcon icon={helpCircleOutline} style={{ color: '#f57f17', fontSize: '32px' }} />
                    </div>
                    <div>
                      <h2 style={{ fontWeight: 'bold', color: '#111827', fontSize: '1.2rem', margin: '0 0 4px 0' }}>Ayuda</h2>
                      <p style={{ margin: 0, color: '#4b5563' }}>¿Tienes dudas? Mira videos tutoriales o habla con un asistente.</p>
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Inicio;