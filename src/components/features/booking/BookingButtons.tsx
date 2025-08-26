'use client'

import { motion } from 'framer-motion'
import { ExternalLink, MessageCircle, Bed, Calendar } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { useResponsive } from '@/hooks/useResponsive'
import { ANIMATION_DEFAULTS } from '@/lib/constants'

interface BookingPlatform {
  name: string
  icon: typeof Bed
  url: string
  color: string
  description: string
  image: string
  discount?: string
}

const bookingPlatforms: BookingPlatform[] = [
  {
    name: 'Booking.com',
    icon: Bed,
    url: 'https://booking.com',
    color: 'blue',
    description: 'Reserva directa con cancelación gratuita',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    discount: '10% OFF'
  },
  {
    name: 'Airbnb',
    icon: Calendar,
    url: 'https://airbnb.com',
    color: 'rose',
    description: 'Experiencia local auténtica',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    discount: 'Huésped frecuente'
  },
  {
    name: 'Hostelworld',
    icon: Bed,
    url: 'https://hostelworld.com',
    color: 'orange',
    description: 'Para mochileros y viajeros jóvenes',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    discount: 'Hasta 20% OFF'
  }
]

interface BookingCardProps {
  platform: BookingPlatform
  index: number
}

function BookingCard({ platform, index }: BookingCardProps) {
  const { isMobile } = useResponsive()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: ANIMATION_DEFAULTS.duration, 
        delay: index * ANIMATION_DEFAULTS.stagger 
      }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={platform.image}
              alt={platform.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Discount Badge */}
            {platform.discount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                {platform.discount}
              </div>
            )}
            
            {/* Icons */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <platform.icon className="h-8 w-8" />
                <ExternalLink className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
            {platform.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            {platform.description}
          </p>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button
            variant="primary"
            size={isMobile ? "sm" : "md"}
            className="w-full"
            onClick={() => window.open(platform.url, '_blank', 'noopener,noreferrer')}
          >
            Reservar Ahora
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function WhatsAppCard() {
  const { isMobile } = useResponsive()
  const whatsappNumber = '+50612345678'
  const whatsappMessage = encodeURIComponent(
    '¡Hola! Me interesa conocer más sobre los planes de surf + hospedaje en Maikekai Surf. ¿Podrían darme más información?'
  )

  const handleWhatsAppClick = () => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: ANIMATION_DEFAULTS.duration, 
        delay: 3 * ANIMATION_DEFAULTS.stagger 
      }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 border-green-200 hover:border-green-300">
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-400 to-green-600">
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageCircle className="h-24 w-24 text-white/20 group-hover:text-white/30 transition-colors" />
            </div>
            
            {/* Popular Badge */}
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              🔥 Popular
            </div>
            
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <MessageCircle className="h-8 w-8" />
                <ExternalLink className="h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
            WhatsApp Directo
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Contacto directo para planes personalizados y descuentos especiales
          </p>
        </CardContent>
        
        <CardFooter className="pt-0">
          <Button
            variant="secondary"
            size={isMobile ? "sm" : "md"}
            className="w-full bg-green-500 hover:bg-green-600 border-green-500 hover:border-green-600"
            onClick={handleWhatsAppClick}
          >
            💬 Chatear Ahora
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function SpecialOfferBanner() {
  const { isMobile } = useResponsive()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-8 text-white text-center shadow-xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
          🏄‍♂️ Oferta Especial: Surf + Hospedaje
        </h3>
        <p className="text-lg md:text-xl text-blue-100 mb-6">
          Reserva 5 noches y obtén 2 clases de surf GRATIS. 
          Incluye tabla, traje de neopreno y instructor certificado.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size={isMobile ? "md" : "lg"}
            className="bg-white text-primary-600 border-white hover:bg-gray-100 hover:text-primary-700"
          >
            Ver Detalles
          </Button>
          <Button
            variant="secondary"
            size={isMobile ? "md" : "lg"}
            className="bg-secondary-600 hover:bg-secondary-700 border-secondary-600"
          >
            🎯 Reservar Oferta
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export function BookingButtons() {
  return (
    <section id="reservas" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DEFAULTS.duration }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Reserva tu <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">Estadía</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige la plataforma que prefieras para reservar tu hospedaje. 
            También puedes contactarnos directamente por WhatsApp para planes personalizados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bookingPlatforms.map((platform, index) => (
            <BookingCard key={platform.name} platform={platform} index={index} />
          ))}
          <WhatsAppCard />
        </div>

        <SpecialOfferBanner />
      </div>
    </section>
  )
}
