import React from 'react';
import { IonToast } from '@ionic/react';
import { alertCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

export interface MensajeAviso {
  texto: string;
  tipo: 'exito' | 'error';
}

interface AvisoProps {
  aviso: MensajeAviso | null;
  alCerrar: () => void;
}

/** Notificación breve (IonToast). Con null se oculta. */
const Aviso: React.FC<AvisoProps> = ({ aviso, alCerrar }) => {
  const esError = aviso?.tipo === 'error';
  return (
    <IonToast
      isOpen={aviso !== null}
      message={aviso?.texto}
      color={esError ? 'danger' : 'success'}
      icon={esError ? alertCircleOutline : checkmarkCircleOutline}
      duration={esError ? 5000 : 3000}
      position="top"
      buttons={[{ text: 'Cerrar', role: 'cancel' }]}
      onDidDismiss={alCerrar}
    />
  );
};

export default Aviso;
