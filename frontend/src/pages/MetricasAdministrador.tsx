import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';
import AdministracionLayout from '../components/AdministracionLayout';
import { obtenerMetricas, type MetricasAdministracion } from '../services/administracion';
import './VistasAdministrador.css';

const MetricasAdministrador: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricasAdministracion | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargarMetricas = async () => {
    setCargando(true);
    setError('');
    try {
      setMetricas(await obtenerMetricas());
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : 'No se pudieron cargar las métricas.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    void cargarMetricas();
  }, []);

  return (
    <AdministracionLayout titulo="Reportes y estadísticas">
      <div className="admin-page-heading-row">
        <div>
          <p className="admin-overline">ACTIVIDAD DE APRENDIZAJE</p>
          <h1 className="admin-page-title">Métricas de tutoriales</h1>
          <p className="admin-page-description">Resumen calculado a partir de las sesiones guardadas en el sistema.</p>
        </div>
        <IonButton fill="outline" onClick={() => void cargarMetricas()} disabled={cargando}>
          <IonIcon slot="start" icon={refreshOutline} />
          Actualizar
        </IonButton>
      </div>

      {error && <div className="admin-alert" role="alert">{error}</div>}
      {cargando ? (
        <div className="admin-loading"><IonSpinner name="crescent" /> Cargando métricas…</div>
      ) : metricas ? (
        <>
          <section className="admin-metric-grid" aria-label="Indicadores principales">
            <MetricCard titulo="Tasa de error" valor={`${metricas.resumen.tasa_error}%`} nota="Sesiones con errores" />
            <MetricCard titulo="Tasa de abandono" valor={`${metricas.resumen.tasa_abandono}%`} nota="Sesiones no completadas" />
            <MetricCard titulo="Tiempo promedio" valor={formatearTiempo(metricas.resumen.tiempo_promedio)} nota="Por sesión con duración registrada" />
            <MetricCard titulo="Sesiones" valor={metricas.resumen.sesiones.toLocaleString('es-CL')} nota={`${metricas.resumen.usuarios} usuarios ciudadanos`} />
          </section>

          <section className="admin-metric-columns">
            <div className="admin-section-card admin-chart-card">
              <h2>Pasos con más dificultades</h2>
              <p className="admin-card-subtitle">Porcentaje de sesiones con errores por tutorial.</p>
              {metricas.modulos.length ? metricas.modulos.map((modulo) => (
                <div className="admin-bar-row" key={modulo.id}>
                  <div className="admin-bar-label">
                    <span>{modulo.titulo}</span><strong>{modulo.tasa_error}%</strong>
                  </div>
                  <div className="admin-bar-track">
                    <span style={{ width: `${Math.min(modulo.tasa_error, 100)}%` }} />
                  </div>
                </div>
              )) : <p className="admin-empty-text">Aún no hay sesiones para calcular esta métrica.</p>}
            </div>

            <div className="admin-section-card admin-chart-card">
              <h2>Abandonos por tutorial</h2>
              <p className="admin-card-subtitle">Prácticas iniciadas que todavía no se completan.</p>
              {metricas.abandonos.length ? (
                <ul className="admin-abandon-list">
                  {metricas.abandonos.map((item) => (
                    <li key={item.titulo}><span>{item.titulo}</span><strong>{item.abandonos}</strong></li>
                  ))}
                </ul>
              ) : <p className="admin-empty-text">No se registran abandonos.</p>}
            </div>
          </section>
        </>
      ) : null}
    </AdministracionLayout>
  );
};

const MetricCard: React.FC<{ titulo: string; valor: string; nota: string }> = ({ titulo, valor, nota }) => (
  <div className="admin-section-card admin-metric-card">
    <p>{titulo}</p>
    <strong>{valor}</strong>
    <small>{nota}</small>
  </div>
);

function formatearTiempo(segundos: number): string {
  if (segundos < 60) return `${segundos} s`;
  const minutos = Math.floor(segundos / 60);
  const restoSegundos = segundos % 60;
  return restoSegundos ? `${minutos} min ${restoSegundos} s` : `${minutos} min`;
}

export default MetricasAdministrador;
