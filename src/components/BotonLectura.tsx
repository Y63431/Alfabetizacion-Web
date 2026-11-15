import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon } from '@ionic/react';
import { stopCircleOutline, volumeMediumOutline } from 'ionicons/icons';

interface BotonLecturaProps {
  texto: string;
  fill?: 'clear' | 'outline' | 'solid';
  soloIconoEnMovil?: boolean;
}

// Velocidad de lectura (1 = normal)
const VELOCIDAD_LECTURA = 0.9;

/** Botón para leer un texto en voz alta (RF03). */
const BotonLectura: React.FC<BotonLecturaProps> = ({ texto, fill = 'outline', soloIconoEnMovil = false }) => {
  const [leyendo, setLeyendo] = useState(false);
  const disponible = typeof window !== 'undefined' && 'speechSynthesis' in window;

  // Al salir de la pantalla se detiene la lectura
  useEffect(() => () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
  }, []);

  if (!disponible) return null;

  const leer = () => {
    window.speechSynthesis.cancel(); // si ya estaba leyendo algo, empieza de nuevo
    const enunciado = new SpeechSynthesisUtterance(texto);
    enunciado.lang = 'es-CL';
    enunciado.rate = VELOCIDAD_LECTURA;
    enunciado.onend = () => setLeyendo(false);
    enunciado.onerror = () => setLeyendo(false);
    setLeyendo(true);
    window.speechSynthesis.speak(enunciado);
  };

  const detener = () => {
    window.speechSynthesis.cancel();
    setLeyendo(false);
  };

  return (
    <IonButton
      fill={fill}
      className={soloIconoEnMovil ? 'solo-icono-movil' : undefined}
      onClick={leyendo ? detener : leer}
      aria-label={leyendo ? 'Detener la lectura en voz alta' : 'Escuchar estas instrucciones en voz alta'}
    >
      <IonIcon slot="start" icon={leyendo ? stopCircleOutline : volumeMediumOutline} aria-hidden="true" />
      <span className="boton-texto">{leyendo ? 'Detener' : 'Escuchar'}</span>
    </IonButton>
  );
};

export default BotonLectura;
