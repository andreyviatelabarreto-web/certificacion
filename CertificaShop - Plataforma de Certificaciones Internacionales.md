# CertificaShop - Plataforma de Certificaciones Internacionales

Una aplicación web completa para la venta de certificaciones profesionales internacionales, desarrollada con React, Spring Boot y MySQL.

## 🚀 Características

- **Frontend React**: Interfaz moderna y responsiva con componentes reutilizables
- **Backend Spring Boot**: API REST robusta con arquitectura MVC
- **Base de Datos MySQL**: Gestión eficiente de datos con phpMyAdmin
- **Autenticación y Seguridad**: Configuración de Spring Security
- **Carrito de Compras**: Funcionalidad completa de e-commerce
- **Filtros Avanzados**: Búsqueda y filtrado por categoría, nivel, precio, etc.
- **Responsive Design**: Optimizado para dispositivos móviles y desktop

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- Vite
- Tailwind CSS
- Shadcn/UI Components
- Lucide Icons
- React Router DOM

### Backend
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- MySQL Connector
- Maven

### Base de Datos
- MySQL 8.0
- phpMyAdmin

## 📁 Estructura del Proyecto

```
certificaciones-app/
├── frontend/                 # Aplicación React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/          # Páginas de la aplicación
│   │   └── utils/          # Utilidades y helpers
│   ├── public/             # Archivos estáticos
│   └── package.json        # Dependencias del frontend
├── backend/                 # Aplicación Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Código fuente Java
│   │   │   └── resources/  # Configuraciones
│   │   └── test/           # Tests
│   └── pom.xml             # Dependencias del backend
├── database/               # Scripts de base de datos
│   └── init.sql           # Script de inicialización
└── README.md              # Este archivo
```

## 🚀 Instalación y Configuración Local

### Prerrequisitos
- Node.js 18+
- Java 17+
- Maven 3.6+
- MySQL 8.0+

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd certificaciones-app
```

### 2. Configurar la Base de Datos
```bash
# Crear la base de datos
mysql -u root -p -e "CREATE DATABASE certificaciones_db;"

# Ejecutar el script de inicialización
mysql -u root -p certificaciones_db < database/init.sql
```

### 3. Configurar el Backend
```bash
cd backend

# Configurar application.properties con tus credenciales de MySQL
# spring.datasource.username=tu_usuario
# spring.datasource.password=tu_contraseña

# Compilar y ejecutar
mvn spring-boot:run
```

### 4. Configurar el Frontend
```bash
cd certificaciones-frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

### 5. Acceder a la Aplicación
- Frontend: http://localhost:5173
- Backend API: http://localhost:8080
- phpMyAdmin: http://localhost/phpmyadmin

## 🌐 Despliegue

### Frontend (Vercel)
1. Conecta tu repositorio de GitHub con Vercel
2. Configura el directorio de build: `certificaciones-frontend`
3. Comando de build: `npm run build`
4. Directorio de salida: `dist`

### Backend (Render)
1. Conecta tu repositorio de GitHub con Render
2. Selecciona "Web Service"
3. Directorio raíz: `backend`
4. Comando de build: `mvn clean package -DskipTests`
5. Comando de inicio: `java -jar target/certificaciones-backend-0.0.1-SNAPSHOT.jar`

### Base de Datos
- Utiliza un servicio de base de datos en la nube como:
  - Railway
  - PlanetScale
  - AWS RDS
  - Google Cloud SQL

## 📊 API Endpoints

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/{id}` - Obtener categoría por ID
- `POST /api/categorias` - Crear nueva categoría
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

### Certificaciones
- `GET /api/certificaciones` - Obtener todas las certificaciones
- `GET /api/certificaciones/{id}` - Obtener certificación por ID
- `GET /api/certificaciones/categoria/{categoriaId}` - Certificaciones por categoría
- `POST /api/certificaciones` - Crear nueva certificación
- `PUT /api/certificaciones/{id}` - Actualizar certificación
- `DELETE /api/certificaciones/{id}` - Eliminar certificación

## 🔧 Variables de Entorno

### Backend
```properties
# Base de datos
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/certificaciones_db
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=tu_contraseña

# JPA/Hibernate
SPRING_JPA_HIBERNATE_DDL_AUTO=update
SPRING_JPA_SHOW_SQL=false

# Puerto del servidor
SERVER_PORT=8080
```

### Frontend
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Autores

- **Equipo CertificaShop** - *Desarrollo inicial* - [GitHub](https://github.com/certificashop)

## 🙏 Agradecimientos

- Spring Boot por el excelente framework de backend
- React por la biblioteca de frontend
- Tailwind CSS por el sistema de diseño
- Shadcn/UI por los componentes de interfaz
- MySQL por la base de datos robusta

