import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Catalog from './components/Catalog'
import CertificationDetail from './components/CertificationDetail'
import Cart from './components/Cart'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [categories, setCategories] = useState([])
  const [certifications, setCertifications] = useState([])

  // Función para agregar al carrito
  const addToCart = (certification) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === certification.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === certification.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...certification, quantity: 1 }]
    })
  }

  // Función para remover del carrito
  const removeFromCart = (certificationId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== certificationId))
  }

  // Función para actualizar cantidad en el carrito
  const updateCartQuantity = (certificationId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(certificationId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === certificationId
          ? { ...item, quantity }
          : item
      )
    )
  }

  // Cargar datos iniciales
  useEffect(() => {
    // Datos de ejemplo para desarrollo
    const mockCategories = [
      { id: 1, nombre: 'Tecnología', descripcion: 'Certificaciones en tecnología y programación' },
      { id: 2, nombre: 'Marketing Digital', descripcion: 'Certificaciones en marketing y publicidad digital' },
      { id: 3, nombre: 'Gestión de Proyectos', descripcion: 'Certificaciones en metodologías de gestión de proyectos' },
      { id: 4, nombre: 'Ciberseguridad', descripcion: 'Certificaciones en seguridad informática' }
    ]

    const mockCertifications = [
      {
        id: 1,
        nombre: 'AWS Certified Solutions Architect',
        descripcion: 'Certificación para arquitectos de soluciones en AWS',
        precio: 150.00,
        categoria: { id: 1, nombre: 'Tecnología' },
        proveedor: 'Amazon Web Services',
        nivel: 'INTERMEDIO',
        duracionMeses: 36,
        imagenUrl: '/api/placeholder/300/200'
      },
      {
        id: 2,
        nombre: 'Google Analytics Certified',
        descripcion: 'Certificación en Google Analytics para análisis web',
        precio: 0.00,
        categoria: { id: 2, nombre: 'Marketing Digital' },
        proveedor: 'Google',
        nivel: 'BASICO',
        duracionMeses: 12,
        imagenUrl: '/api/placeholder/300/200'
      },
      {
        id: 3,
        nombre: 'PMP - Project Management Professional',
        descripcion: 'Certificación profesional en gestión de proyectos',
        precio: 405.00,
        categoria: { id: 3, nombre: 'Gestión de Proyectos' },
        proveedor: 'PMI',
        nivel: 'AVANZADO',
        duracionMeses: 36,
        imagenUrl: '/api/placeholder/300/200'
      },
      {
        id: 4,
        nombre: 'CISSP - Certified Information Systems Security Professional',
        descripcion: 'Certificación en seguridad de sistemas de información',
        precio: 749.00,
        categoria: { id: 4, nombre: 'Ciberseguridad' },
        proveedor: 'ISC2',
        nivel: 'EXPERTO',
        duracionMeses: 36,
        imagenUrl: '/api/placeholder/300/200'
      }
    ]

    setCategories(mockCategories)
    setCertifications(mockCertifications)
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        
        <main className="pt-16">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  categories={categories}
                  featuredCertifications={certifications.slice(0, 3)}
                  onAddToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/catalog" 
              element={
                <Catalog 
                  certifications={certifications}
                  categories={categories}
                  onAddToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/certification/:id" 
              element={
                <CertificationDetail 
                  certifications={certifications}
                  onAddToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart}
                  onRemoveFromCart={removeFromCart}
                  onUpdateQuantity={updateCartQuantity}
                />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App

