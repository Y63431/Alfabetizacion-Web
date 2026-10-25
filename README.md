# App de Alfabetización Digital Ciudadana

## Integrantes del Equipo
* [Alexis Parra](https://github.com/AlexisEstebanParraS)
* [Fernando Pacheco](https://github.com/F3rsj)
* [Gabriel Díaz](https://github.com/Gabread)
* [Israel Pérez](https://github.com/Y63431)

---
# Municipio Fácil - Backend API

Bienvenido al repositorio del backend del proyecto **Municipio Fácil**, desarrollado para la asignatura Ingeniería Web y Móvil.

> ** IMPORTANTE - ARQUITECTURA DE RAMAS (Criterio 3.2):**
> Este código se encuentra estrictamente aislado en la rama `backend`. Contiene únicamente la lógica del servidor (Node.js/Express) y la base de datos (PostgreSQL). 

## Requisitos Previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas en tu sistema:

* **Node.js** (v18 o superior)

* **PostgreSQL** (Servicio activo y corriendo)

* **Git**

## Instalación y Configuración

### 1. Clonar el repositorio

Asegúrate de clonar el proyecto y situarte exclusivamente en la rama del servidor:

```
git clone <https://github.com/Y63431/Alfabetizacion-Web.git>
cd <Alfabetizacion-Web>
git checkout backend

```

### 2. Instalar dependencias

Instala los paquetes necesarios para Node.js (Express, pg, bcrypt, jsonwebtoken, etc.):

```
npm install

```

### 3. Configurar variables de entorno

El proyecto requiere credenciales seguras que no deben subirse a GitHub.

1. Copia el archivo de ejemplo:

   ```
   cp .env.example .env
   
   ```

2. Edita el archivo `.env` recién creado con tus credenciales locales de PostgreSQL (`DB_USER`, `DB_PASSWORD`, etc.) y define una clave secreta larga y segura para `JWT_SECRET`.

### 4. Inicializar la Base de Datos

Asegúrate de tener el motor de PostgreSQL en ejecución. Luego, crea la base de datos e inyecta la estructura de tablas, roles y datos de prueba ejecutando el script SQL incluido:

```
psql -U postgres -d municipio-facil -f database.sql

```

*(Nota: El script creará un SuperAdministrador por defecto. Si prefieres probar el flujo completo, puedes registrar un ciudadano desde el frontend y luego actualizar su `rol_id = 2` directamente en la base de datos).*

### 5. Iniciar el servidor

Para levantar la API en modo de desarrollo (con recarga automática mediante nodemon o node --watch):

```
npm run dev

```

El servidor estará escuchando peticiones en `http://localhost:3000/api`.

## Flujo de Trabajo Simultáneo (Frontend + Backend)

Para cumplir de forma estricta con la separación de ramas exigida en el proyecto y poder probar la aplicación completa sin mezclar código, **utilizamos `git worktree`**. Esto permite tener el Backend y el Frontend corriendo al mismo tiempo en carpetas separadas, pero conectadas al mismo repositorio.

Sigue estos pasos para levantar ambos entornos:

1. **Crea el Worktree para el Frontend:**
   Estando en tu terminal (dentro de esta carpeta del backend), ejecuta el siguiente comando. Esto creará una carpeta hermana llamada `frontend-app` y le asignará tu rama `frontend`:

   ```
   git worktree add ../frontend-app frontend
   
   ```

2. **Levanta el servidor (Backend):**
   En tu terminal actual, inicia la API:

   ```
   npm run dev
   
   ```

3. **Levanta la interfaz (Frontend):**
   Abre una **nueva pestaña** en tu terminal, dirígete a la nueva carpeta creada, instala las dependencias e inicia Ionic:

   ```
   cd ../frontend-app
   npm install
   npx @ionic/cli serve
   
   ```

### Pruebas de Endpoints con Insomnia:
<img width="1436" height="817" alt="Captura de pantalla 2026-10-16 160018" src="https://github.com/user-attachments/assets/48c14748-1585-4c7c-a1b8-207b13e06f4c" />
<img width="1442" height="821" alt="Captura de pantalla 2026-10-16 160218" src="https://github.com/user-attachments/assets/b88efa7b-fb6d-484b-beeb-587b83be53d2" />
<img width="1437" height="857" alt="Captura de pantalla 2026-10-16 160605" src="https://github.com/user-attachments/assets/8b61a2db-d4fb-444f-b579-b6f75719184b" />
<img width="1437" height="861" alt="Captura de pantalla 2026-10-16 161341" src="https://github.com/user-attachments/assets/44052335-057f-459c-b81c-497c22f595e9" />
<img width="1179" height="677" alt="Captura de pantalla 2026-10-25 180157" src="https://github.com/user-attachments/assets/4e3243e2-df46-4b8a-a407-110e1058f026" />
<img width="1186" height="685" alt="Captura de pantalla 2026-10-25 180217" src="https://github.com/user-attachments/assets/9b0da504-0c42-4ef4-9e4f-b9fa5dce3168" />
<img width="1180" height="679" alt="Captura de pantalla 2026-10-25 181700" src="https://github.com/user-attachments/assets/2484740d-e911-4c4e-a31c-1ab7ec0ed073" />
<img width="1183" height="684" alt="Captura de pantalla 2026-10-25 181722" src="https://github.com/user-attachments/assets/bc890459-4561-4527-87c8-75efcd317c0e" />
<img width="1186" height="708" alt="Captura de pantalla 2026-10-25 180547" src="https://github.com/user-attachments/assets/0a167dbd-00d9-48df-b370-2e3fb25bfd4e" />
<img width="1186" height="676" alt="Captura de pantalla 2026-10-25 181452" src="https://github.com/user-attachments/assets/69fe217a-9913-4a54-9169-fac724175d32" />
<img width="1185" height="675" alt="Captura de pantalla 2026-10-25 194111" src="https://github.com/user-attachments/assets/b3ad2f37-902b-4e7e-9775-dfb474f5072a" />
<img width="1182" height="681" alt="Captura de pantalla 2026-10-25 194126" src="https://github.com/user-attachments/assets/85ec6133-e713-490e-be73-4ba3c30baef5" />
