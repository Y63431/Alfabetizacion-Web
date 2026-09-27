import Home from './pages/Home';
import React from 'react';
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

// 1. Creamos un subcomponente para usar las herramientas de React Router
const AppRouter: React.FC = () => {
  const location = useLocation();
  
  // 2. Definimos las rutas donde NO debe aparecer el menú
  const rutasPublicas = ['/bienvenida', '/iniciar-sesion', '/registro', '/'];
  const mostrarMenu = !rutasPublicas.includes(location.pathname);

  return (
    <IonSplitPane contentId="main-content">
      {/* 3. Renderizado condicional: el menú solo existe si mostrarMenu es true */}
      {mostrarMenu && <MenuLateral />}
      
      <IonRouterOutlet id="main-content">
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/inicio" element={<Inicio />} />
        
        <Route path="/" element={<Navigate to="/bienvenida" replace />} />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

// 4. El componente principal solo envuelve la aplicación
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <AppRouter />
    </IonReactRouter>
  </IonApp>
);

export default App;