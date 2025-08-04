# Documentación Técnica - CertificaShop

## Tabla de Contenidos

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Base de Datos](#base-de-datos)
6. [Backend - Spring Boot](#backend---spring-boot)
7. [Frontend - React](#frontend---react)
8. [Configuración Local](#configuración-local)
9. [Despliegue en Producción](#despliegue-en-producción)
10. [API Documentation](#api-documentation)
11. [Seguridad](#seguridad)
12. [Pruebas](#pruebas)
13. [Mantenimiento](#mantenimiento)

## Resumen Ejecutivo

CertificaShop es una plataforma web completa para la venta de certificaciones profesionales internacionales. El sistema está diseñado con una arquitectura moderna de tres capas que incluye:

- **Frontend**: Aplicación React con interfaz responsiva y moderna
- **Backend**: API REST desarrollada con Spring Boot siguiendo el patrón MVC
- **Base de Datos**: MySQL con phpMyAdmin para administración

### Características Principales

- Catálogo de certificaciones con filtros avanzados
- Sistema de carrito de compras
- Gestión de categorías y proveedores
- Interfaz responsiva optimizada para móviles
- API REST robusta y escalable
- Configuración lista para despliegue en la nube

### Métricas del Proyecto

- **Líneas de código**: ~3,500 líneas
- **Componentes React**: 7 componentes principales
- **Endpoints API**: 8 endpoints REST
- **Tablas de BD**: 6 tablas principales
- **Tiempo de desarrollo**: Proyecto completo funcional



## Arquitectura del Sistema

### Arquitectura General

El sistema sigue una arquitectura de tres capas (3-tier architecture) con separación clara de responsabilidades:

```
┌─────────────────────────────────────────────────────────────┐
│                    CAPA DE PRESENTACIÓN                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                React Frontend                        │   │
│  │  • Componentes UI (Shadcn/UI)                       │   │
│  │  • Gestión de estado local                          │   │
│  │  • Routing (React Router)                           │   │
│  │  • Estilos (Tailwind CSS)                          │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                         HTTP/REST API
                              │
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE LÓGICA                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Spring Boot Backend                     │   │
│  │  • Controllers (REST API)                           │   │
│  │  • Services (Lógica de negocio)                     │   │
│  │  • Repositories (Acceso a datos)                    │   │
│  │  • Entities (Modelos de datos)                      │   │
│  │  • Security (Autenticación/Autorización)            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                           JPA/JDBC
                              │
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE DATOS                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                  MySQL Database                      │   │
│  │  • Tablas normalizadas                              │   │
│  │  • Índices optimizados                              │   │
│  │  • Relaciones FK                                    │   │
│  │  • Triggers y constraints                           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   phpMyAdmin                         │   │
│  │  • Interfaz de administración                       │   │
│  │  • Gestión de datos                                 │   │
│  │  • Monitoreo de BD                                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Patrón de Arquitectura MVC

El backend implementa el patrón Model-View-Controller (MVC):

- **Model**: Entidades JPA que representan el modelo de datos
- **View**: Respuestas JSON de la API REST
- **Controller**: Controladores REST que manejan las peticiones HTTP

### Flujo de Datos

1. **Request**: El usuario interactúa con la interfaz React
2. **API Call**: React envía petición HTTP a la API Spring Boot
3. **Controller**: El controlador recibe y valida la petición
4. **Service**: La lógica de negocio procesa la petición
5. **Repository**: Se accede a la base de datos via JPA
6. **Response**: Los datos se devuelven como JSON al frontend
7. **UI Update**: React actualiza la interfaz con los nuevos datos

## Tecnologías Utilizadas

### Frontend Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 18.x | Biblioteca principal para UI |
| Vite | 5.x | Build tool y dev server |
| React Router DOM | 6.x | Routing del lado del cliente |
| Tailwind CSS | 3.x | Framework de estilos utilitarios |
| Shadcn/UI | Latest | Componentes UI pre-construidos |
| Lucide React | Latest | Iconografía |
| Axios/Fetch | Native | Cliente HTTP para API calls |

### Backend Stack

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Spring Boot | 3.2.0 | Framework principal de backend |
| Spring Data JPA | 3.2.0 | ORM y acceso a datos |
| Spring Security | 6.x | Seguridad y autenticación |
| Spring Web | 3.2.0 | API REST y controladores |
| MySQL Connector | 8.0.33 | Driver de base de datos |
| Maven | 3.6+ | Gestión de dependencias |
| Java | 17 | Lenguaje de programación |

### Base de Datos

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| MySQL | 8.0+ | Sistema de gestión de base de datos |
| phpMyAdmin | Latest | Interfaz de administración web |

### Herramientas de Desarrollo

| Herramienta | Propósito |
|-------------|-----------|
| Git | Control de versiones |
| GitHub | Repositorio remoto |
| Vercel | Despliegue de frontend |
| Render | Despliegue de backend |
| Docker | Containerización (opcional) |

### Dependencias Principales

#### Frontend (package.json)
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "tailwindcss": "^3.3.0",
    "@radix-ui/react-*": "^1.0.0",
    "lucide-react": "^0.263.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^1.14.0"
  }
}
```

#### Backend (pom.xml)
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
    </dependency>
</dependencies>
```


## Estructura del Proyecto

```
certificaciones-app/
├── README.md                           # Documentación principal
├── DOCUMENTACION_TECNICA.md           # Este documento
├── .gitignore                         # Archivos ignorados por Git
├── deploy.sh                          # Script de despliegue
├── vercel.json                        # Configuración para Vercel
├── docker-compose.yml                 # Configuración Docker (desarrollo)
├── todo.md                           # Lista de tareas del proyecto
│
├── certificaciones-frontend/          # Aplicación React
│   ├── public/                        # Archivos estáticos
│   │   ├── favicon.ico
│   │   └── index.html
│   ├── src/                          # Código fuente React
│   │   ├── components/               # Componentes React
│   │   │   ├── ui/                   # Componentes UI base (Shadcn)
│   │   │   ├── Header.jsx            # Cabecera de la aplicación
│   │   │   ├── Home.jsx              # Página de inicio
│   │   │   ├── Catalog.jsx           # Catálogo de certificaciones
│   │   │   ├── CertificationDetail.jsx # Detalle de certificación
│   │   │   ├── Cart.jsx              # Carrito de compras
│   │   │   └── Footer.jsx            # Pie de página
│   │   ├── config/                   # Configuraciones
│   │   │   └── api.js                # Configuración de API
│   │   ├── hooks/                    # Custom hooks
│   │   ├── lib/                      # Utilidades
│   │   ├── assets/                   # Recursos estáticos
│   │   ├── App.jsx                   # Componente principal
│   │   ├── main.jsx                  # Punto de entrada
│   │   └── index.css                 # Estilos globales
│   ├── .env.example                  # Variables de entorno ejemplo
│   ├── package.json                  # Dependencias y scripts
│   ├── vite.config.js               # Configuración de Vite
│   ├── tailwind.config.js           # Configuración de Tailwind
│   └── components.json              # Configuración de Shadcn/UI
│
├── backend/                          # Aplicación Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/certificaciones/backend/
│   │   │   │   ├── entity/           # Entidades JPA
│   │   │   │   │   ├── Categoria.java
│   │   │   │   │   ├── Certificacion.java
│   │   │   │   │   ├── Usuario.java
│   │   │   │   │   ├── Pedido.java
│   │   │   │   │   └── DetallePedido.java
│   │   │   │   ├── repository/       # Repositorios JPA
│   │   │   │   │   ├── CategoriaRepository.java
│   │   │   │   │   ├── CertificacionRepository.java
│   │   │   │   │   ├── UsuarioRepository.java
│   │   │   │   │   └── PedidoRepository.java
│   │   │   │   ├── controller/       # Controladores REST
│   │   │   │   │   ├── CategoriaController.java
│   │   │   │   │   └── CertificacionController.java
│   │   │   │   ├── config/           # Configuraciones
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   └── CertificacionesBackendApplication.java
│   │   │   └── resources/
│   │   │       ├── application.properties      # Configuración desarrollo
│   │   │       └── application-prod.properties # Configuración producción
│   │   └── test/                     # Tests unitarios
│   ├── target/                       # Archivos compilados
│   ├── Dockerfile                    # Configuración Docker
│   └── pom.xml                       # Configuración Maven
│
└── database/                         # Scripts de base de datos
    └── init.sql                      # Script de inicialización
```

## Base de Datos

### Diseño de la Base de Datos

La base de datos está diseñada siguiendo principios de normalización para evitar redundancia y mantener integridad referencial.

#### Diagrama Entidad-Relación

```
┌─────────────────┐       ┌─────────────────────────────────┐
│    CATEGORIAS   │       │         CERTIFICACIONES         │
├─────────────────┤       ├─────────────────────────────────┤
│ id (PK)         │◄──────┤ id (PK)                         │
│ nombre          │       │ nombre                          │
│ descripcion     │       │ descripcion                     │
│ imagen_url      │       │ precio                          │
│ activo          │       │ duracion_meses                  │
│ fecha_creacion  │       │ categoria_id (FK)               │
│ fecha_actualiz. │       │ imagen_url                      │
└─────────────────┘       │ proveedor                       │
                          │ nivel                           │
                          │ activo                          │
                          │ fecha_creacion                  │
                          │ fecha_actualizacion             │
                          └─────────────────────────────────┘
                                           │
                                           │
                          ┌─────────────────────────────────┐
                          │       DETALLES_PEDIDO           │
                          ├─────────────────────────────────┤
                          │ id (PK)                         │
                          │ pedido_id (FK)                  │
                          │ certificacion_id (FK)           │◄──┘
                          │ cantidad                        │
                          │ precio_unitario                 │
                          │ subtotal                        │
                          └─────────────────────────────────┘
                                           │
                                           │
┌─────────────────┐       ┌─────────────────────────────────┐
│    USUARIOS     │       │            PEDIDOS              │
├─────────────────┤       ├─────────────────────────────────┤
│ id (PK)         │◄──────┤ id (PK)                         │
│ nombre          │       │ usuario_id (FK)                 │
│ email           │       │ fecha_pedido                    │
│ password        │       │ estado                          │
│ telefono        │       │ total                           │
│ direccion       │       │ fecha_creacion                  │
│ fecha_registro  │       │ fecha_actualizacion             │
│ activo          │       └─────────────────────────────────┘
└─────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              CERTIFICACIONES_USUARIOS                       │
├─────────────────────────────────────────────────────────────┤
│ id (PK)                                                     │
│ usuario_id (FK) ──────────────────────────────────────────► │
│ certificacion_id (FK) ─────────────────────────────────────► │
│ fecha_compra                                                │
│ fecha_vencimiento                                           │
│ estado                                                      │
│ codigo_certificacion                                        │
└─────────────────────────────────────────────────────────────┘
```

### Esquema de Tablas

#### Tabla: categorias
```sql
CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    imagen_url VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Tabla: certificaciones
```sql
CREATE TABLE certificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    duracion_meses INT DEFAULT 12,
    categoria_id INT,
    imagen_url VARCHAR(255),
    proveedor VARCHAR(100),
    nivel ENUM('BASICO','INTERMEDIO','AVANZADO','EXPERTO') DEFAULT 'BASICO',
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE SET NULL
);
```

#### Tabla: usuarios
```sql
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);
```

#### Tabla: pedidos
```sql
CREATE TABLE pedidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('PENDIENTE','PROCESANDO','COMPLETADO','CANCELADO') DEFAULT 'PENDIENTE',
    total DECIMAL(10,2) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

#### Tabla: detalles_pedido
```sql
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
```

#### Tabla: certificaciones_usuarios
```sql
CREATE TABLE certificaciones_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    certificacion_id INT NOT NULL,
    fecha_compra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_vencimiento DATE,
    estado ENUM('ACTIVA','VENCIDA','SUSPENDIDA') DEFAULT 'ACTIVA',
    codigo_certificacion VARCHAR(50) UNIQUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id) ON DELETE CASCADE
);
```

### Índices y Optimizaciones

```sql
-- Índices para mejorar rendimiento
CREATE INDEX idx_certificaciones_categoria ON certificaciones(categoria_id);
CREATE INDEX idx_certificaciones_nivel ON certificaciones(nivel);
CREATE INDEX idx_certificaciones_precio ON certificaciones(precio);
CREATE INDEX idx_certificaciones_activo ON certificaciones(activo);
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_pedidos_fecha ON pedidos(fecha_pedido);
CREATE INDEX idx_detalles_pedido ON detalles_pedido(pedido_id);
CREATE INDEX idx_cert_usuarios_usuario ON certificaciones_usuarios(usuario_id);
CREATE INDEX idx_cert_usuarios_cert ON certificaciones_usuarios(certificacion_id);
```

### Datos de Ejemplo

```sql
-- Insertar categorías
INSERT INTO categorias (nombre, descripcion) VALUES 
('Tecnología', 'Certificaciones en tecnología y desarrollo de software'),
('Marketing Digital', 'Certificaciones en marketing digital y análisis web'),
('Gestión de Proyectos', 'Certificaciones en gestión y dirección de proyectos'),
('Ciberseguridad', 'Certificaciones en seguridad informática y protección de datos');

-- Insertar certificaciones
INSERT INTO certificaciones (nombre, descripcion, proveedor, precio, duracion_meses, nivel, categoria_id) VALUES
('AWS Certified Solutions Architect', 'Certificación para arquitectos de soluciones en AWS', 'Amazon Web Services', 150.00, 36, 'INTERMEDIO', 1),
('Google Analytics Certified', 'Certificación en Google Analytics para análisis web', 'Google', 0.00, 12, 'BASICO', 2),
('PMP - Project Management Professional', 'Certificación profesional en gestión de proyectos', 'PMI', 405.00, 36, 'AVANZADO', 3),
('CISSP - Certified Information Systems Security Professional', 'Certificación en seguridad de sistemas de información', 'ISC2', 749.00, 36, 'EXPERTO', 4);
```


## Backend - Spring Boot

### Arquitectura del Backend

El backend sigue el patrón de arquitectura en capas de Spring Boot:

```
┌─────────────────────────────────────────────────────────────┐
│                    CONTROLLER LAYER                         │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │ CategoriaController │  │ CertificacionController      │   │
│  │ @RestController  │  │ @RestController              │   │
│  │ @RequestMapping  │  │ @RequestMapping              │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                           │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │ CategoriaService │  │ CertificacionService         │   │
│  │ @Service        │  │ @Service                     │   │
│  │ Business Logic  │  │ Business Logic               │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   REPOSITORY LAYER                          │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │CategoriaRepository│  │CertificacionRepository       │   │
│  │ @Repository     │  │ @Repository                  │   │
│  │ JpaRepository   │  │ JpaRepository                │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     ENTITY LAYER                            │
│  ┌─────────────────┐  ┌─────────────────────────────────┐   │
│  │   Categoria     │  │      Certificacion           │   │
│  │   @Entity       │  │      @Entity                 │   │
│  │   @Table        │  │      @Table                  │   │
│  └─────────────────┘  └─────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Entidades JPA

#### Categoria.java
```java
@Entity
@Table(name = "categorias")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nombre;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "imagen_url")
    private String imagenUrl;
    
    @Column(nullable = false)
    private Boolean activo = true;
    
    @OneToMany(mappedBy = "categoria", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Certificacion> certificaciones = new ArrayList<>();
    
    // Getters, setters, constructores...
}
```

#### Certificacion.java
```java
@Entity
@Table(name = "certificaciones")
public class Certificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 200, message = "El nombre no puede exceder 200 caracteres")
    @Column(nullable = false, length = 200)
    private String nombre;
    
    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = true, message = "El precio debe ser mayor o igual a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    @JsonBackReference
    private Categoria categoria;
    
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Nivel nivel = Nivel.BASICO;
    
    public enum Nivel {
        BASICO("Básico"),
        INTERMEDIO("Intermedio"),
        AVANZADO("Avanzado"),
        EXPERTO("Experto");
    }
    
    // Getters, setters, constructores...
}
```

### Controladores REST

#### CategoriaController.java
```java
@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "*")
public class CategoriaController {
    
    @Autowired
    private CategoriaRepository categoriaRepository;
    
    @GetMapping
    public List<Categoria> getAllCategorias() {
        return categoriaRepository.findByActivoTrue();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> getCategoriaById(@PathVariable Long id) {
        Optional<Categoria> categoria = categoriaRepository.findById(id);
        return categoria.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public Categoria createCategoria(@Valid @RequestBody Categoria categoria) {
        return categoriaRepository.save(categoria);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> updateCategoria(@PathVariable Long id, 
                                                   @Valid @RequestBody Categoria categoriaDetails) {
        return categoriaRepository.findById(id)
            .map(categoria -> {
                categoria.setNombre(categoriaDetails.getNombre());
                categoria.setDescripcion(categoriaDetails.getDescripcion());
                categoria.setImagenUrl(categoriaDetails.getImagenUrl());
                return ResponseEntity.ok(categoriaRepository.save(categoria));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategoria(@PathVariable Long id) {
        return categoriaRepository.findById(id)
            .map(categoria -> {
                categoria.setActivo(false);
                categoriaRepository.save(categoria);
                return ResponseEntity.ok().build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
```

### Configuración de Seguridad

#### SecurityConfig.java
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/api/**").permitAll()
                .requestMatchers("/h2-console/**").permitAll()
                .requestMatchers("/error").permitAll()
                .anyRequest().permitAll()
            )
            .headers(headers -> headers.frameOptions().disable());
        
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Configuración de Aplicación

#### application.properties (Desarrollo)
```properties
# Configuración de la base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/certificaciones_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=rootpassword
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true

# Puerto del servidor
server.port=8080

# Configuración de logging
logging.level.org.springframework.security=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=TRACE
```

#### application-prod.properties (Producción)
```properties
# Puerto del servidor
server.port=${PORT:8080}

# Configuración de la base de datos (usar variables de entorno)
spring.datasource.url=${DATABASE_URL:jdbc:mysql://localhost:3306/certificaciones_db?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true}
spring.datasource.username=${DATABASE_USERNAME:root}
spring.datasource.password=${DATABASE_PASSWORD:}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Configuración de JPA/Hibernate para producción
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=false

# Configuración de CORS para producción
cors.allowed-origins=${CORS_ALLOWED_ORIGINS:https://certificashop.vercel.app,http://localhost:3000,http://localhost:5173}
```

## Frontend - React

### Arquitectura del Frontend

El frontend está estructurado siguiendo las mejores prácticas de React:

```
┌─────────────────────────────────────────────────────────────┐
│                      APP COMPONENT                          │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 App.jsx                             │   │
│  │  • Router configuration                             │   │
│  │  • Global state management                          │   │
│  │  • Theme provider                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    PAGE COMPONENTS                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │    Home     │ │   Catalog   │ │ CertificationDetail │   │
│  │  Component  │ │  Component  │ │     Component       │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   SHARED COMPONENTS                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │   Header    │ │    Cart     │ │      Footer         │   │
│  │  Component  │ │  Component  │ │     Component       │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     UI COMPONENTS                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐   │
│  │   Button    │ │    Card     │ │      Input          │   │
│  │   Badge     │ │   Select    │ │      Dialog         │   │
│  │   Table     │ │   Form      │ │      ...            │   │
│  └─────────────┘ └─────────────┘ └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Componentes Principales

#### App.jsx
```jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Catalog from './components/Catalog';
import CertificationDetail from './components/CertificationDetail';
import Cart from './components/Cart';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentView, setCurrentView] = useState('home');

  const addToCart = (certification) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === certification.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === certification.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...certification, quantity: 1 }];
    });
  };

  const removeFromCart = (certificationId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== certificationId));
  };

  const updateQuantity = (certificationId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(certificationId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === certificationId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onNavigate={setCurrentView}
        currentView={currentView}
      />
      
      <main className="flex-grow">
        {currentView === 'home' && <Home onNavigate={setCurrentView} />}
        {currentView === 'catalog' && <Catalog onAddToCart={addToCart} />}
        {currentView === 'cart' && (
          <Cart 
            items={cartItems}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
```

#### Catalog.jsx (Componente Principal)
```jsx
import React, { useState, useEffect, useMemo } from 'react';
import { API_ENDPOINTS } from '../config/api';

const Catalog = ({ onAddToCart }) => {
  const [certifications, setCertifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  // ... otros estados de filtros

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const categoriesResponse = await fetch(API_ENDPOINTS.CATEGORIAS);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const certificationsResponse = await fetch(API_ENDPOINTS.CERTIFICACIONES);
        const certificationsData = await certificationsResponse.json();
        setCertifications(certificationsData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Lógica de filtrado y ordenamiento
  const filteredAndSortedCertifications = useMemo(() => {
    // ... lógica de filtros
  }, [certifications, searchTerm, selectedCategory, /* otros filtros */]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        {/* ... componentes de filtros */}
      </div>

      {/* Grid de certificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCertifications.map(cert => (
          <Card key={cert.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
            {/* ... contenido de la tarjeta */}
          </Card>
        ))}
      </div>
    </div>
  );
};
```

### Configuración de API

#### config/api.js
```javascript
// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  CATEGORIAS: `${API_BASE_URL}/categorias`,
  CERTIFICACIONES: `${API_BASE_URL}/certificaciones`,
  CERTIFICACIONES_BY_CATEGORIA: (categoriaId) => `${API_BASE_URL}/certificaciones/categoria/${categoriaId}`,
};

export default API_BASE_URL;
```

### Estilos y Diseño

#### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      }
    },
  },
  plugins: [],
}
```

### Gestión de Estado

El estado se maneja principalmente a nivel de componente usando `useState` y `useEffect`. Para aplicaciones más complejas, se podría implementar:

- **Context API** para estado global
- **Redux Toolkit** para estado complejo
- **React Query** para gestión de datos del servidor
- **Zustand** para estado ligero


## Configuración Local

### Prerrequisitos del Sistema

- **Node.js**: 18.x o superior
- **Java**: 17 o superior (OpenJDK recomendado)
- **Maven**: 3.6 o superior
- **MySQL**: 8.0 o superior
- **Git**: Para control de versiones

### Instalación Paso a Paso

#### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/certificaciones-app.git
cd certificaciones-app
```

#### 2. Configurar Base de Datos
```bash
# Iniciar MySQL
sudo systemctl start mysql

# Crear base de datos
mysql -u root -p -e "CREATE DATABASE certificaciones_db;"

# Ejecutar script de inicialización
mysql -u root -p certificaciones_db < database/init.sql
```

#### 3. Configurar Backend
```bash
cd backend

# Configurar application.properties
cp src/main/resources/application.properties.example src/main/resources/application.properties

# Editar configuración de base de datos
nano src/main/resources/application.properties

# Compilar y ejecutar
mvn clean install
mvn spring-boot:run
```

#### 4. Configurar Frontend
```bash
cd certificaciones-frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Editar configuración de API
nano .env.local

# Ejecutar en modo desarrollo
npm run dev
```

#### 5. Verificar Instalación
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080/api/categorias
- phpMyAdmin: http://localhost/phpmyadmin

### Configuración de Desarrollo

#### Variables de Entorno

**Backend (.env o application.properties)**
```properties
# Base de datos
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/certificaciones_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=tu_password

# JPA/Hibernate
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=true

# Puerto
SERVER_PORT=8080
```

**Frontend (.env.local)**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

#### Scripts de Desarrollo

**Backend (Maven)**
```bash
# Compilar
mvn clean compile

# Ejecutar tests
mvn test

# Ejecutar aplicación
mvn spring-boot:run

# Generar JAR
mvn clean package
```

**Frontend (npm)**
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## Despliegue en Producción

### Arquitectura de Despliegue

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         CDN                                 │
│                    (Vercel Edge)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND                                 │
│                 (Vercel Hosting)                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React App                              │   │
│  │  • Static files served from CDN                    │   │
│  │  • Environment variables configured                │   │
│  │  • Automatic deployments from Git                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                         HTTPS/REST API
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND                                 │
│                  (Render Hosting)                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            Spring Boot App                          │   │
│  │  • Auto-scaling containers                         │   │
│  │  • Health checks enabled                           │   │
│  │  • Environment variables configured                │   │
│  │  • Automatic deployments from Git                  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                           JDBC/SSL
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE                                │
│                 (Cloud MySQL Service)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MySQL Database                         │   │
│  │  • Managed service (Railway/PlanetScale)           │   │
│  │  • Automatic backups                               │   │
│  │  • SSL connections                                 │   │
│  │  • Connection pooling                              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Despliegue Frontend (Vercel)

#### 1. Configuración en Vercel
```json
// vercel.json
{
  "version": 2,
  "name": "certificashop-frontend",
  "builds": [
    {
      "src": "certificaciones-frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/certificaciones-frontend/$1"
    }
  ],
  "buildCommand": "cd certificaciones-frontend && npm run build",
  "outputDirectory": "certificaciones-frontend/dist",
  "installCommand": "cd certificaciones-frontend && npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ]
}
```

#### 2. Variables de Entorno en Vercel
```env
VITE_API_BASE_URL=https://certificashop-api.render.com/api
```

#### 3. Comandos de Despliegue
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Despliegue Backend (Render)

#### 1. Dockerfile
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY pom.xml .
COPY .mvn .mvn
COPY mvnw .

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src src
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/certificaciones-backend-0.0.1-SNAPSHOT.jar"]
```

#### 2. Variables de Entorno en Render
```env
DATABASE_URL=mysql://user:password@host:port/database
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
CORS_ALLOWED_ORIGINS=https://certificashop.vercel.app
SPRING_PROFILES_ACTIVE=prod
```

#### 3. Configuración de Render
- **Build Command**: `mvn clean package -DskipTests`
- **Start Command**: `java -jar target/certificaciones-backend-0.0.1-SNAPSHOT.jar`
- **Environment**: Java 17
- **Health Check Path**: `/actuator/health`

### Base de Datos en la Nube

#### Opciones Recomendadas

1. **Railway**
   - MySQL managed service
   - Fácil configuración
   - Backups automáticos
   - $5/mes aprox.

2. **PlanetScale**
   - MySQL serverless
   - Branching de base de datos
   - Escalado automático
   - Plan gratuito disponible

3. **AWS RDS**
   - MySQL managed
   - Alta disponibilidad
   - Múltiples regiones
   - Más costoso pero robusto

#### Configuración de Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Crear proyecto
railway new

# Agregar MySQL
railway add mysql

# Obtener URL de conexión
railway variables
```

### Script de Despliegue Automatizado

```bash
#!/bin/bash
# deploy.sh

echo "🚀 Iniciando despliegue de CertificaShop..."

# Build frontend
echo "📦 Construyendo frontend..."
cd certificaciones-frontend
npm install
npm run build
cd ..

# Build backend
echo "🔧 Construyendo backend..."
cd backend
mvn clean package -DskipTests
cd ..

# Deploy to Vercel
echo "🌐 Desplegando frontend a Vercel..."
vercel --prod

# Deploy to Render (automático via Git push)
echo "☁️ Desplegando backend a Render..."
git add .
git commit -m "Deploy: $(date)"
git push origin main

echo "✅ Despliegue completado!"
echo "Frontend: https://certificashop.vercel.app"
echo "Backend: https://certificashop-api.render.com"
```

## API Documentation

### Endpoints Disponibles

#### Categorías

**GET /api/categorias**
- **Descripción**: Obtener todas las categorías activas
- **Respuesta**: Array de objetos Categoria
- **Ejemplo**:
```json
[
  {
    "id": 1,
    "nombre": "Tecnología",
    "descripcion": "Certificaciones en tecnología y desarrollo de software",
    "imagenUrl": null,
    "activo": true,
    "fechaCreacion": "2025-08-03T23:22:37",
    "fechaActualizacion": "2025-08-03T23:22:37",
    "certificaciones": [...]
  }
]
```

**GET /api/categorias/{id}**
- **Descripción**: Obtener categoría por ID
- **Parámetros**: `id` (Long) - ID de la categoría
- **Respuesta**: Objeto Categoria o 404 si no existe

**POST /api/categorias**
- **Descripción**: Crear nueva categoría
- **Body**: Objeto Categoria (sin ID)
- **Respuesta**: Categoria creada con ID asignado

**PUT /api/categorias/{id}**
- **Descripción**: Actualizar categoría existente
- **Parámetros**: `id` (Long) - ID de la categoría
- **Body**: Objeto Categoria con datos actualizados
- **Respuesta**: Categoria actualizada o 404 si no existe

**DELETE /api/categorias/{id}**
- **Descripción**: Eliminar categoría (soft delete)
- **Parámetros**: `id` (Long) - ID de la categoría
- **Respuesta**: 200 OK o 404 si no existe

#### Certificaciones

**GET /api/certificaciones**
- **Descripción**: Obtener todas las certificaciones activas
- **Respuesta**: Array de objetos Certificacion
- **Ejemplo**:
```json
[
  {
    "id": 1,
    "nombre": "AWS Certified Solutions Architect",
    "descripcion": "Certificación para arquitectos de soluciones en AWS",
    "precio": 150.00,
    "duracionMeses": 36,
    "imagenUrl": null,
    "proveedor": "Amazon Web Services",
    "nivel": "INTERMEDIO",
    "activo": true,
    "fechaCreacion": "2025-08-03T23:22:50",
    "fechaActualizacion": "2025-08-03T23:22:50"
  }
]
```

**GET /api/certificaciones/{id}**
- **Descripción**: Obtener certificación por ID
- **Parámetros**: `id` (Long) - ID de la certificación
- **Respuesta**: Objeto Certificacion o 404 si no existe

**GET /api/certificaciones/categoria/{categoriaId}**
- **Descripción**: Obtener certificaciones por categoría
- **Parámetros**: `categoriaId` (Long) - ID de la categoría
- **Respuesta**: Array de certificaciones de la categoría

**POST /api/certificaciones**
- **Descripción**: Crear nueva certificación
- **Body**: Objeto Certificacion (sin ID)
- **Respuesta**: Certificacion creada con ID asignado

**PUT /api/certificaciones/{id}**
- **Descripción**: Actualizar certificación existente
- **Parámetros**: `id` (Long) - ID de la certificación
- **Body**: Objeto Certificacion con datos actualizados
- **Respuesta**: Certificacion actualizada o 404 si no existe

**DELETE /api/certificaciones/{id}**
- **Descripción**: Eliminar certificación (soft delete)
- **Parámetros**: `id` (Long) - ID de la certificación
- **Respuesta**: 200 OK o 404 si no existe

### Códigos de Estado HTTP

| Código | Descripción |
|--------|-------------|
| 200 | OK - Operación exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos de entrada inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

### Formato de Errores

```json
{
  "timestamp": "2025-08-04T03:20:33.598+00:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/certificaciones"
}
```

## Seguridad

### Configuración de CORS

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Arrays.asList("*"));
    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(Arrays.asList("*"));
    configuration.setAllowCredentials(true);
    
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
}
```

### Validación de Datos

```java
@Entity
public class Certificacion {
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 200, message = "El nombre no puede exceder 200 caracteres")
    private String nombre;
    
    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.0", inclusive = true, message = "El precio debe ser mayor o igual a 0")
    private BigDecimal precio;
}
```

### Mejoras de Seguridad Recomendadas

1. **Autenticación JWT**
   - Implementar login/registro de usuarios
   - Tokens JWT para sesiones
   - Refresh tokens

2. **Autorización por Roles**
   - Roles: ADMIN, USER
   - Endpoints protegidos según rol
   - Middleware de autorización

3. **Validación de Entrada**
   - Sanitización de datos
   - Validación de tipos
   - Límites de rate limiting

4. **HTTPS Obligatorio**
   - Certificados SSL/TLS
   - Redirección HTTP → HTTPS
   - Headers de seguridad

## Pruebas

### Pruebas Backend

#### Pruebas Unitarias
```java
@SpringBootTest
class CategoriaControllerTest {
    
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    void testGetAllCategorias() {
        ResponseEntity<Categoria[]> response = restTemplate.getForEntity(
            "/api/categorias", Categoria[].class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}
```

#### Pruebas de Integración
```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CertificacionesIntegrationTest {
    
    @Test
    void testCreateAndRetrieveCertificacion() {
        // Test completo de creación y recuperación
    }
}
```

### Pruebas Frontend

#### Pruebas de Componentes
```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import Catalog from '../components/Catalog';

test('renders catalog with search functionality', () => {
  render(<Catalog onAddToCart={jest.fn()} />);
  
  const searchInput = screen.getByPlaceholderText('Buscar certificaciones...');
  expect(searchInput).toBeInTheDocument();
  
  fireEvent.change(searchInput, { target: { value: 'AWS' } });
  expect(searchInput.value).toBe('AWS');
});
```

#### Pruebas E2E
```javascript
// cypress/integration/catalog.spec.js
describe('Catalog Page', () => {
  it('should load and display certifications', () => {
    cy.visit('/catalog');
    cy.get('[data-testid="certification-card"]').should('have.length.greaterThan', 0);
    cy.get('[data-testid="add-to-cart-button"]').first().click();
    cy.get('[data-testid="cart-count"]').should('contain', '1');
  });
});
```

### Comandos de Pruebas

```bash
# Backend
mvn test                    # Ejecutar todas las pruebas
mvn test -Dtest=ClassName   # Ejecutar prueba específica
mvn jacoco:report          # Reporte de cobertura

# Frontend
npm test                   # Ejecutar pruebas unitarias
npm run test:coverage     # Cobertura de código
npm run cypress:open      # Pruebas E2E interactivas
npm run cypress:run       # Pruebas E2E en CI
```

## Mantenimiento

### Monitoreo

#### Health Checks
```properties
# application.properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=when-authorized
```

#### Métricas
- **Render**: Monitoreo automático de CPU, memoria, requests
- **Vercel**: Analytics de performance y usage
- **Base de datos**: Monitoreo de conexiones y queries

### Logs

#### Backend Logging
```properties
# Configuración de logs
logging.level.com.certificaciones=INFO
logging.level.org.springframework.security=WARN
logging.pattern.console=%d{yyyy-MM-dd HH:mm:ss} - %msg%n
logging.file.name=logs/certificaciones.log
```

#### Frontend Logging
```javascript
// Configuración de logging para producción
if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = (error) => {
    // Enviar errores a servicio de monitoreo
    // Ej: Sentry, LogRocket, etc.
  };
}
```

### Backup y Recuperación

#### Base de Datos
```bash
# Backup automático diario
mysqldump -u username -p certificaciones_db > backup_$(date +%Y%m%d).sql

# Restauración
mysql -u username -p certificaciones_db < backup_20250804.sql
```

#### Código
- **Git**: Control de versiones con tags para releases
- **GitHub**: Repositorio remoto con backups automáticos
- **Releases**: Tags semánticos (v1.0.0, v1.1.0, etc.)

### Actualizaciones

#### Dependencias Backend
```bash
# Verificar actualizaciones
mvn versions:display-dependency-updates

# Actualizar versiones
mvn versions:use-latest-versions
```

#### Dependencias Frontend
```bash
# Verificar actualizaciones
npm outdated

# Actualizar dependencias
npm update

# Actualizar dependencias principales
npm install react@latest react-dom@latest
```

### Performance

#### Optimizaciones Backend
- **Connection Pooling**: Configurar pool de conexiones DB
- **Caching**: Implementar Redis para cache
- **Indexing**: Optimizar índices de base de datos
- **Pagination**: Implementar paginación en endpoints

#### Optimizaciones Frontend
- **Code Splitting**: Lazy loading de componentes
- **Image Optimization**: Compresión y formatos modernos
- **Bundle Analysis**: Analizar tamaño de bundles
- **CDN**: Uso de CDN para assets estáticos

---

## Conclusión

CertificaShop es una aplicación web moderna y escalable que demuestra las mejores prácticas en desarrollo full-stack. La arquitectura de tres capas, el uso de tecnologías actuales y la configuración para despliegue en la nube la convierten en una solución robusta para la venta de certificaciones profesionales.

### Próximos Pasos Recomendados

1. **Implementar autenticación de usuarios**
2. **Agregar sistema de pagos (Stripe/PayPal)**
3. **Desarrollar panel de administración**
4. **Implementar notificaciones por email**
5. **Agregar sistema de reviews y ratings**
6. **Optimizar SEO y performance**
7. **Implementar PWA (Progressive Web App)**

### Contacto y Soporte

Para soporte técnico o consultas sobre el proyecto:
- **Email**: dev@certificashop.com
- **GitHub**: https://github.com/certificashop/certificaciones-app
- **Documentación**: https://docs.certificashop.com

