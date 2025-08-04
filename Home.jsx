import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Award, 
  Star, 
  Users, 
  TrendingUp, 
  Shield,
  Globe,
  BookOpen,
  ArrowRight
} from 'lucide-react'

const Home = ({ categories = [], featuredCertifications = [], onAddToCart }) => {
  const stats = [
    { icon: Users, label: 'Estudiantes Certificados', value: '50,000+' },
    { icon: Award, label: 'Certificaciones Disponibles', value: '200+' },
    { icon: Globe, label: 'Países', value: '150+' },
    { icon: TrendingUp, label: 'Tasa de Éxito', value: '95%' }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Certificaciones Oficiales',
      description: 'Todas nuestras certificaciones son reconocidas internacionalmente por las principales empresas del sector.'
    },
    {
      icon: BookOpen,
      title: 'Material de Estudio',
      description: 'Acceso completo a materiales de estudio, práctica y simulacros de examen.'
    },
    {
      icon: Users,
      title: 'Soporte 24/7',
      description: 'Nuestro equipo de expertos está disponible para ayudarte en tu proceso de certificación.'
    }
  ]

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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Impulsa tu carrera con
              <span className="text-primary block">certificaciones internacionales</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Accede a las mejores certificaciones profesionales de tecnología, marketing, gestión de proyectos y más. 
              Reconocidas por empresas líderes en todo el mundo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="w-full sm:w-auto">
                  Explorar Certificaciones
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Ver Categorías
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Certificaciones Destacadas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Las certificaciones más populares y demandadas por las empresas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCertifications.map((cert) => (
              <Card key={cert.id} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getLevelColor(cert.nivel)}>
                      {cert.nivel}
                    </Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {cert.nombre}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {cert.proveedor} • {cert.categoria.nombre}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {cert.descripcion}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Duración: {cert.duracionMeses} meses</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(cert.precio)}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button 
                    className="flex-1"
                    onClick={() => onAddToCart(cert)}
                  >
                    Agregar al Carrito
                  </Button>
                  <Link to={`/certification/${cert.id}`}>
                    <Button variant="outline" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button variant="outline" size="lg">
                Ver Todas las Certificaciones
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir CertificaShop?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Somos tu socio confiable en el crecimiento profesional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explora por Categorías
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra la certificación perfecta para tu área de especialización
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/catalog?category=${category.id}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.nombre}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.descripcion}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

