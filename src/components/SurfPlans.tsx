'use client'

import { motion } from 'framer-motion'
import { Check, Star, Users, Clock, Waves, Bed } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { SurfPlan } from '@/lib/supabase-queries'

const levelTranslations = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado'
}

// Fallback data in case Supabase is not configured
const fallbackPlans: SurfPlan[] = [
  {
    id: '1',
    name: 'Plan Principiante',
    description: 'Perfecto para quienes nunca han surfeado',
    level: 'beginner',
    duration_days: 3,
    duration_nights: 2,
    price: 180,
    original_price: 220,
    max_participants: 6,
    features: [
      '2 noches de hospedaje',
      '3 clases de surf (2 horas c/u)',
      'Tabla de surf incluida',
      'Traje de neopreno',
      'Instructor certificado',
      'Desayuno incluido',
      'Transporte a las playas'
    ],
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '2',
    name: 'Plan Intermedio',
    description: 'Para surfistas con experiencia básica',
    level: 'intermediate',
    duration_days: 5,
    duration_nights: 4,
    price: 320,
    original_price: 400,
    max_participants: 4,
    features: [
      '4 noches de hospedaje',
      '5 clases de surf (2 horas c/u)',
      'Tabla premium incluida',
      'Traje de neopreno',
      'Instructor personalizado',
      'Todas las comidas incluidas',
      'Transporte a múltiples playas',
      'Video análisis de técnica',
      'Certificado de surf'
    ],
    image_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  },
  {
    id: '3',
    name: 'Plan Avanzado',
    description: 'Experiencia premium para surfistas experimentados',
    level: 'advanced',
    duration_days: 7,
    duration_nights: 6,
    price: 490,
    original_price: 600,
    max_participants: 2,
    features: [
      '6 noches de hospedaje premium',
      '7 clases de surf avanzado',
      'Tabla profesional incluida',
      'Equipo completo premium',
      'Instructor privado',
      'Todas las comidas + snacks',
      'Tour a playas secretas',
      'Sesión de fotos profesional',
      'Certificación avanzada',
      'Acceso a spots exclusivos'
    ],
    image_url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    is_active: true
  }
]

export default function SurfPlans() {
  const [plans, setPlans] = useState<SurfPlan[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchPlans = async () => {
      if (!supabase) {
        console.warn('⚠️  Supabase no configurado, usando datos de prueba');
        setPlans(fallbackPlans);
        setLoading(false);
        return;
      }

      try {
        const { data: surfPlans, error } = await supabase
          .from('surf_plans')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true })

        if (error) {
          console.error('Error fetching surf plans:', error)
          // Fallback to static data if database is not available
          setPlans(fallbackPlans)
        } else {
          setPlans(surfPlans || fallbackPlans)
        }
      } catch (error) {
        console.error('Error:', error)
        // Fallback to static data
        setPlans(fallbackPlans)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fallback data in case Supabase is not configured
  const fallbackPlans: SurfPlan[] = [
    {
      id: '1',
      name: 'Plan Principiante',
      description: 'Perfecto para quienes nunca han surfeado',
      level: 'beginner',
      duration_days: 3,
      duration_nights: 2,
      price: 180,
      original_price: 220,
      max_participants: 6,
      features: [
        '2 noches de hospedaje',
        '3 clases de surf (2 horas c/u)',
        'Tabla de surf incluida',
        'Traje de neopreno',
        'Instructor certificado',
        'Desayuno incluido',
        'Transporte a las playas'
      ],
      image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true
    },
    {
      id: '2',
      name: 'Plan Intermedio',
      description: 'Para surfistas con experiencia básica',
      level: 'intermediate',
      duration_days: 5,
      duration_nights: 4,
      price: 320,
      original_price: 400,
      max_participants: 4,
      features: [
        '4 noches de hospedaje',
        '5 clases de surf (2 horas c/u)',
        'Tabla premium incluida',
        'Traje de neopreno',
        'Instructor personalizado',
        'Todas las comidas incluidas',
        'Transporte a múltiples playas',
        'Video análisis de técnica',
        'Certificado de surf'
      ],
      image_url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true
    },
    {
      id: '3',
      name: 'Plan Avanzado',
      description: 'Experiencia premium para surfistas experimentados',
      level: 'advanced',
      duration_days: 7,
      duration_nights: 6,
      price: 490,
      original_price: 600,
      max_participants: 2,
      features: [
        '6 noches de hospedaje premium',
        '7 clases de surf avanzado',
        'Tabla profesional incluida',
        'Equipo completo premium',
        'Instructor privado',
        'Todas las comidas + snacks',
        'Tour a playas secretas',
        'Sesión de fotos profesional',
        'Certificación avanzada',
        'Acceso a spots exclusivos'
      ],
      image_url: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      is_active: true
    }
  ]

  if (loading) {
    return (
      <section id="planes" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Planes de <span className="text-primary-600">Surf + Hospedaje</span>
            </h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="planes" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
            Planes de <span className="text-primary-600">Surf + Hospedaje</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combina la mejor experiencia de surf con hospedaje cómodo. 
            Todos nuestros planes incluyen clases profesionales, equipamiento y alojamiento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isPopular = plan.level === 'intermediate' // Mark intermediate as popular
            const duration = `${plan.duration_days} días / ${plan.duration_nights} noches`
            const levelText = levelTranslations[plan.level]
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  isPopular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute top-4 left-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Más Popular
                  </div>
                )}

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={plan.image_url}
                    alt={plan.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <span className="bg-primary-600 px-2 py-1 rounded text-sm font-medium">
                        {levelText}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">4.9</span>
                        <span className="text-sm opacity-80">(85)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Máx. {plan.max_participants} personas</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-display font-bold text-primary-600">
                        ${plan.price}
                      </span>
                      {plan.original_price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${plan.original_price}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">por persona</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}>
                    Reservar Ahora
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Waves className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
              Instructores Certificados
            </h3>
            <p className="text-gray-600">
              Todos nuestros instructores están certificados internacionalmente con más de 5 años de experiencia.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bed className="h-8 w-8 text-secondary-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
              Hospedaje Cómodo
            </h3>
            <p className="text-gray-600">
              Habitaciones limpias y cómodas a solo 5 minutos caminando de las mejores playas de surf.
            </p>
          </div>
          
          <div className="text-center">
            <div className="bg-sand-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-8 w-8 text-sand-600" />
            </div>
            <h3 className="text-xl font-display font-semibold text-gray-900 mb-2">
              Experiencia Completa
            </h3>
            <p className="text-gray-600">
              No solo aprendes surf, vives la cultura costarricense con actividades locales auténticas.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
