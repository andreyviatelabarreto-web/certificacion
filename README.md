# 🎓 CertificaShop - Plataforma de Certificaciones Internacionales

CertificaShop es una aplicación web full-stack desarrollada como proyecto académico. Permite gestionar y visualizar certificaciones internacionales en una plataforma amigable, moderna y segura.

---

## 🚀 Tecnologías Utilizadas

### Frontend:
- ⚛️ React.js  
- 📦 Axios  
- 🎨 CSS/JSX  

### Backend:
- ☕ Spring Boot  
- 🔐 Spring Security  
- 🗄️ JPA / Hibernate  

### DevOps:
- 🐳 Docker  
- ⚙️ Shell Script (`deploy.sh`)  
- 📄 Vercel para despliegue frontend  

---

## 📐 Arquitectura MVC

CertificaShop está diseñado bajo el patrón Modelo-Vista-Controlador:

- **Modelo**: Clases Java (`Categoria`, `Certificacion`, etc.)
- **Vista**: Componentes React (`Catalog.jsx`, etc.)
- **Controlador**: Controladores REST con Spring Boot

---

## 🔐 Seguridad

- Autenticación basada en roles  
- Configuración segura de endpoints  
- Uso de variables de entorno (`.env.example`)  

---

## 📦 Instalación y Ejecución

### 🔧 Backend (Spring Boot)

```bash
# Navega al backend
cd backend/

# Configura tu base de datos en application.properties
# Ejecuta el proyecto
./mvnw spring-boot:run
