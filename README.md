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
