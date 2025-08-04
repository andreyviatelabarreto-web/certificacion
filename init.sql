-- Crear base de datos
CREATE DATABASE IF NOT EXISTS certificaciones_db;
USE certificaciones_db;

-- Tabla de categorías de certificaciones
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de certificaciones
CREATE TABLE certificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion_meses INT DEFAULT 12,
    categoria_id INT,
    imagen_url VARCHAR(255),
    proveedor VARCHAR(100),
    nivel ENUM('Básico', 'Intermedio', 'Avanzado', 'Experto') DEFAULT 'Básico',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);

-- Tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    pais VARCHAR(50),
    ciudad VARCHAR(50),
    fecha_nacimiento DATE,
    rol ENUM('cliente', 'admin') DEFAULT 'cliente',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    estado ENUM('pendiente', 'pagado', 'completado', 'cancelado') DEFAULT 'pendiente',
    metodo_pago VARCHAR(50),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de detalles de pedidos
CREATE TABLE detalles_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pedido_id INT NOT NULL,
    certificacion_id INT NOT NULL,
    cantidad INT DEFAULT 1,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id) ON DELETE CASCADE
);

-- Tabla de certificaciones de usuarios (certificaciones obtenidas)
CREATE TABLE certificaciones_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    certificacion_id INT NOT NULL,
    pedido_id INT NOT NULL,
    codigo_certificacion VARCHAR(100) UNIQUE NOT NULL,
    fecha_obtencion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_expiracion DATE,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
);

-- Insertar datos de ejemplo
INSERT INTO categorias (nombre, descripcion, imagen_url) VALUES
('Tecnología', 'Certificaciones en tecnología y programación', 'https://example.com/tech.jpg'),
('Marketing Digital', 'Certificaciones en marketing y publicidad digital', 'https://example.com/marketing.jpg'),
('Gestión de Proyectos', 'Certificaciones en metodologías de gestión de proyectos', 'https://example.com/project.jpg'),
('Ciberseguridad', 'Certificaciones en seguridad informática', 'https://example.com/security.jpg');

INSERT INTO certificaciones (nombre, descripcion, precio, categoria_id, proveedor, nivel) VALUES
('AWS Certified Solutions Architect', 'Certificación para arquitectos de soluciones en AWS', 150.00, 1, 'Amazon Web Services', 'Intermedio'),
('Google Analytics Certified', 'Certificación en Google Analytics para análisis web', 0.00, 2, 'Google', 'Básico'),
('PMP - Project Management Professional', 'Certificación profesional en gestión de proyectos', 405.00, 3, 'PMI', 'Avanzado'),
('CISSP - Certified Information Systems Security Professional', 'Certificación en seguridad de sistemas de información', 749.00, 4, 'ISC2', 'Experto'),
('Microsoft Azure Fundamentals', 'Certificación básica en Microsoft Azure', 99.00, 1, 'Microsoft', 'Básico'),
('Facebook Blueprint Certification', 'Certificación en publicidad de Facebook', 0.00, 2, 'Meta', 'Intermedio');

INSERT INTO usuarios (nombre, apellido, email, password_hash, rol) VALUES
('Admin', 'Sistema', 'admin@certificaciones.com', '$2a$10$example_hash', 'admin'),
('Juan', 'Pérez', 'juan.perez@email.com', '$2a$10$example_hash', 'cliente'),
('María', 'González', 'maria.gonzalez@email.com', '$2a$10$example_hash', 'cliente');

