'use client'

import { motion } from 'framer-motion'
import { ExternalLink, MessageCircle, Bed, Calendar } from 'lucide-react'
import Image from 'next/image'

const bookingPlatforms = [
  {
    name: 'Booking.com',
    icon: Bed,
    url: 'https://booking.com',
    color: 'bg-blue-600 hover:bg-blue-700',
    description: 'Reserva directa con cancelación gratuita',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Airbnb',
    icon: Calendar,
    url: 'https://airbnb.com',
    color: 'bg-rose-500 hover:bg-rose-600',
    description: 'Experiencia local auténtica',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Hostelworld',
    icon: Bed,
    url: 'https://hostelworld.com',
    color: 'bg-orange-500 hover:bg-orange-600',
    description: 'Para mochileros y viajeros jóvenes',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
]

export default function BookingButtons() {
  const whatsappNumber = '+50612345678' // Reemplazar con el número real
  const whatsappMessage = encodeURIComponent('¡Hola! Me interesa conocer más sobre los planes de surf + hospedaje en Maikekai Surf. ¿Podrían darme más información?')

  return (
    <section id="reservas" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Reserva tu <span className="text-primary-600">Estadía</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Elige la plataforma que prefieras para reservar tu hospedaje. 
            También puedes contactarnos directamente por WhatsApp para planes personalizados.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {bookingPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={platform.image}
                  alt={platform.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <platform.icon className="h-8 w-8" />
                    <ExternalLink className="h-5 w-5 opacity-70" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                  {platform.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {platform.description}
                </p>
                <div className={`mt-4 ${platform.color} text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors`}>
                  Reservar Ahora
                </div>
              </div>
            </motion.a>
          ))}

          {/* WhatsApp Contact */}
          <motion.a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-green-400 to-green-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="h-24 w-24 text-white/20" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between text-white">
                  <MessageCircle className="h-8 w-8" />
                  <ExternalLink className="h-5 w-5 opacity-70" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
                WhatsApp
              </h3>
              <p className="text-gray-600 text-sm">
                Contacto directo para planes personalizados
              </p>
              <div className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors">
                Chatear Ahora
              </div>
            </div>
          </motion.a>
        </div>

        {/* Special Offers Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-600 to-secondary-500 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            🏄‍♂️ Oferta Especial: Surf + Hospedaje
          </h3>
          <p className="text-lg md:text-xl text-blue-100 mb-6">
            Reserva 5 noches y obtén 2 clases de surf GRATIS. 
            Incluye tabla, traje de neopreno y instructor certificado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Ver Detalles
            </button>
            <button className="bg-secondary-600 hover:bg-secondary-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors">
              Reservar Oferta
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
