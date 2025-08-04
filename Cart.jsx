import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag,
  ArrowLeft,
  CreditCard
} from 'lucide-react'

const Cart = ({ cart = [], onRemoveFromCart, onUpdateQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

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

  if (cart.length === 0) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Tu carrito está vacío
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Agrega algunas certificaciones para comenzar tu aprendizaje
            </p>
            <Link to="/catalog">
              <Button size="lg">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Explorar Certificaciones
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/catalog" className="text-primary hover:underline flex items-center mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar Comprando
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
            Carrito de Compras
          </h1>
          <p className="text-muted-foreground mt-2">
            {cart.length} {cart.length === 1 ? 'certificación' : 'certificaciones'} en tu carrito
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Item Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getLevelColor(item.nivel)}>
                          {item.nivel}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Link to={`/certification/${item.id}`}>
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                          {item.nombre}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.proveedor} • {item.categoria.nombre}
                      </p>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.descripcion}
                      </p>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(item.precio * item.quantity)}
                        </div>
                        {item.quantity > 1 && (
                          <div className="text-sm text-muted-foreground">
                            {formatPrice(item.precio)} cada uno
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Resumen del Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Impuestos:</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Separator />

                {/* Checkout Button */}
                <Button className="w-full" size="lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Proceder al Pago
                </Button>

                <Button variant="outline" className="w-full">
                  Guardar para Después
                </Button>

                <Separator />

                {/* Benefits */}
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>✓ Acceso inmediato después del pago</p>
                  <p>✓ Certificados verificables</p>
                  <p>✓ Soporte técnico incluido</p>
                  <p>✓ Garantía de satisfacción 30 días</p>
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Código de descuento</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ingresa tu código"
                      className="flex-1 px-3 py-2 text-sm border border-input rounded-md"
                    />
                    <Button variant="outline" size="sm">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8 text-center">
          <Link to="/catalog">
            <Button variant="outline" size="lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart

