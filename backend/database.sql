-- Script de Creación de Base de Datos: Municipio Fácil
-- Compatible con PostgreSQL y MySQL

-- 1. Tabla de Roles (diferenciación ciudadana y administrativa)
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- 2. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    rol_id INT NOT NULL DEFAULT 1,
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- 3. Tabla de Módulos / Tutoriales de Capacitación (RF01, RF06)
CREATE TABLE IF NOT EXISTS modulos_tutoriales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NOT NULL,
    dificultad ENUM('Facil', 'Media', 'Alta') DEFAULT 'Facil',
    total_pasos INT NOT NULL DEFAULT 4,
    estado ENUM('Habilitado', 'Borrador', 'Deshabilitado') DEFAULT 'Habilitado',
    creado_por INT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_modulo_admin FOREIGN KEY (creado_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- 4. Tabla de Progreso y Métricas de Aprendizaje (RF05, RF07)
CREATE TABLE IF NOT EXISTS progreso_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    modulo_id INT NOT NULL,
    completado BOOLEAN DEFAULT FALSE,
    paso_actual INT DEFAULT 1,
    errores_cometidos INT DEFAULT 0,
    tiempo_segundos INT DEFAULT 0,
    actualizado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_progreso_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_progreso_modulo FOREIGN KEY (modulo_id) REFERENCES modulos_tutoriales(id) ON DELETE CASCADE
);

-- DATOS INICIALES Y DE PRUEBA (Exigidos para validar funcionamiento)
INSERT INTO roles (id, nombre, descripcion) VALUES
(1, 'ciudadano', 'Usuario aprendiz que accede a simuladores y capacitaciones'),
(2, 'admin', 'Funcionario municipal que administra contenidos y monitorea métricas')
ON DUPLICATE KEY UPDATE nombre=nombre;

-- Módulos formativos iniciales observados en los mockups
INSERT INTO modulos_tutoriales (id, titulo, descripcion, dificultad, total_pasos, estado) VALUES
(1, 'Solicitar Trámite', 'Aprende a ingresar al portal municipal y solicitar patentes sin errores.', 'Facil', 4, 'Habilitado'),
(2, 'Consultar estado de solicitud', 'Aprende a revisar los avances de tus documentos ingresados.', 'Facil', 3, 'Habilitado'),
(3, 'Descarga un certificado', 'Guía para descargar certificados de residencia y actas.', 'Media', 3, 'Habilitado'),
(4, 'Pagar servicios básicos', 'Simulador seguro para el pago en línea de derechos de aseo.', 'Alta', 4, 'Deshabilitado')
ON DUPLICATE KEY UPDATE titulo=titulo;