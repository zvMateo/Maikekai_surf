'use client'

import { motion } from 'framer-motion'
import { Star, Quote, MapPin } from 'lucide-react'
import Image from 'next/image'

// Simulación de reseñas (en producción, estas vendrían de la API de Google)
const reviews = [
  {
    id: 1,
    name: 'María González',
    country: 'España',
    rating: 5,
    date: '2024-01-15',
    text: 'Experiencia increíble! Los instructores son súper profesionales y el hospedaje muy cómodo. Aprendí a surfear en solo 3 días. La ubicación es perfecta, muy cerca de la playa.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'John Smith',
    country: 'Estados Unidos',
    rating: 5,
    date: '2024-01-10',
    text: 'Amazing surf school! The instructors were patient and knowledgeable. The accommodation was clean and comfortable. Highly recommend for anyone wanting to learn to surf in Costa Rica.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Sophie Dubois',
    country: 'Francia',
    rating: 5,
    date: '2024-01-08',
    text: 'Une expérience fantastique! L\'école de surf est vraiment professionnelle et l\'hébergement est parfait. J\'ai adoré l\'ambiance décontractée et la beauté de Costa Rica.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 4,
    name: 'Carlos Ruiz',
    country: 'México',
    rating: 5,
    date: '2024-01-05',
    text: 'Excelente servicio! La atención es personalizada y realmente se preocupan por que aprendas. Las instalaciones están muy bien cuidadas y la comida deliciosa.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    country: 'Reino Unido',
    rating: 5,
    date: '2024-01-02',
    text: 'Best surf experience ever! The team at Maikekai Surf made everything easy and fun. Perfect for beginners and the location is just stunning. Will definitely come back!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 6,
    name: 'Luis Fernández',
    country: 'Colombia',
    rating: 5,
    date: '2023-12-28',
    text: 'Una experiencia única! El equipo de Maikekai Surf es increíble, muy profesional y amigable. Las clases son excelentes y el hospedaje muy cómodo. 100% recomendado!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80'
  }
]

export default function Reviews() {
  return (
    <section id="reseñas" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Lo que dicen nuestros <span className="text-primary-600">Huéspedes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Más de 500 surfistas satisfechos han vivido la experiencia Maikekai Surf. 
            Lee sus reseñas reales de Google.
          </p>
          
          {/* Google Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-white rounded-2xl shadow-lg px-8 py-4 mb-12"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-3xl font-display font-bold text-gray-900">4.9</div>
              <div className="text-sm text-gray-600">542 reseñas en Google</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary-200" />
              
              {/* User Info */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="h-3 w-3" />
                    <span>{review.country}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  {new Date(review.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              ¿Has estado con nosotros?
            </h3>
            <p className="text-gray-600 mb-6">
              Nos encantaría conocer tu experiencia. Déjanos una reseña en Google 
              y ayuda a otros viajeros a descubrir Maikekai Surf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center justify-center"
              >
                Escribir Reseña en Google
              </a>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-3 rounded-xl font-semibold transition-colors">
                Ver Todas las Reseñas
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
