// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  CATEGORIAS: `${API_BASE_URL}/categorias`,
  CERTIFICACIONES: `${API_BASE_URL}/certificaciones`,
  CERTIFICACIONES_BY_CATEGORIA: (categoriaId) => `${API_BASE_URL}/certificaciones/categoria/${categoriaId}`,
};

export default API_BASE_URL;

