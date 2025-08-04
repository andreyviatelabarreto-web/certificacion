import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Star, 
  Clock, 
  Award, 
  Users, 
  CheckCircle,
  ArrowLeft,
  ShoppingCart
} from 'lucide-react'

const CertificationDetail = ({ certifications = [], onAddToCart }) => {
  const { id } = useParams()
  const certification = certifications.find(cert => cert.id.toString() === id)

  if (!certification) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              Certificación no encontrada
            </h1>
            <p className="text-muted-foreground mb-6">
              La certificación que buscas no existe o ha sido removida.
            </p>
            <Link to="/catalog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Catálogo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const formatPrice = (price) => {
    return price === 0 ? 'Gratis' : `$${price.toFixed(2)}`
  }

  const getLevelColor = (level) => {
    const colors = {
      'BASICO': 'bg-green-100 text-green-800',
      'INTERMEDIO': 'bg-blue-100 text-blue-800',
      'AVANZADO': 'bg-orange-100 text-orange-800',
      'EXPERTO': 'bg-red-100 text-red-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  const benefits = [
    'Certificación reconocida internacionalmente',
    'Material de estudio completo incluido',
    'Acceso a simulacros de examen',
    'Soporte técnico 24/7',
    'Certificado digital verificable',
    'Acceso de por vida al material'
  ]

  const requirements = [
    'Conocimientos básicos del área',
    'Acceso a internet estable',
    'Dedicación de 2-4 horas semanales',
    'Computadora o dispositivo móvil'
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link to="/catalog" className="text-primary hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al Catálogo
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <Badge className={getLevelColor(certification.nivel)}>
                  {certification.nivel}
                </Badge>
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <span className="text-sm ml-2 text-foreground">4.8 (1,234 reseñas)</span>
                </div>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {certification.nombre}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  {certification.proveedor}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {certification.duracionMeses} meses
                </span>
                <span className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  15,432 estudiantes
                </span>
              </div>
              
              <p className="text-lg text-muted-foreground">
                {certification.descripcion}
              </p>
            </div>

            {/* What you'll learn */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Lo que aprenderás</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Requisitos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Descripción del Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-muted-foreground mb-4">
                    Esta certificación está diseñada para profesionales que buscan validar sus conocimientos 
                    y habilidades en {certification.categoria.nombre.toLowerCase()}. El programa cubre todos los 
                    aspectos fundamentales y avanzados necesarios para destacar en el campo.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Al completar esta certificación, tendrás las competencias necesarias para aplicar 
                    las mejores prácticas de la industria y liderar proyectos exitosos en tu organización.
                  </p>
                  <p className="text-muted-foreground">
                    La certificación es reconocida por las principales empresas del sector y te abrirá 
                    nuevas oportunidades profesionales en el mercado laboral global.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatPrice(certification.precio)}
                  </div>
                  {certification.precio > 0 && (
                    <div className="text-sm text-muted-foreground line-through">
                      ${(certification.precio * 1.3).toFixed(2)}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => onAddToCart(certification)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Agregar al Carrito
                </Button>
                
                <Button variant="outline" className="w-full">
                  Comprar Ahora
                </Button>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Categoría:</span>
                    <span className="font-medium">{certification.categoria.nombre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nivel:</span>
                    <span className="font-medium">{certification.nivel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duración:</span>
                    <span className="font-medium">{certification.duracionMeses} meses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Proveedor:</span>
                    <span className="font-medium">{certification.proveedor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Idioma:</span>
                    <span className="font-medium">Español/Inglés</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Certificado:</span>
                    <span className="font-medium">Incluido</span>
                  </div>
                </div>

                <Separator />

                <div className="text-center text-sm text-muted-foreground">
                  <p>✓ Garantía de satisfacción de 30 días</p>
                  <p>✓ Acceso completo de por vida</p>
                  <p>✓ Certificado verificable</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificationDetail

