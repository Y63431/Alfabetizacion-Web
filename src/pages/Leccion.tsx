import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonBackButton, IonButton, IonButtons, IonContent, IonIcon, IonInput,
  IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar,
} from '@ionic/react';
import { alertCircleOutline, checkmarkCircleOutline, arrowForwardOutline } from 'ionicons/icons';
import './Leccion.css';

const Leccion: React.FC = () => {
  const { moduloId } = useParams<{ moduloId: string }>();
  const esConsulta = moduloId === 'consultar-solicitud';
  const tituloPractica = esConsulta ? 'Consultar una solicitud' : 'Solicitar un trámite municipal';

  const [paso, setPaso] = useState(0);
  const [mostrarErrores, setMostrarErrores] = useState(false);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoTramite, setTipoTramite] = useState('');

  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
  const errores = {
    nombre: nombre.trim().length === 0,
    correo: !correoValido,
    tipoTramite: tipoTramite.length === 0,
  };
  const hayErrores = Object.values(errores).some(Boolean);

  const revisarFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    setMostrarErrores(true);
    if (!hayErrores) setPaso(2);
  };

  const actualizarCampo = (actualizar: (valor: string) => void) => (valor: string) => {
    actualizar(valor);
    setMostrarErrores(false);
  };

  const descripcion = esConsulta
    ? 'Practica cómo consultar el avance de una solicitud. Usa únicamente la información ficticia de este ejercicio.'
    : 'Aprende a completar una solicitud municipal de ejemplo. La práctica es guiada y no envía información a ningún servicio real.';

  return (
    <IonPage>
      <IonToolbar color="light" className="practica-toolbar">
        <IonButtons slot="start">
          <IonBackButton defaultHref="/practicar" text="Prácticas" />
        </IonButtons>
        <IonTitle>Municipio Fácil</IonTitle>
        <IonButtons slot="end">
          <IonButton fill="outline" routerLink="/ayuda">Ayuda</IonButton>
        </IonButtons>
      </IonToolbar>

      <IonContent className="practica-content">
        <main className="practica-shell">
          <header className="practica-heading">
            <div>
              <p className="practica-eyebrow">TUTORIAL DE APRENDIZAJE</p>
              <h1>{tituloPractica}</h1>
            </div>
            <span className="practica-counter">Paso {paso + 1} de 3</span>
          </header>

          <nav className="practica-progress" aria-label="Progreso de la práctica">
            {['Acceso', 'Formulario', 'Finalización'].map((nombrePaso, indice) => (
              <div
                className={`practica-progress-item${indice <= paso ? ' practica-progress-item-active' : ''}`}
                key={nombrePaso}
                aria-current={indice === paso ? 'step' : undefined}
              >
                <span />
                <small>{nombrePaso}</small>
              </div>
            ))}
          </nav>

          <section className="practica-layout">
            <aside className="practica-instructions">
              {paso === 2 ? (
                <div className="practica-message practica-message-success">
                  <IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />
                  <div>
                    <h2>¡Felicitaciones!</h2>
                    <p>Completaste correctamente esta práctica. La solicitud es ficticia y no se envió.</p>
                  </div>
                </div>
              ) : mostrarErrores && hayErrores ? (
                <div className="practica-message practica-message-error" role="alert">
                  <IonIcon icon={alertCircleOutline} aria-hidden="true" />
                  <div>
                    <h2>Algo no está bien</h2>
                    <p>Revisa los campos marcados en rojo. Puedes corregirlos e intentarlo otra vez.</p>
                  </div>
                </div>
              ) : (
                <div className="practica-message practica-message-guide">
                  <div>
                    <h2>{paso === 0 ? 'Ingresa al portal del Municipio' : 'Ahora es tu turno, completa el formulario'}</h2>
                    <p>{paso === 0
                      ? descripcion
                      : 'Completa los datos de ejemplo. No escribas información personal real: este ejercicio solo sirve para practicar.'}</p>
                  </div>
                </div>
              )}

              {paso === 2 ? (
                <div className="practica-next-steps">
                  <strong>¿Qué aprendiste?</strong>
                  <p>Revisar los datos antes de continuar ayuda a completar trámites digitales correctamente.</p>
                </div>
              ) : (
                <div className="practica-tip">
                  <strong>Recuerda</strong>
                  <p>Esta práctica es solo educativa. No se registra ni se envía ningún trámite real.</p>
                </div>
              )}

              {paso > 0 && (
                <IonButton fill="outline" onClick={() => {
                  setPaso((actual) => Math.max(0, actual - 1));
                  setMostrarErrores(false);
                }}>
                  Atrás
                </IonButton>
              )}
            </aside>

            <div className="practica-simulation">
              {paso === 0 ? (
                <section className="practica-portal" aria-label="Portal municipal de práctica">
                  <div className="practica-portal-card">
                    <span className="practica-seal" aria-hidden="true">MF</span>
                    <h2>Acceso Ciudadano</h2>
                    <p>Portal de práctica de Municipio Fácil</p>
                    <IonButton expand="block" onClick={() => setPaso(1)}>
                      Ingresar <IonIcon slot="end" icon={arrowForwardOutline} />
                    </IonButton>
                    <small>Acceso de demostración. No uses una cuenta real.</small>
                  </div>
                </section>
              ) : paso === 1 ? (
                <form className="practica-form" onSubmit={revisarFormulario} noValidate>
                  <div className="practica-form-heading">
                    <p className="practica-eyebrow">FORMULARIO DE SIMULACIÓN</p>
                    <h2>{esConsulta ? 'Consulta de solicitud' : 'Solicitud de trámite'}</h2>
                    <p>Completa los campos para continuar.</p>
                  </div>

                  <IonItem className={`practica-field${mostrarErrores && errores.nombre ? ' practica-field-error' : ''}`}>
                    <IonLabel position="stacked">Nombre de ejemplo</IonLabel>
                    <IonInput
                      autocomplete="off"
                      value={nombre}
                      placeholder="Ej.: Persona de prueba"
                      onIonInput={(evento) => actualizarCampo(setNombre)(evento.detail.value ?? '')}
                      aria-invalid={mostrarErrores && errores.nombre}
                      aria-describedby={mostrarErrores && errores.nombre ? 'error-nombre' : undefined}
                    />
                  </IonItem>
                  {mostrarErrores && errores.nombre && <p className="practica-field-error-text" id="error-nombre">Escribe un nombre ficticio para practicar.</p>}

                  <IonItem className={`practica-field${mostrarErrores && errores.correo ? ' practica-field-error' : ''}`}>
                    <IonLabel position="stacked">Correo de ejemplo</IonLabel>
                    <IonInput
                      type="email"
                      autocomplete="off"
                      value={correo}
                      placeholder="persona@ejemplo.cl"
                      onIonInput={(evento) => actualizarCampo(setCorreo)(evento.detail.value ?? '')}
                      aria-invalid={mostrarErrores && errores.correo}
                      aria-describedby={mostrarErrores && errores.correo ? 'error-correo' : undefined}
                    />
                  </IonItem>
                  {mostrarErrores && errores.correo && <p className="practica-field-error-text" id="error-correo">Escribe un correo ficticio con formato válido.</p>}

                  <IonItem className={`practica-field${mostrarErrores && errores.tipoTramite ? ' practica-field-error' : ''}`}>
                    <IonLabel position="stacked">Tipo de trámite</IonLabel>
                    <IonSelect
                      value={tipoTramite}
                      placeholder="Selecciona una opción"
                      onIonChange={(evento) => actualizarCampo(setTipoTramite)(evento.detail.value ?? '')}
                      aria-label="Tipo de trámite"
                      aria-invalid={mostrarErrores && errores.tipoTramite}
                    >
                      <IonSelectOption value="certificado">Certificado municipal</IonSelectOption>
                      <IonSelectOption value="hora">Reserva de hora</IonSelectOption>
                      <IonSelectOption value="aseo">Servicio de aseo</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                  {mostrarErrores && errores.tipoTramite && <p className="practica-field-error-text">Selecciona un tipo de trámite.</p>}

                  <div className="practica-form-actions">
                    <IonButton type="submit">Enviar simulación</IonButton>
                  </div>
                </form>
              ) : (
                <section className="practica-completion">
                  <IonIcon icon={checkmarkCircleOutline} aria-hidden="true" />
                  <h2>Práctica completada</h2>
                  <p>Ya sabes cómo revisar y completar un formulario municipal de manera guiada.</p>
                  <IonButton routerLink="/practicar">Volver a las prácticas</IonButton>
                </section>
              )}
            </div>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Leccion;