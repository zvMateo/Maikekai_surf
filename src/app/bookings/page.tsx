'use client'

import { useAuth } from '@/features/auth/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, DollarSign, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BookingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            href="/profile"
            className="flex items-center text-primary-600 hover:text-primary-700 transition-colors mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Volver al perfil
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
        </div>

        {/* Empty State */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-12 text-center"
        >
          <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            No tienes reservas aún
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            ¡Es hora de planear tu aventura de surf en Costa Rica! 
            Explora nuestros planes y reserva tu experiencia perfecta.
          </p>
          
          <div className="space-y-4">
            <Link
              href="/#planes"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Ver Planes de Surf
            </Link>
            <div className="text-sm text-gray-500">
              <p>¿Necesitas ayuda para elegir?</p>
              <Link href="/#contacto" className="text-primary-600 hover:text-primary-700">
                Contáctanos por WhatsApp
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Future: Booking List Component would go here */}
        {/* 
        <div className="space-y-6">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
        */}
      </div>
    </div>
  )
}
