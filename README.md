# App de Alfabetización Digital Ciudadana

## Integrantes del Equipo
* [Alexis Parra](link Github)
* [Fernando Pacheco](link Github)
* [Gabriel Diaz](link Github)
* [Israel Pérez](https://github.com/Y63431)

---

## 1. Justificación del Problema y Usuarios Objetivo (EP 1.2)

### Contexto y Relevancia del Problema
A nivel comunal, el proceso de digitalización municipal ha trasladado trámites esenciales a plataformas en línea. No obstante, esto evidencia la brecha descrita en el **Problema 25: Baja Alfabetización Digital en la Población**, donde segmentos significativos (particularmente adultos mayores y ciudadanos con nula instrucción digital) carecen de las competencias prácticas para utilizar estos sistemas. Las consecuencias directas abarcan exclusión social, dependencia de intermediarios, retrasos en solicitudes críticas (como patentes, permisos o ayudas sociales) e incluso el retraso del proceso de digitalización para acomodar a este sector.

### Caracterización y Perfiles de Usuario (Proto-Personas)

#### Proto-Persona 1: Usuario Aprendiz
* **Tipo de usuario / rol:** Ciudadano - Adulto Mayor (Usuario final).
* **Características generales:** 68 años, jubilado, cuenta con un smartphone básico con conexión a internet móvil limitada.
* **Necesidades principales:** Aprender a solicitar horas médicas y certificados municipales sin depender de terceros.
* **Objetivos de uso:** Perder el temor a equivocarse y comprender la simbología de los formularios web.
* **Dificultades y puntos de frustración:** Letra pequeña, botones poco reconocibles, miedo a cometer errores irreversibles o sufrir fraudes, y términos técnicos complejos.
* **Funcionalidades que utilizaría:** Simulador de ingreso de formularios, tutorial con modo guiado por voz/audio y ejercicios de prueba paso a paso con reintentos infinitos.
* **Dispositivo y contexto:** Smartphone Android de gama de entrada, acceso desde el hogar con letra configurada en tamaño grande.

#### Proto-Persona 2: Coordinador de Capacitación
* **Tipo de usuario / rol:** Funcionario / Administrador del sistema.
* **Características generales:** 34 años, asistente social o funcionario del área de desarrollo comunitario de la municipalidad, nivel intermedio-alto de alfabetización digital.
* **Necesidades principales:** Diseñar simulaciones acordes a los trámites vigentes del municipio y evaluar qué pasos generan mayor dificultad en la población.
* **Objetivos de uso:** Disminuir la saturación de atención presencial capacitando virtualmente a los usuarios.
* **Dificultades y puntos de frustración:** Falta de herramientas didácticas para enseñar a personas mayores y baja disponibilidad de métricas claras de aprendizaje.
* **Funcionalidades que utilizaría:** Panel de gestión de módulos formativos, editor de preguntas/pasos de simulación y métricas de finalización.
* **Dispositivo y contexto:** Computador de escritorio o notebook municipal vía navegador web.

---

## 2. Requerimientos del Sistema (EP 1.1)

### Requerimientos Funcionales (RF)
* **RF01 - Catálogo de Trámites Simulados (Usuario):** El sistema debe listar los módulos interactivos de trámites municipales disponibles (ej. reserva de horas, solicitud de certificados, pago de aseo) con indicadores visuales de nivel de dificultad.
* **RF02 - Simulador Guiado de Formularios (Usuario):** El sistema debe permitir al usuario completar campos de formularios paso a paso dentro de un entorno de prueba controlado, validando entradas y destacando el siguiente elemento a interactuar mediante señales visuales.
* **RF03 - Asistente de Lectura y Ayuda Contextual (Usuario):** El sistema debe ofrecer la opción de activar lectura en audio de los textos e instrucciones de cada pantalla y campo de entrada.
* **RF04 - Retroalimentación Inmediata de Errores (Usuario):** El sistema debe entregar mensajes de corrección claros y libres de tecnicismos cuando el usuario cometa una equivocación durante la simulación, permitiendo reintentos ilimitados.
* **RF05 - Historial y Progreso Formativo (Usuario):** El sistema debe registrar y desplegar los módulos completados con éxito por el usuario y los logros obtenidos de forma gráfica y simplificada.
* **RF06 - Gestión de Módulos y Simuladores (Admin):** El sistema debe permitir al administrador crear, modificar y deshabilitar módulos de capacitación y trámites simulados.
* **RF07 - Métricas de Errores y Usabilidad (Admin):** El sistema debe generar reportes agregados que indiquen qué pasos de los simuladores presentan la mayor tasa de fallos o abandono.

### Requerimientos No Funcionales (RNF)
* **RNF01 - Usabilidad y Accesibilidad:** La interfaz debe cumplir con criterios de contraste accesible (WCAG AA), tipografía escalable con un tamaño base no inferior a 16px y áreas táctiles de botones de al menos 48x48px.
* **RNF02 - Rendimiento:** Las vistas y recursos iniciales deben cargar en un tiempo inferior a 2.5 segundos bajo redes móviles estándar (3G/4G).
* **RNF03 - Diseño Adaptable (Responsividad):** La interfaz debe ajustarse sin pérdida de consistencia funcional entre pantallas móviles (desde 360px de ancho) y navegadores web de escritorio.
* **RNF04 - Seguridad y Privacidad de Datos:** El simulador no debe almacenar datos sensibles o información personal real (como RUT, cuentas bancarias o claves) ingresados durante los ejercicios formativos.
* **RNF05 - Compatibilidad Multiplataforma:** La aplicación frontend debe ser ejecutable sin discrepancias visuales tanto en navegadores modernos (Chrome, Firefox, Safari) como empaquetada para dispositivos móviles mediante Capacitor.

---

## 3. Instrucciones de Instalación y Ejecución

```bash
# Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd Web-Alfabetizacion

# Instalar dependencias
npm install

# Ejecutar el servidor local de desarrollo
npx @ionic/cli serve

### Fuentes Secundarias Consultadas
* Diagnóstico "Desafíos Públicos Locales - CTD Litoral Santo Domingo" (Problema 25: Habilidades digitales e interacción municipal)
* Estudio [*La madurez digital en municipalidades chilenas: avances y desafíos*](https://ww2.movistar.cl/empresas/comunidad/madurez-digital-en-municipalidades-chilenas/)
