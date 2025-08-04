#!/bin/bash

# Script de despliegue para CertificaShop
echo "🚀 Iniciando proceso de despliegue de CertificaShop..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para mostrar mensajes
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "README.md" ] || [ ! -d "backend" ] || [ ! -d "certificaciones-frontend" ]; then
    print_error "Este script debe ejecutarse desde el directorio raíz del proyecto"
    exit 1
fi

print_status "Verificando dependencias..."

# Verificar Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado"
    exit 1
fi

# Verificar Java
if ! command -v java &> /dev/null; then
    print_error "Java no está instalado"
    exit 1
fi

# Verificar Maven
if ! command -v mvn &> /dev/null; then
    print_error "Maven no está instalado"
    exit 1
fi

print_status "Todas las dependencias están instaladas ✅"

# Construir frontend
print_status "Construyendo frontend..."
cd certificaciones-frontend
npm install
if [ $? -ne 0 ]; then
    print_error "Error al instalar dependencias del frontend"
    exit 1
fi

npm run build
if [ $? -ne 0 ]; then
    print_error "Error al construir el frontend"
    exit 1
fi

print_status "Frontend construido exitosamente ✅"
cd ..

# Construir backend
print_status "Construyendo backend..."
cd backend
mvn clean package -DskipTests
if [ $? -ne 0 ]; then
    print_error "Error al construir el backend"
    exit 1
fi

print_status "Backend construido exitosamente ✅"
cd ..

# Verificar archivos de configuración
print_status "Verificando archivos de configuración..."

if [ ! -f "vercel.json" ]; then
    print_warning "vercel.json no encontrado"
fi

if [ ! -f "backend/Dockerfile" ]; then
    print_warning "Dockerfile no encontrado en backend/"
fi

print_status "Verificación completada ✅"

# Mostrar instrucciones de despliegue
echo ""
echo "🎉 ¡Construcción completada exitosamente!"
echo ""
echo "📋 Próximos pasos para el despliegue:"
echo ""
echo "1️⃣  Frontend (Vercel):"
echo "   - Conecta tu repositorio de GitHub con Vercel"
echo "   - Configura el directorio raíz: certificaciones-frontend"
echo "   - Comando de build: npm run build"
echo "   - Directorio de salida: dist"
echo ""
echo "2️⃣  Backend (Render):"
echo "   - Conecta tu repositorio de GitHub con Render"
echo "   - Selecciona 'Web Service'"
echo "   - Directorio raíz: backend"
echo "   - Comando de build: mvn clean package -DskipTests"
echo "   - Comando de inicio: java -jar target/certificaciones-backend-0.0.1-SNAPSHOT.jar"
echo "   - Variables de entorno necesarias:"
echo "     * DATABASE_URL"
echo "     * DATABASE_USERNAME"
echo "     * DATABASE_PASSWORD"
echo "     * CORS_ALLOWED_ORIGINS"
echo ""
echo "3️⃣  Base de Datos:"
echo "   - Configura una base de datos MySQL en la nube"
echo "   - Ejecuta el script database/init.sql"
echo "   - Actualiza las variables de entorno del backend"
echo ""
echo "🔗 URLs de ejemplo:"
echo "   Frontend: https://certificashop.vercel.app"
echo "   Backend:  https://certificashop-api.render.com"
echo ""
print_status "¡Listo para desplegar! 🚀"

