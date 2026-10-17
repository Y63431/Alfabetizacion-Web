import React, { JSX } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Estilos de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

/* Páginas y Componentes */
import MenuLateral from './components/MenuLateral';
import Bienvenida from './pages/Bienvenida';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';

setupIonicReact();

// 1. Componente Guardia: Verifica el JWT en el navegador
const RutaProtegida = ({ children }: { children: React.JSX.Element }) => {
  const token = localStorage.getItem('token');
  
  // Si no hay token, bloqueamos el acceso y redirigimos al login
  if (!token) {
    return <Navigate to="/iniciar-sesion" replace />;
  }
  
  // Si hay token, permitimos renderizar la pantalla solicitada
  return children;
};

// 2. Subcomponente para usar las herramientas de React Router
const AppRouter: React.FC = () => {
  const location = useLocation();
  
  // Definimos las rutas donde NO debe aparecer el menú lateral
  const rutasPublicas = ['/bienvenida', '/iniciar-sesion', '/registro', '/'];
  const mostrarMenu = !rutasPublicas.includes(location.pathname);

  return (
    <IonSplitPane contentId="main-content">
      {/* El menú solo existe si mostrarMenu es true */}
      {mostrarMenu && <MenuLateral />}
      
      <IonRouterOutlet id="main-content">
        {/* Rutas Públicas */}
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* 3. Ruta Protegida: Envolvemos el componente Inicio con nuestro Guardia */}
        <Route 
          path="/inicio" 
          element={
            <RutaProtegida>
              <Inicio />
            </RutaProtegida>
          } 
        />
        
        <Route path="/" element={<Navigate to="/bienvenida" replace />} />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppRouter />
    </IonReactRouter>
  </IonApp>
);

export default App;