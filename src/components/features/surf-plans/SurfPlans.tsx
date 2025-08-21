'use client'

import { motion } from 'framer-motion'
import { Check, Star, Users, Clock, Waves, Bed } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import type { SurfPlan } from '@/lib/supabase-queries'

// Importar nuestros componentes optimizados
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner, LoadingSkeleton } from '@/components/ui/Loading'
import { useResponsive } from '@/hooks/useResponsive'
import { formatCurrency } from '@/lib/utils'
import { ANIMATIONS } from '@/lib/constants'

const levelTranslations = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado'
} as const

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

interface SurfPlanCardProps {
  plan: SurfPlan
  isPopular?: boolean
  onReserve: (planId: string) => void
  index: number
}

function SurfPlanCard({ plan, isPopular = false, onReserve, index }: SurfPlanCardProps) {
  const { isMobile } = useResponsive()
  const duration = `${plan.duration_days} días / ${plan.duration_nights} noches`
  const levelText = levelTranslations[plan.level]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: ANIMATIONS.SLOW, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative ${isPopular ? 'transform scale-105 z-10' : ''}`}
    >
      <Card className={`overflow-hidden hover:shadow-2xl transition-all duration-300 h-full ${
        isPopular ? 'ring-2 ring-blue-500 shadow-xl' : 'hover:shadow-lg'
      }`}>
        {/* Popular Badge */}
        {isPopular && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold z-20 shadow-lg">
            ⭐ Más Popular
          </div>
        )}

        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={plan.image_url}
            alt={plan.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Level Badge */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-medium">
                {levelText}
              </span>
              <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm font-medium">4.9</span>
                <span className="text-white/80 text-sm">(85)</span>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Header */}
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              {plan.name}
            </CardTitle>
            <p className="text-gray-600">{plan.description}</p>
          </CardHeader>

          {/* Duration and Participants */}
          <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4 text-blue-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4 text-green-500" />
              <span>Máx. {plan.max_participants}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-6">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-blue-600">
                {formatCurrency(plan.price)}
              </span>
              {plan.original_price && (
                <span className="text-lg text-gray-500 line-through">
                  {formatCurrency(plan.original_price)}
                </span>
              )}
              {plan.original_price && (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                  Ahorra ${plan.original_price - plan.price}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">por persona</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h4 className="font-semibold text-gray-900 mb-3">Incluye:</h4>
            <ul className="space-y-2">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <Button
            variant={isPopular ? "primary" : "outline"}
            size={isMobile ? "md" : "lg"}
            onClick={() => onReserve(plan.id)}
            className="w-full"
          >
            {isPopular ? "🚀 Reservar Ahora" : "Reservar Plan"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function SurfPlanSkeleton() {
  return (
    <Card className="overflow-hidden h-full">
      <div className="h-48 bg-gray-200 animate-pulse" />
      <CardContent className="p-6">
        <LoadingSkeleton lines={2} height="h-6" className="mb-4" />
        <LoadingSkeleton lines={1} height="h-4" width="w-2/3" className="mb-6" />
        <LoadingSkeleton lines={1} height="h-8" width="w-1/2" className="mb-6" />
        <LoadingSkeleton lines={5} height="h-4" className="mb-8" />
        <LoadingSkeleton lines={1} height="h-12" className="w-full" />
      </CardContent>
    </Card>
  )
}

export default function SurfPlans() {
  const [plans, setPlans] = useState<SurfPlan[]>(fallbackPlans)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { isMobile } = useResponsive()
  const supabase = createClient()

  useEffect(() => {
    setMounted(true)
    
    const fetchPlans = async () => {
      if (!supabase) {
        console.log('🏄‍♂️ Usando planes de ejemplo (Supabase no configurado)')
        return
      }

      setLoading(true)
      try {
        const { data: surfPlans, error } = await supabase
          .from('surf_plans')
          .select('*')
          .eq('is_active', true)
          .order('price', { ascending: true })

        if (error) {
          console.log('🏄‍♂️ Error conectando a base de datos, usando planes de ejemplo:', error.message)
        } else if (surfPlans && surfPlans.length > 0) {
          console.log('✅ Planes cargados desde Supabase')
          setPlans(surfPlans)
        } else {
          console.log('🏄‍♂️ No hay planes en la base de datos, usando ejemplos')
        }
      } catch (error: any) {
        console.log('🏄‍♂️ Error de conexión, usando planes de ejemplo:', error?.message || 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [supabase])

  const handleReserve = (planId: string) => {
    // TODO: Implementar navegación a página de reservas
    console.log('Reservando plan:', planId)
    
    // Por ahora, mostrar alert
    const plan = plans.find(p => p.id === planId)
    if (plan) {
      alert(`¡Excelente elección! Reservando el ${plan.name}. Esta funcionalidad se implementará pronto.`)
    }
  }

  if (!mounted) {
    return (
      <section id="planes" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <LoadingSkeleton lines={1} height="h-12" width="w-1/2" className="mx-auto mb-6" />
            <LoadingSkeleton lines={2} height="h-6" width="w-2/3" className="mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="planes" className="py-20 bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATIONS.SLOW }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Planes de{' '}
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Surf + Hospedaje
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Combina la mejor experiencia de surf con hospedaje cómodo. 
            Todos nuestros planes incluyen clases profesionales, equipamiento y alojamiento.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-16">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-gray-600">Cargando planes de surf...</p>
          </div>
        ) : (
          <>
            {/* Plans Grid */}
            <div className={`grid gap-8 mb-20 ${
              isMobile ? 'grid-cols-1' : 'lg:grid-cols-3'
            }`}>
              {plans.map((plan, index) => (
                <SurfPlanCard
                  key={plan.id}
                  plan={plan}
                  isPopular={plan.level === 'intermediate'}
                  onReserve={handleReserve}
                  index={index}
                />
              ))}
            </div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: ANIMATIONS.SLOW, delay: 0.3 }}
              viewport={{ once: true }}
              className={`grid gap-8 ${isMobile ? 'grid-cols-1' : 'md:grid-cols-3'}`}
            >
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Instructores Certificados
                </h3>
                <p className="text-gray-600">
                  Todos nuestros instructores están certificados internacionalmente con más de 5 años de experiencia.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bed className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hospedaje Cómodo
                </h3>
                <p className="text-gray-600">
                  Habitaciones limpias y cómodas a solo 5 minutos caminando de las mejores playas de surf.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Experiencia Completa
                </h3>
                <p className="text-gray-600">
                  No solo aprendes surf, vives la cultura costarricense con actividades locales auténticas.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}
