import Home from './pages/Home';
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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

/* Páginas */
import Bienvenida from './pages/Bienvenida';
import Login from './pages/Login';
import Registro from './pages/Registro';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/bienvenida" element={<Bienvenida />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/bienvenida" replace />} />
        <Route path="/registro" element={<Registro />} />
        
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;