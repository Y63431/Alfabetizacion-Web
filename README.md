# App de Alfabetización Digital Ciudadana

## Integrantes del Equipo
* [Alexis Parra](https://github.com/AlexisEstebanParraS)
* [Fernando Pacheco](https://github.com/F3rsj)
* [Gabriel Díaz](https://github.com/Gabread)
* [Israel Pérez](https://github.com/Y63431)

---
# Municipio Fácil - Backend API

API REST del proyecto **Municipio Fácil**, desarrollado para la asignatura Ingeniería Web y Móvil.

## Descripción General

API que gestiona usuarios, módulos de práctica de trámites municipales y el progreso de cada ciudadano, y entrega métricas al administrador.

* **Ciudadano:** realiza los módulos y ve solo su progreso.
* **Administrador:** gestiona módulos y usuarios y revisa métricas.

## Problema y Objetivos

**Problema:** muchas personas, en especial adultos mayores, no saben usar los portales municipales y dependen de la atención presencial.

**Objetivo general:** entregar un servidor seguro para una plataforma de práctica de trámites con seguimiento del aprendizaje.

**Objetivos específicos:**
* Registro y autenticación con JWT y bcrypt.
* Permisos distintos para ciudadano y administrador.
* CRUD de módulos.
* Registro de progreso, errores y tiempo.
* Métricas de error y abandono.

## Funcionalidades Principales

* Registro e inicio de sesión con validación.
* Catálogo de módulos con filtros por estado y dificultad.
* CRUD de módulos (administrador).
* Progreso por usuario: paso actual, errores, tiempo y completado.
* Gestión de usuarios y métricas (administrador).
* Perfil del usuario.
* Correo de bienvenida (Resend).

## Tecnologías y Herramientas

* **Node.js** 18+ y **Express** 5
* **PostgreSQL** con `pg`
* **jsonwebtoken** y **bcrypt**
* **cors**, **helmet** y **express-rate-limit**
* **dotenv**
* **Insomnia**
* **Docker** y **Docker Compose**

## Requisitos Previos

* **Node.js** (v18 o superior)
* **PostgreSQL** (servicio activo)
* **Git**

## Instalación y Configuración

### 1. Clonar el repositorio

```
git clone https://github.com/Y63431/Alfabetizacion-Web.git
cd Alfabetizacion-Web
git checkout backend
```

### 2. Instalar dependencias

```
npm install
```

### 3. Configurar variables de entorno

```
cp .env.example .env
```

| Variable | Descripción |
|---|---|
| `PORT` | Puerto del servidor (`3000`) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Conexión a PostgreSQL |
| `JWT_SECRET` | Clave para firmar tokens (obligatoria) |
| `JWT_EXPIRES_IN` | Duración del token (`2h`) |
| `FRONTEND_ORIGIN` | Origen permitido por CORS |
| `RESEND_API_KEY`, `CORREO_REMITENTE` | Correo de bienvenida (opcional) |
| `ADMIN_NOMBRE`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Datos del primer administrador |

### 4. Inicializar la Base de Datos

```
psql -U postgres -f database.sql
```

### 5. Crear el administrador

```
npm run crear-admin
```

### 6. Iniciar el servidor

```
npm run dev
```

El servidor estará escuchando peticiones en `http://localhost:3000/api`.

## Flujo de Trabajo Simultáneo (Frontend + Backend)

1. **Crea el Worktree para el Frontend:**

   ```
   git worktree add ../frontend-app frontend
   ```

2. **Levanta el servidor (Backend):**

   ```
   npm run dev
   ```

3. **Levanta la interfaz (Frontend):**

   ```
   cd ../frontend-app
   npm install
   npm run dev
   ```

## Base de Datos

```mermaid
erDiagram
    roles ||--o{ usuarios : "tiene"
    usuarios ||--o{ progreso_usuarios : "registra"
    modulos_tutoriales ||--o{ progreso_usuarios : "es cursado en"
    usuarios ||--o{ modulos_tutoriales : "crea (admin)"

    roles {
        int id PK
        varchar nombre UK
        varchar descripcion
    }
    usuarios {
        int id PK
        varchar nombre
        varchar email UK
        varchar password_hash
        varchar telefono
        int rol_id FK
        boolean activo
        timestamp creado_en
    }
    modulos_tutoriales {
        int id PK
        varchar titulo
        text descripcion
        varchar dificultad
        int total_pasos
        varchar estado
        int creado_por FK
        timestamp creado_en
    }
    progreso_usuarios {
        int id PK
        int usuario_id FK
        int modulo_id FK
        boolean completado
        int paso_actual
        int errores_cometidos
        int tiempo_segundos
        timestamp actualizado_en
    }
```

* `usuarios.email` y `roles.nombre` son únicos.
* `dificultad`: `Facil`, `Media` o `Alta`. `estado`: `Habilitado`, `Borrador` o `Deshabilitado`.
* `UNIQUE (usuario_id, modulo_id)` en `progreso_usuarios`.
* `ON DELETE CASCADE` en el progreso, `RESTRICT` en `usuarios.rol_id` y `SET NULL` en `creado_por`.

## Endpoints de la API

URL base: `http://localhost:3000/api`. Las rutas protegidas usan `Authorization: Bearer <TOKEN>`.

```json
{ "ok": true, "message": "Módulo creado", "data": { } }
{ "ok": false, "error": { "mensaje": "Datos inválidos", "detalles": ["titulo es obligatorio"] } }
```

| Método | Ruta | Acceso | Descripción |
|---|---|---|---|
| GET | `/health` | Público | Estado del servidor y de la base de datos |
| POST | `/auth/registro` | Público | Registrar ciudadano |
| POST | `/auth/login` | Público | Iniciar sesión |
| GET | `/modulos` | Autenticado | Listar módulos (`estado`, `dificultad`, `page`, `limit`) |
| GET | `/modulos/:id` | Autenticado | Obtener un módulo |
| POST | `/modulos` | Admin | Crear módulo |
| PUT | `/modulos/:id` | Admin | Reemplazar módulo |
| PATCH | `/modulos/:id` | Admin | Modificar campos de un módulo |
| DELETE | `/modulos/:id` | Admin | Eliminar módulo |
| GET | `/progreso` | Autenticado | Listar progreso (propio, o todos si es admin) |
| GET | `/progreso/:id` | Dueño o admin | Obtener un progreso |
| POST | `/progreso` | Autenticado | Iniciar un módulo |
| PATCH | `/progreso/:id` | Dueño o admin | Actualizar avance |
| DELETE | `/progreso/:id` | Dueño o admin | Eliminar progreso |
| GET | `/admin/usuarios` | Admin | Listar usuarios (`page`, `limit`) |
| PATCH | `/admin/usuarios/:id` | Admin | Activar/desactivar cuenta o cambiar rol |
| GET | `/admin/metricas` | Admin | Métricas de aprendizaje |
| GET | `/usuarios/me` | Autenticado | Ver mi perfil |
| PUT | `/usuarios/me` | Autenticado | Actualizar nombre y teléfono |

| Código | Significado |
|---|---|
| 200 / 201 | Operación exitosa / recurso creado |
| 400 | Datos inválidos o campos no permitidos |
| 401 | Sin token, token inválido o credenciales incorrectas |
| 403 | Sin permiso |
| 404 | No existe |
| 409 | Valor duplicado |
| 429 | Demasiados intentos de inicio de sesión |
| 500 | Error interno |
| 503 | La base de datos no responde |

## Autenticación y Roles

* El token JWT contiene `{ id, email, rol_id }` y expira según `JWT_EXPIRES_IN`.
* `verificarToken` valida el token y `esAdmin` exige `rol_id = 2`.
* Todo registro crea un ciudadano; el administrador se crea con `npm run crear-admin`.

| Recurso | Sin token | Ciudadano | Admin |
|---|---|---|---|
| Registro / login | Sí | Sí | Sí |
| Ver módulos | No | Solo `Habilitado` | Todos |
| Crear, editar, borrar módulos | No | No | Sí |
| Progreso | No | Solo el suyo | Todos |
| Usuarios y métricas | No | No | Sí |
| Mi perfil | No | Sí | Sí |

## Seguridad

| Medida | Implementación |
|---|---|
| Contraseñas | bcrypt (10 rondas); el hash no se devuelve |
| Inyección SQL | Consultas parametrizadas (`$1, $2`) |
| Validación | Solo campos permitidos; tipos y largos revisados |
| XSS | Nombre, título y descripción rechazan `<` y `>` |
| Credenciales | Secretos en `.env`, fuera del repositorio |
| Autenticación | JWT con expiración |
| Autorización | Por rol y por dueño del progreso |
| CORS | Solo `FRONTEND_ORIGIN` |
| Fuerza bruta | 10 intentos de login por IP cada 15 minutos |
| Cabeceras | `helmet` |

## Servicio Externo

Correo de bienvenida al registrarse, enviado con la API de [Resend](https://resend.com) (`src/services/correo_service.js`). Si `RESEND_API_KEY` está vacía no se envía.

## Despliegue con Docker

`docker-compose.yml` levanta **db** (PostgreSQL 16), **api** (este backend) y **web** (frontend con Nginx):

```
git worktree add ../frontend-app frontend
docker compose up --build -d
docker compose exec api npm run crear-admin
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:8080 |
| API | http://localhost:3000/api |

## Pruebas de Endpoints con Insomnia

Colección: [`docs/insomnia_collection.json`](docs/insomnia_collection.json) (35 peticiones). Se importa en Insomnia con *Import*.

| # | Prueba | Resultado |
|---|---|---|
| 1 | Registro válido | 201 + token |
| 2 | Email repetido | 409 |
| 3 | Contraseña débil | 400 |
| 4 | HTML en el nombre | 400 |
| 5 | Login correcto | 200 + token |
| 6 | Contraseña incorrecta | 401 |
| 7 | Más de 10 logins en 15 min | 429 |
| 8 | `GET /modulos` sin token | 401 |
| 9 | `GET /modulos` como ciudadano | 200, solo `Habilitado` |
| 10 | `GET /modulos?estado=Raro` | 400 |
| 11 | `POST /modulos` como ciudadano | 403 |
| 12 | `POST /modulos` como admin | 201 |
| 13 | `DELETE /modulos/:id` como admin | 200 |
| 14 | `POST /progreso` | 201 |
| 15 | `POST /progreso` con `usuario_id` | 400 |
| 16 | `POST /progreso` repetido | 409 |
| 17 | `paso_actual` mayor al total | 400 |
| 18 | Progreso de otro ciudadano | 403 |
| 19 | `GET /admin/usuarios` como ciudadano | 403 |
| 20 | Cuenta desactivada intenta login | 401 |
| 21 | `PUT /usuarios/me` con datos inválidos | 400 |

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
