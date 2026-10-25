import React, { useState } from 'react';
import {
  IonButton, IonItem, IonLabel, IonSelect, IonSelectOption, IonToggle,
} from '@ionic/react';
import AdministracionLayout from '../components/AdministracionLayout';
import './VistasAdministrador.css';

const CLAVE_PREFERENCIAS = 'municipio-facil.admin-preferencias';

interface PreferenciasAdmin {
  avisos: boolean;
  densidad: 'comoda' | 'compacta';
}

function leerPreferencias(): PreferenciasAdmin {
  try {
    const guardadas = localStorage.getItem(CLAVE_PREFERENCIAS);
    if (guardadas) {
      const preferencias: unknown = JSON.parse(guardadas);
      if (typeof preferencias === 'object' && preferencias !== null) {
        const datos = preferencias as Record<string, unknown>;
        return {
          avisos: datos.avisos === true,
          densidad: datos.densidad === 'compacta' ? 'compacta' : 'comoda',
        };
      }
    }
  } catch {
    localStorage.removeItem(CLAVE_PREFERENCIAS);
  }
  return { avisos: true, densidad: 'comoda' };
}

const ConfiguracionAdministrador: React.FC = () => {
  const [preferencias, setPreferencias] = useState(leerPreferencias);
  const [guardado, setGuardado] = useState(false);

  const guardarPreferencias = () => {
    localStorage.setItem(CLAVE_PREFERENCIAS, JSON.stringify(preferencias));
    setGuardado(true);
  };

  return (
    <AdministracionLayout titulo="Configuración del sistema">
      <p className="admin-overline">PREFERENCIAS DE ESTA CUENTA</p>
      <h1 className="admin-page-title">Configuración del sistema</h1>
      <p className="admin-page-description">Estas opciones se guardan en este navegador y solo afectan a tu panel.</p>

      <section className="admin-section-card admin-settings-card">
        <IonItem>
          <IonLabel>
            <strong>Mostrar avisos del panel</strong>
            <p>Conserva visibles los mensajes informativos en las secciones administrativas.</p>
          </IonLabel>
          <IonToggle
            slot="end"
            checked={preferencias.avisos}
            onIonChange={(evento) => {
              setPreferencias((actual) => ({ ...actual, avisos: evento.detail.checked }));
              setGuardado(false);
            }}
            aria-label="Mostrar avisos del panel"
          />
        </IonItem>
        <IonItem>
          <IonLabel>
            <strong>Espaciado de las tablas</strong>
            <p>Elige cuánto espacio usar entre las filas de datos.</p>
          </IonLabel>
          <IonSelect
            slot="end"
            value={preferencias.densidad}
            onIonChange={(evento) => {
              setPreferencias((actual) => ({ ...actual, densidad: evento.detail.value }));
              setGuardado(false);
            }}
            aria-label="Espaciado de las tablas"
          >
            <IonSelectOption value="comoda">Cómodo</IonSelectOption>
            <IonSelectOption value="compacta">Compacto</IonSelectOption>
          </IonSelect>
        </IonItem>
        <div className="admin-modal-actions">
          {guardado && <span role="status" className="admin-save-confirmation">Preferencias guardadas.</span>}
          <IonButton onClick={guardarPreferencias}>Guardar preferencias</IonButton>
        </div>
      </section>
    </AdministracionLayout>
  );
};

export default ConfiguracionAdministrador;
