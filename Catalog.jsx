import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { ShoppingCart, Star, Clock, DollarSign } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const Catalog = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [certifications, setCertifications] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos desde la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Cargar categorías
        const categoriesResponse = await fetch(API_ENDPOINTS.CATEGORIAS);
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Cargar certificaciones
        const certificationsResponse = await fetch(API_ENDPOINTS.CERTIFICACIONES);
        const certificationsData = await certificationsResponse.json();
        setCertifications(certificationsData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        // Datos de fallback en caso de error
        setCategories([
          { id: 1, nombre: 'Tecnología' },
          { id: 2, nombre: 'Marketing Digital' },
          { id: 3, nombre: 'Gestión de Proyectos' },
          { id: 4, nombre: 'Ciberseguridad' }
        ]);
        setCertifications([
          {
            id: 1,
            nombre: 'AWS Certified Solutions Architect',
            descripcion: 'Certificación para arquitectos de soluciones en AWS',
            precio: 150.00,
            duracionMeses: 36,
            proveedor: 'Amazon Web Services',
            nivel: 'INTERMEDIO'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Obtener proveedores únicos
  const providers = useMemo(() => {
    const uniqueProviders = [...new Set(certifications.map(cert => cert.proveedor))];
    return uniqueProviders.filter(Boolean);
  }, [certifications]);

  // Filtrar y ordenar certificaciones
  const filteredAndSortedCertifications = useMemo(() => {
    let filtered = certifications.filter(cert => {
      const matchesSearch = cert.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
                             (cert.categoria && cert.categoria.id.toString() === selectedCategory);
      
      const matchesLevel = selectedLevel === 'all' || cert.nivel === selectedLevel;
      
      const matchesProvider = selectedProvider === 'all' || cert.proveedor === selectedProvider;
      
      const matchesPrice = priceFilter === 'all' || 
                          (priceFilter === 'free' && cert.precio === 0) ||
                          (priceFilter === 'paid' && cert.precio > 0) ||
                          (priceFilter === 'under100' && cert.precio < 100) ||
                          (priceFilter === 'under500' && cert.precio < 500);

      return matchesSearch && matchesCategory && matchesLevel && matchesProvider && matchesPrice;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.precio - b.precio;
        case 'price-high':
          return b.precio - a.precio;
        case 'duration':
          return a.duracionMeses - b.duracionMeses;
        case 'level':
          const levelOrder = { 'BASICO': 1, 'INTERMEDIO': 2, 'AVANZADO': 3, 'EXPERTO': 4 };
          return levelOrder[a.nivel] - levelOrder[b.nivel];
        default:
          return a.nombre.localeCompare(b.nombre);
      }
    });

    return filtered;
  }, [certifications, searchTerm, selectedCategory, selectedLevel, selectedProvider, priceFilter, sortBy]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'BASICO': return 'bg-green-100 text-green-800';
      case 'INTERMEDIO': return 'bg-blue-100 text-blue-800';
      case 'AVANZADO': return 'bg-orange-100 text-orange-800';
      case 'EXPERTO': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelText = (level) => {
    switch (level) {
      case 'BASICO': return 'Básico';
      case 'INTERMEDIO': return 'Intermedio';
      case 'AVANZADO': return 'Avanzado';
      case 'EXPERTO': return 'Experto';
      default: return level;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando certificaciones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Catálogo de Certificaciones</h1>
        <p className="text-gray-600">Encuentra la certificación perfecta para impulsar tu carrera profesional</p>
      </div>

      {/* Filtros */}
      <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
            <Input
              placeholder="Buscar certificaciones..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nivel</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los niveles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los niveles</SelectItem>
                <SelectItem value="BASICO">Básico</SelectItem>
                <SelectItem value="INTERMEDIO">Intermedio</SelectItem>
                <SelectItem value="AVANZADO">Avanzado</SelectItem>
                <SelectItem value="EXPERTO">Experto</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proveedor</label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los proveedores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los proveedores</SelectItem>
                {providers.map(provider => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los precios" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los precios</SelectItem>
                <SelectItem value="free">Gratis</SelectItem>
                <SelectItem value="under100">Menos de $100</SelectItem>
                <SelectItem value="under500">Menos de $500</SelectItem>
                <SelectItem value="paid">De pago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nombre</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="duration">Duración</SelectItem>
                <SelectItem value="level">Nivel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <p className="text-gray-600">
          Mostrando {filteredAndSortedCertifications.length} de {certifications.length} certificaciones
        </p>
      </div>

      {/* Grid de certificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedCertifications.map(cert => (
          <Card key={cert.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={getLevelColor(cert.nivel)}>
                  {getLevelText(cert.nivel)}
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.8</span>
                </div>
              </div>
              <CardTitle className="text-lg">{cert.nombre}</CardTitle>
              <CardDescription className="text-sm text-gray-600">
                {cert.proveedor}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {cert.descripcion}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Válida por {cert.duracionMeses} meses</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="font-semibold text-lg text-gray-900">
                    {cert.precio === 0 ? 'Gratis' : `$${cert.precio}`}
                  </span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4">
              <Button 
                onClick={() => onAddToCart(cert)} 
                className="w-full"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar al Carrito
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredAndSortedCertifications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No se encontraron certificaciones que coincidan con los filtros seleccionados.</p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedProvider('all');
              setPriceFilter('all');
            }}
            variant="outline"
            className="mt-4"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default Catalog;

